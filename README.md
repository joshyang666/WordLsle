🏝️ 词屿 WordIsle
<p align="center">
  <img src="https://img.shields.io/badge/Platform-Android-green.svg?style=flat-square" alt="Platform" />
  <img src="https://img.shields.io/badge/Language-Kotlin-purple.svg?style=flat-square" alt="Language" />
  <img src="https://img.shields.io/badge/UI-Jetpack%20Compose-blue.svg?style=flat-square" alt="Jetpack Compose" />
  <img src="https://img.shields.io/badge/MinSdk-26%2B-orange.svg?style=flat-square" alt="MinSdk" />
  <img src="https://img.shields.io/github/v/release/joshyang666/WordLsle?style=flat-square&color=blue" alt="Latest Release" />
  <img src="https://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat-square" alt="License" />
</p>
<p align="center">
  <b>词屿 (WordIsle)</b> 是一款专为高效背词与语言学习打造的轻量级、无干扰 Android 记忆工具。<br/>
  将词汇沉淀为座座知识岛屿，摆脱信息茧房与冗余广告，专注纯粹的语言进阶之旅。
</p>
---
✨ 核心特性
🎯 专注抗遗忘：内置艾宾浩斯遗忘曲线复习算法，按记忆遗忘临界点精准推词。

🎨 现代化美学：采用 Jetpack Compose + Material 3 规范构建，支持流体动效与系统级深色/浅色模式自适应。

⚡ 离线可用：核心词库与背诵进度完全持久化在手机本地，无网络环境下依然流畅学习。

🚀 应用内无感更新：基于 GitHub Releases 托管版本，内嵌国内镜像加速分发，一键检查并覆盖更新。

🛡️ 纯粹安全：零多余流氓权限，无广告、无开屏推流，保护个人隐私与学习节奏。

---
📱 界面预览
每日刷词	记忆自测	词岛概览
(截图占位 / Preview 1)	(截图占位 / Preview 2)	(截图占位 / Preview 3)
---
📥 下载安装
方式一：直接下载 APK（推荐）
前往 Releases 页面 下载最新的 `.apk` 安装包并安装到手机。
> 💡 **国内网络下载提示**：若直接从 GitHub 附件下载较慢，可使用镜像加速节点或直接在应用内通过更新弹窗进行高速下载。
方式二：从源码编译构建
如果你是开发者，可在本地使用 Android Studio 进行构建：
```bash
# 1. 克隆代码仓库
git clone https://github.com/joshyang666/WordLsle.git

# 2. 进入项目根目录
cd WordLsle

# 3. 编译 Debug 安装包
./gradlew assembleDebug

# Windows PowerShell:
# .\gradlew.bat assembleDebug
```
构建成功后，生成的 APK 位于：
`app/build/outputs/apk/debug/app-debug.apk`
---

🛠️ 技术栈与架构

开发语言：Kotlin
UI 框架：Jetpack Compose + Material Design 3
架构设计：MVVM + Clean Architecture
异步响应：Coroutines + StateFlow
网络与分发：OkHttp (用于 GitHub Release 自动检测与下载)
本地存储：Room Database / DataStore
---

🔄 应用内更新工作流
本项目通过无后端（Serverless）架构实现版本迭代：

版本发布：开发者构建 Release 包并在 GitHub Releases 创建对应 Tag（如 `v1.0.1`）挂载 APK。
版本检测：应用启动时异步读取 GitHub Latest API 获取最新版本号与更新日志。
分发加速：客户端自动接入加速反向代理，保障国内各运营商环境秒级拉取更新包。
安全安装：下载后基于 Android `FileProvider` 调起原生包安装器实现平滑升级。
---

🗺️ 后续路线图 (Roadmap)

[ ] 丰富内置词库（CET-4/6、考研、托福、雅思、GRE）
[ ] 自定义导入外部 Anki / CSV / 纯文本生词本
[ ] 单词真人发音缓存与发音语速微调
[ ] 学习热力图与背诵记忆曲线统计看板
---
📄 开源许可
本项目遵循 MIT License 许可开源。欢迎学习、交流与提交 PR！
---
<p align="center">Made with ❤️ by <a href="https://github.com/joshyang666">joshyang666</a></p>
