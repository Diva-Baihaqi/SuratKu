@echo off
setlocal

:: Create directories
mkdir config
mkdir middleware
mkdir routes
mkdir views
mkdir views\auth
mkdir views\partials
mkdir views\admin
mkdir views\errors

:: Create empty files
type nul > app.js
type nul > package.json
type nul > .env

type nul > config\database.js

type nul > middleware\auth.js

type nul > routes\auth.js
type nul > routes\surat.js

type nul > views\layout.ejs
type nul > views\auth\login.ejs
type nul > views\admin\dashboard.ejs
type nul > views\admin\surat-masuk.ejs
type nul > views\admin\surat-keluar.ejs
type nul > views\admin\surat-form.ejs
type nul > views\partials\header.ejs
type nul > views\partials\footer.ejs
type nul > views\partials\messages.ejs
type nul > views\errors\404.ejs

echo 💡 Struktur proyek aplikasi surat berhasil dibuat!
pause