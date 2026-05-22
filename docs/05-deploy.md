# Bagian 5: Deploy ke GitHub Pages

> **Tujuan**: Mendeploy situs kamu ke internet.
> **Waktu**: ~15 menit

──────────────────────────────────────────────────────────────

## Apa yang Kita Bangun

```
  Kamu push ke main        GitHub Actions
  ──────────────     ──────────────────────
                    ┌──────────────────┐
  git push  ──────▶ │  Build project   │
                    │  Upload dist/    │───▶  Situs hidup!
                    │  Deploy ke Pages │     YOUR_USERNAME.github.io/my-profile
                    └──────────────────┘
```

Di bagian sebelumnya, kita membuat GitHub menjalankan test setiap push. Sekarang kita akan menambahkan workflow kedua yang benar-benar mendeploy situs yang sudah di-build ke GitHub Pages.

──────────────────────────────────────────────────────────────

## Langkah 1: Verifikasi Base Path Vite

**Ini langkah paling penting. Baca dengan teliti.**

Ketika GitHub Pages meng-hosting situs kamu, ia berada di:
```
https://YOUR_USERNAME.github.io/my-profile/
                                  ^^^^^^^^^^^
                                  Ini adalah BASE PATH
```

Vite perlu tahu tentang path ini agar bisa memuat CSS, JS, dan gambar dengan benar. Tanpa ini, kamu mendapat **halaman kosong**.

Buka `vite.config.ts` — opsi `base` sudah dikonfigurasi untuk kamu:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/my-profile/' : '/',
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

Verifikasi bahwa `base` sudah diset ke `/my-profile/` saat production build. Di local dev, `base` menggunakan `/` (root path).

`/my-profile/` harus sama persis dengan nama repositori GitHub kamu. Jika repo kamu bernama `web-profile-ku`, ganti `/my-profile/` menjadi `/web-profile-ku/`.

Slash di awal DAN akhir keduanya wajib. Jangan lupa.

──────────────────────────────────────────────────────────────

## Langkah 2: Aktifkan GitHub Pages

Lakukan ini duluan — Deploy workflow akan gagal jika GitHub Pages belum dikonfigurasi.

1. Buka repositori kamu di GitHub
2. Klik tab **Settings**
3. Di sidebar kiri, klik **Pages**
4. Di bagian **Build and deployment** → **Source**, pilih **GitHub Actions**
5. Klik **Save**

```
  Settings → Pages
  ┌────────────────────────────────────────┐
  │                                        │
  │  Build and deployment                  │
  │                                        │
  │  Source: [GitHub Actions ▼]    [Save]  │
  │                                        │
  └────────────────────────────────────────┘
```

Ini memberitahu GitHub "gunakan GitHub Actions untuk mendeploy situs saya" bukan metode lama yang deploy dari branch.

──────────────────────────────────────────────────────────────

## Langkah 3: Buat Deploy Workflow

Buat feature branch untuk pekerjaan ini:

```cmd
git checkout -b feature/add-deploy
```

Buat file `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

Penjelasan:

**Job build:**
| Langkah | Fungsinya |
|---------|-----------|
| `checkout` | Download kode kamu |
| `setup-node` | Install Node.js 22 |
| `npm ci` | Install dependencies |
| `npm run build` | Build proyek kamu → membuat folder `dist/` |
| `upload-pages-artifact` | Memaketkan `dist/` untuk deployment |

**Job deploy:**
| Langkah | Fungsinya |
|---------|-----------|
| `needs: build` | Menunggu job build selesai dulu |
| `permissions` | Memberikan akses untuk deploy ke Pages |
| `deploy-pages@v4` | Mempublikasikan situs kamu |

Perhatikan `needs: build` — ini berarti deploy HANYA berjalan jika build berhasil. Tidak ada deploy yang rusak.

Sekarang commit dan push branch-nya:

```cmd
git add .
git commit -m "tambah workflow deploy"
git push -u origin feature/add-deploy
```

Buka Pull Request:

```cmd
gh pr create --title "Tambah workflow deploy" --body "Menyiapkan GitHub Actions untuk deploy ke GitHub Pages saat push ke main."
```

Tunggu CI lulus, lalu merge (jalankan dari feature branch):

```cmd
gh pr merge
```

`gh pr merge` merge PR di remote. Sinkronkan local `main`:

```cmd
git checkout main
git pull
```

Merge PR akan push deploy workflow ke `main`. Ini secara otomatis memicu Deploy workflow, ia akan build proyek kamu dan deploy ke GitHub Pages.

──────────────────────────────────────────────────────────────

## Langkah 4: Pantau Deploy

Buka tab **Actions**. Kamu seharusnya melihat DUA workflow berjalan:

1. **CI** — menjalankan test (dari Bagian 4)
2. **Deploy** — build dan deploy (yang baru)

Klik workflow **Deploy** dan tunggu sampai selesai.


──────────────────────────────────────────────────────────────

## Langkah 5: Check url web kamu

Web kamu ada di:

```
https://YOUR_USERNAME.github.io/my-profile/
```


──────────────────────────────────────────────────────────────

## **Checkpoint**

Sebelum lanjut, verifikasi:

- [ ] Kedua workflow CI dan Deploy menampilkan centang hijau di tab Actions
- [ ] Situs kamu bisa diakses di `https://YOUR_USERNAME.github.io/my-profile/`
- [ ] Profile card terlihat benar (style-nya ada, tidak rusak)
- [ ] Toggle dark mode berfungsi

**Masalah umum:**

| Masalah | Penyebab | Solusi |
|---------|----------|--------|
| Halaman kosong | `base` path hilang di vite.config.ts | Pastikan `base` diset ke `/my-profile/` untuk production |
| Error 404 | URL salah | Cek nama repo cocok dengan path URL |
| CSS tidak loading | Base path hilang atau salah | Sama seperti halaman kosong, cek `base` |
| Error permission di Actions | Pages belum dikonfigurasi | Pergi ke Settings → Pages → Source: GitHub Actions |
| Deploy workflow tidak berjalan | Repo bersifat private | GitHub Pages versi free membutuhkan repo public |
| Halaman terlihat berbeda | Deploy lama ter-cache | Tunggu 1-2 menit, hard refresh (Ctrl+Shift+R) |

**Selanjutnya:** Buka `06-scenarios.md`
