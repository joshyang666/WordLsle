# 词屿 (WordIsle)

一款专为高效背词与语言学习打造的轻量级、无干扰 Android 记忆工具。将词汇沉淀为座座知识岛屿，摆脱信息茧房与冗余广告，专注纯粹的语言进阶之旅。

---

### ✨ 核心特性

* 🎯 **专注抗遗忘**：内置艾宾浩斯遗忘曲线复习算法，按记忆遗忘临界点精准推词。
* 🎨 **现代化美学**：采用 Jetpack Compose + Material 3 规范构建，支持流体动效与系统级深色/浅色模式自适应。
* ⚡ **离线可用**：核心词库与背诵进度完全持久化在手机本地，无网络环境下依然流畅学习。
* 🚀 **应用内无感更新**：基于 GitHub Releases 托管版本，内嵌国内镜像加速分发，一键检查并覆盖更新。
* 🛡️ **纯粹安全**：零多余流氓权限，无广告、无开屏推送，保护个人隐私与学习节奏。

---

### 📱 界面预览

> *提示：后续可将截图放入仓库后替换此处的占位说明*

| 每日刷词 | 记忆自测 | 词岛概览 |
| :---: | :---: | :---: |
| *(截图占位 / Preview 1)* | *(截图占位 / Preview 2)* | *(截图占位 / Preview 3)* |

---

### 📥 下载安装

#### 方式一：直接下载 APK（推荐）

* 前往 [Releases 页面](https://github.com/joshyang666/WordLsle/releases) 下载最新的 `.apk` 安装包并安装到手机。

> 💡 **国内网络下载提示**：若直接从 GitHub 附件下载较慢，可使用镜像加速节点或直接在应用内通过更新弹窗进行高速下载。

#### 方式二：从源码编译构建

如果你是开发者，可在本地使用 Android Studio 进行构建：

```bash
# 1. 克隆代码仓库
git clone [https://github.com/joshyang666/WordLsle.git](https://github.com/joshyang666/WordLsle.git)

# 2. 进入项目目录
cd WordLsle

# 3. 编译 Debug 安装包
./gradlew assembleDebug

# Windows PowerShell:
# .\gradlew.bat assembleDebug
