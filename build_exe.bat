@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo === 打包 WordIsle.exe ===
echo.
echo 依赖：pip install pywebview pyinstaller
echo.

python -m pip install --upgrade pywebview pyinstaller || goto :fail

rem 清掉上次的构建产物，避免旧文件混进去
if exist build rmdir /s /q build
if exist dist rmdir /s /q dist
if exist WordIsle.spec del /q WordIsle.spec

python -m PyInstaller ^
    --noconfirm ^
    --clean ^
    --onefile ^
    --noconsole ^
    --name WordIsle ^
    --icon icon.ico ^
    --add-data "web;web" ^
    --hidden-import webview.platforms.edgechromium ^
    --hidden-import webview.platforms.winforms ^
    --hidden-import clr_loader ^
    WordIsle.py || goto :fail

echo.
echo 打包完成：dist\WordIsle.exe
copy /y dist\WordIsle.exe .\WordIsle.exe >nul
echo 已复制到当前目录：%~dp0WordIsle.exe
goto :eof

:fail
echo.
echo 打包失败，请检查上面的报错。
pause
