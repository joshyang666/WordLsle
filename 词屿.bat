@echo off
chcp 65001 >nul
cd /d "%~dp0"

rem 优先用 pythonw 启动，不弹出黑色控制台
where pythonw >nul 2>nul
if %errorlevel%==0 (
    start "" pythonw "%~dp0WordIsle.py"
    exit /b
)

where pyw >nul 2>nul
if %errorlevel%==0 (
    start "" pyw "%~dp0WordIsle.py"
    exit /b
)

echo.
echo   没有找到 Python。
echo.
echo   两种解决办法：
echo     1. 装一个 Python 3.9+（安装时勾选 Add to PATH），再双击本文件；
echo     2. 直接用同目录里的 WordIsle.exe（已打包好的独立版本，不需要 Python）。
echo.
pause
