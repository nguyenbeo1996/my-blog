@echo off
echo Running boot script... > boot_log.txt
npm run dev >> boot_log.txt 2>&1
