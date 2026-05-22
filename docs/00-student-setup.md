# Bagian 0: Persiapan Environment

> **Tujuan**: Membuat akun GitHub, menginstal tools, dan membuat repo dari template.
> **Waktu**: ~15 menit

──────────────────────────────────────────────────────────────

## Tools yang Akan Diinstal

| Alat | Fungsinya |
|------|-----------|
| **Git** | Melacak perubahan kode |
| **Node.js** | Menjalankan JavaScript di komputer kamu (dibutuhkan untuk React) |
| **GitHub CLI (`gh`)** | Bekerja dengan GitHub dari terminal |
| **Code editor** | VS Code |

──────────────────────────────────────────────────────────────

## Langkah 1: Buat Akun GitHub

1. Buka **https://github.com/signup** di browser
2. Masukkan email, buat password, pilih username
3. Verifikasi email (cek inbox kamu)


──────────────────────────────────────────────────────────────

## Langkah 2: Install Git

### Windows

Download dari **https://git-scm.com/download/win** dan jalankan installernya. Biarkan semua default.

Ini juga menginstal **Git Bash** — terminal yang bekerja seperti Linux. Kita akan menggunakan Git Bash untuk semua perintah di workshop ini.

Setelah instalasi, buka **Git Bash** (cari di Start menu) dan verifikasi:

```cmd
git --version
```

Kamu seharusnya melihat sesuatu seperti `git version 2.47.0`.

### Linux

```cmd
sudo apt install git
```

Verifikasi:

```cmd
git --version
```

──────────────────────────────────────────────────────────────

## Langkah 3: Konfigurasi Git

Konfigurasi nama dan email

```cmd
git config --global user.name "Nama Kamu"
git config --global user.email "email.kamu@gmail.com"
```

──────────────────────────────────────────────────────────────

## Langkah 4: Install Node.js

Node.js menjalankan development server React. Kamu butuh versi 18 atau lebih baru.

### Windows

Download installer **LTS** dari **https://nodejs.org** dan jalankan. Biarkan semua default.

### Linux

```cmd
sudo apt install nodejs npm
```

Verifikasi:

```cmd
node --version
npm --version
```

Kamu seharusnya melihat `v20.x.x` (atau lebih baru) dan `10.x.x` (atau lebih baru).

──────────────────────────────────────────────────────────────

## Langkah 5: Install GitHub CLI (`gh`)

`gh` memungkinkan kamu membuat pull request, cek status CI, dan lainnya — semua dari terminal.

### Windows

Download dari **https://cli.github.com** atau jalankan di terminal:

```cmd
winget install GitHub.cli
```

Setelah instalasi, tutup dan buka kembali terminal (Git Bash) kamu.

### Linux

```cmd
sudo apt install gh
```

Verifikasi:

```cmd
gh --version
```

──────────────────────────────────────────────────────────────

## Langkah 6: Login GitHub CLI

Login ke GitHub dari terminal:

```cmd
gh auth login
```

Jawab promptnya:

```
? What is your preferred protocol for Git operations?  HTTPS
? How would you like to authenticate GitHub CLI?        Login with a web browser
```

Akan muncul kode satu kali seperti `XXXX-XXXX`.

1. Tekan **Enter** untuk membuka browser
2. Paste kodenya di browser
3. Klik **Authorize**

Verifikasi berhasil:

```cmd
gh auth status
```

Kamu seharusnya melihat:

```
✓ Logged in to github.com account YOUR_USERNAME
```

──────────────────────────────────────────────────────────────

## Langkah 7: Buat Repo dari Template

Buat repo kamu sendiri dari template instruktur:

```cmd
gh repo create my-profile --template flyingstarlai/my-profile --clone --public
```

Ini melakukan dua hal sekaligus:
- **Buat** repo baru di akun GitHub kamu (`YOUR_USERNAME/my-profile`) berdasarkan template
- **Clone** ke laptop kamu (download kodenya)

Masuk ke folder proyek:

```cmd
cd my-profile
```

──────────────────────────────────────────────────────────────

## Langkah 8: Install Dependencies dan Jalankan

```cmd
npm install
npm run dev
```

Buka **http://localhost:5173/** di browser. Kamu seharusnya melihat kartu profil dengan nama, bio, tag skill, dan toggle dark mode.

Tekan **Ctrl+C** di terminal untuk menghentikan dev server.

──────────────────────────────────────────────────────────────

## Langkah 9: Verifikasi Remote

```cmd
git remote -v
```

Kamu seharusnya melihat:

```
origin    https://github.com/YOUR_USERNAME/my-profile.git (fetch)
origin    https://github.com/YOUR_USERNAME/my-profile.git (push)
```

| Remote | Apa itu |
|--------|---------|
| `origin` | **Repo kamu** — kamu push ke sini |

Setiap perubahan kode kamu push ke repo sendiri dan membuka Pull Request.

──────────────────────────────────────────────────────────────

## **Checkpoint**

Sebelum lanjut, verifikasi:

- [ ] `git --version` menampilkan nomor versi
- [ ] `node --version` menampilkan v18 atau lebih baru
- [ ] `gh auth status` menunjukkan kamu sudah login
- [ ] `npm run dev` menampilkan profile card di browser
- [ ] `git remote -v` menampilkan `origin` (repo kamu)

**Selanjutnya:** Buka `01-scaffold.md` untuk menjelajahi struktur proyek.
