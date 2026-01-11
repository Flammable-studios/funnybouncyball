$ScriptPath = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Set-Location $ScriptPath
python server.py
