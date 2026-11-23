#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""词屿 WordIsle 桌面版启动器。

用系统自带的 Edge WebView2 打开一个原生窗口（经 pywebview），
界面是 web/ 里的纯前端页面。数据存在 %APPDATA%/WordIsle/state.json，
不联网、不上传。

界面文件通过一个只监听 127.0.0.1 的临时端口提供，不用 file://：
WebView2 对 file:// 的限制较多，走本地 HTTP 最稳，端口由系统分配。

    python WordIsle.py            # 原生窗口
    python WordIsle.py --browser  # 强制用浏览器打开
    python WordIsle.py --debug    # 打开 WebView2 开发者工具

没装 pywebview 时自动降级成浏览器模式，功能一样，只是外面多一圈浏览器边框。
"""

import json
import os
import sys
import threading
import traceback
import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

APP_NAME = "词屿 WordIsle"
VERSION = "1.0.6"

# PyInstaller 单文件模式下资源被解到 _MEIPASS
BASE = getattr(sys, "_MEIPASS", os.path.dirname(os.path.abspath(__file__)))
WEB = os.path.join(BASE, "web")
INDEX = os.path.join(WEB, "index.html")

DATA_DIR = os.path.join(os.environ.get("APPDATA") or os.path.expanduser("~"), "WordIsle")
STATE = os.path.join(DATA_DIR, "state.json")
LOG = os.path.join(DATA_DIR, "launcher.log")


def log(msg):
    """pythonw 下没有控制台，日志落到文件里方便排查。"""
    try:
        os.makedirs(DATA_DIR, exist_ok=True)
        with open(LOG, "a", encoding="utf-8") as f:
            f.write(str(msg).rstrip() + "\n")
    except Exception:
        pass
    print(msg)


# ── 数据读写 ──────────────────────────────────────────────────────────

class Api:
    """暴露给 JS 的接口：window.pywebview.api.xxx()"""

    def load_state(self):
        try:
            with open(STATE, "r", encoding="utf-8") as f:
                return f.read()
        except FileNotFoundError:
            return None
        except Exception as exc:          # 文件损坏时不要让 App 起不来
            log(f"[状态读取失败] {exc}")
            return None

    def save_state(self, text):
        if not isinstance(text, str) or not text.strip():
            return False
        try:
            json.loads(text)              # 只接受合法 JSON，避免写坏文件
        except Exception:
            return False
        os.makedirs(DATA_DIR, exist_ok=True)
        tmp = STATE + ".tmp"
        try:
            with open(tmp, "w", encoding="utf-8") as f:
                f.write(text)
            os.replace(tmp, STATE)        # 原子替换，写一半断电也不会丢旧数据
            return True
        except Exception as exc:
            log(f"[保存失败] {exc}")
            return False

    def state_path(self):
        return STATE

    def export_json(self, text):
        """弹保存对话框，返回落盘路径；用户取消返回空串。"""
        import datetime

        path = _dialog(save=True, default=f"wordisle-{datetime.date.today()}.json")
        if not path:
            return ""
        if isinstance(path, (list, tuple)):
            path = path[0]
        try:
            with open(path, "w", encoding="utf-8") as f:
                f.write(text)
            return path
        except Exception as exc:
            log(f"[导出失败] {exc}")
            return ""

    def import_json(self):
        """弹打开对话框，返回文件内容；用户取消返回空串。"""
        path = _dialog(save=False)
        if not path:
            return ""
        if isinstance(path, (list, tuple)):
            path = path[0]
        try:
            with open(path, "r", encoding="utf-8") as f:
                return f.read()
        except Exception as exc:
            log(f"[导入失败] {exc}")
            return ""

    def translate(self, text):
        """用 Google 翻译（公开免密钥接口）翻一段文本，英中互译。

        词库/短语表没收录的单词或短语会走到这里。失败时返回空串，
        前端据此显示「翻译失败」而不是当成空结果。直连不通时会读系统
        代理环境变量（http_proxy / https_proxy）再试一次。
        """
        import urllib.parse
        import urllib.request

        if not isinstance(text, str) or not text.strip():
            return ""
        text = text.strip()
        # 含中文按中→英，否则按自动检测→中文；固定搭配/短语照整段翻
        sl = "auto"
        tl = "en" if any("\u4e00" <= ch <= "\u9fff" for ch in text) else "zh-CN"
        url = "https://translate.googleapis.com/translate_a/single?" + urllib.parse.urlencode(
            {"client": "gtx", "sl": sl, "tl": tl, "dt": "t", "q": text}
        )

        def _fetch(opener):
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with opener.open(req, timeout=8) as resp:
                return json.loads(resp.read().decode("utf-8", "ignore"))

        data = None
        try:
            data = _fetch(urllib.request.build_opener())   # 直连
        except Exception as exc1:
            proxy = (os.environ.get("https_proxy") or os.environ.get("HTTPS_PROXY")
                     or os.environ.get("http_proxy") or os.environ.get("HTTP_PROXY"))
            if proxy:
                try:
                    data = _fetch(urllib.request.build_opener(
                        urllib.request.ProxyHandler({"http": proxy, "https": proxy})))
                except Exception as exc2:
                    log(f"[翻译失败·代理] {text!r}: {exc2}")
            else:
                log(f"[翻译失败] {text!r}: {exc1}")
        if not data:
            return ""
        try:
            parts = [seg[0] for seg in data[0] if seg and seg[0]]
            return "".join(parts).strip()
        except Exception:
            return ""


def _dialog(save: bool, default: str = ""):
    """调 pywebview 的原生文件对话框，兼容 3.x / 4.x / 6.x 的 API 差异。"""
    try:
        import webview

        win = webview.windows[0] if webview.windows else None
        if win is None:
            return ""
        file_types = ("JSON 文件 (*.json)", "所有文件 (*.*)")
        if hasattr(webview, "FileDialog"):          # 4.x 及以后
            kind = webview.FileDialog.SAVE if save else webview.FileDialog.OPEN
            return win.create_file_dialog(kind, save_filename=default, file_types=file_types)
        kind = webview.SAVE_DIALOG if save else webview.OPEN_DIALOG   # 3.x
        return win.create_file_dialog(kind, save_filename=default, file_types=file_types)
    except Exception as exc:
        log(f"[对话框失败] {exc}")
        return ""


# ── 本地静态服务 ──────────────────────────────────────────────────────

class QuietHandler(SimpleHTTPRequestHandler):
    """不往控制台刷请求日志。"""

    def log_message(self, fmt, *args):
        pass


def start_server():
    handler = partial(QuietHandler, directory=WEB)
    httpd = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    log(f"[服务] http://127.0.0.1:{port}/")
    return httpd, port


# ── 两种启动方式 ──────────────────────────────────────────────────────

def run_window(url):
    import webview

    _ensure_data_dir()
    window = webview.create_window(
        APP_NAME,
        url=url,
        js_api=Api(),
        width=1280,
        height=860,
        min_size=(880, 600),
        background_color="#0E1116",
    )

    def on_loaded():
        log("[窗口] 页面已加载")

    try:
        window.events.loaded += on_loaded
    except Exception:
        pass

    webview.start(debug="--debug" in sys.argv)


def run_browser(url):
    log(f"{APP_NAME} {VERSION}")
    log(f"已在浏览器打开：{url}")
    webbrowser.open(url)
    try:
        while True:
            threading.Event().wait(1)
    except KeyboardInterrupt:
        pass


def _ensure_data_dir():
    os.makedirs(DATA_DIR, exist_ok=True)


def main():
    if not os.path.exists(INDEX):
        log(f"找不到界面文件：{INDEX}")
        return 1

    os.makedirs(DATA_DIR, exist_ok=True)
    httpd, port = start_server()
    url = f"http://127.0.0.1:{port}/index.html"

    force_browser = "--browser" in sys.argv
    if not force_browser:
        try:
            import webview  # noqa: F401

            run_window(url)
            return 0
        except ImportError:
            log("未安装 pywebview，改用浏览器打开。安装：pip install pywebview")
        except Exception:
            log("[窗口启动失败] 退回到浏览器\n" + traceback.format_exc())

    run_browser(url)
    httpd.shutdown()
    return 0


if __name__ == "__main__":
    sys.exit(main())
