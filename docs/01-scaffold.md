# Bagian 1: Struktur Project

> **Tujuan**: Memahami struktur project.
> **Waktu**: ~10 menit

──────────────────────────────────────────────────────────────

## Pengantar Singkat: Apa itu React?

Kamu mungkin pernah dengar React. Berikut yang perlu kamu ketahui untuk workshop ini:

```
HTML Tradisional             React
─────────────────────       ─────────────────────

Kamu menulis:                Kamu menulis:
  <html>                      Fungsi JavaScript
    <h1>Hello</h1>            yang MENGEMBALIKAN HTML
    <p>Some text</p>
  </html>                   function Greeting() {
                                return <h1>Hello</h1>
Browser menampilkan:          }

Kamu ingin mengubah           Browser menampilkan:
"Hello" jadi "Hi"?              Hello
Edit file HTML.
Reload halaman.              Kamu ingin mengubahnya?
                             Cukup update datanya.
                             React re-render.
                             Tidak perlu reload.
```

**Istilah umum di React:**
- **Component** = fungsi JavaScript yang mengembalikan HTML
- **Props** = input yang kamu berikan ke component (seperti argumen fungsi)
- **State** = data yang bisa berubah seiring waktu
- **JSX/TSX** = menulis HTML di dalam JavaScript/TypeScript

Contoh:
```tsx
function ProfileCard({ name }) {     // Component + Props
  return <h1>{name}</h1>             // TSX (HTML di dalam JS)
}
```

Jika ini pertama kalinya dengan React, jangan khawatir. Proyek hari ini hanya menggunakan component, props, dan satu `useState`.

──────────────────────────────────────────────────────────────

## Pengantar Singkat: Apa itu GitHub?

```
Laptop Kamu                    GitHub
──────────────                 ────────────────

Kamu menulis kode ───git push──▶ Kode disimpan online
                                   (seperti Google Drive untuk kode)

Mengapa penting:
  • Backup — kode kamu ada di internet, bukan cuma di laptop
  • History — setiap perubahan disimpan, bisa kembali kapan saja
  • Kolaborasi — orang lain bisa melihat dan berkontribusi
  • CI/CD — GitHub bisa menjalankan test dan deploy otomatis
```

**GitHub vs Git:**

| | Git | GitHub |
|---|---|---|
| Apa itu? | Alat di laptop kamu | Sebuah website (github.com) |
| Fungsinya? | Melacak perubahan kode | Menyimpan kode kamu secara online |
| Analogi | Sebuah buku tulis | Backup cloud dari buku tulis tersebut |

**Perintah yang akan kamu gunakan hari ini:**

| Perintah | Fungsinya |
|---------|-----------|
| `git clone <url>` | Download repo dari GitHub ke laptop |
| `git add .` | Stage semua perubahan |
| `git commit -m "pesan"` | Simpan snapshot kode kamu |
| `git push` | Upload snapshot ke GitHub |
| `git pull` | Download perubahan terbaru dari GitHub |
| `git checkout -b nama` | Buat branch baru |


──────────────────────────────────────────────────────────────

## Langkah 1: Pahami Struktur Proyek

Mari kita lihat isinya:

```
my-profile/
├── src/
│   ├── App.tsx               ← Component utama dengan theme toggle
│   ├── App.css               ← Style global
│   ├── App.test.tsx          ← Test untuk App component
│   ├── main.tsx              ← Entry point
│   ├── components/
│   │   ├── profile-card.tsx  ← Component kartu profil
│   │   ├── profile-card.css  ← Style kartu
│   │   └── icons.tsx         ← SVG icon components
│   ├── utils/
│   │   └── format-bio.ts     ← Utilitas pemotongan bio
│   └── test/
│       └── setup.ts          ← Setup file testing
├── public/                   ← File statis
│   ├── favicon.svg           ← Icon tab browser
│   └── icons.svg             ← Sprite SVG icons
├── docs/                     ← Materi workshop
├── index.html                ← Container HTML
├── package.json              ← Dependencies & scripts
├── vite.config.ts            ← Konfigurasi Vite
├── tsconfig.json             ← Konfigurasi TypeScript
├── tsconfig.app.json         ← Konfigurasi TS untuk app
├── tsconfig.node.json        ← Konfigurasi TS untuk Node
├── tsconfig.test.json        ← Konfigurasi TS untuk test
└── eslint.config.js          ← Konfigurasi ESLint
```

Penjelasan file utama:

| File | Fungsinya |
|------|-----------|
| `main.tsx` | Entry point — merender App ke dalam HTML |
| `App.tsx` | Component utama — mengatur toggle tema (dark/light mode) |
| `App.css` | Style global dan variabel CSS untuk tema |
| `App.test.tsx` | Test untuk App component |
| `components/profile-card.tsx` | Profile card: menampilkan nama, bio, dan skills |
| `components/profile-card.css` | Style untuk profile card |
| `components/icons.tsx` | SVG icon components (sun, moon, dll.) |
| `utils/format-bio.ts` | Fungsi helper untuk trim bio panjang |
| `test/setup.ts` | Setup file untuk testing framework |
| `package.json` | Daftar dependencies dan scripts (`dev`, `build`, dll.) |
| `vite.config.ts` | Pengaturan Vite — kita akan tambahkan config test nanti |
| `eslint.config.js` | Konfigurasi ESLint untuk pengecekan style kode |

──────────────────────────────────────────────────────────────

## Scripts di `package.json`

`package.json` berisi daftar script yang bisa kamu jalankan dengan `npm run <nama>`:

| Script | Perintah di Belakang Layar | Fungsinya |
|--------|---------------------------|-----------|
| `npm run dev` | `vite` | Jalankan dev server di http://localhost:5173/ dengan hot reload |
| `npm run build` | `tsc -b && vite build` | Cek tipe TypeScript lalu build untuk produksi → folder `dist/` |
| `npm run lint` | `eslint .` | Cek style dan error kode di seluruh project |
| `npm run preview` | `vite preview` | Preview hasil build produksi secara lokal |
| `npm run test` | `vitest run` | Jalankan semua test sekali |

──────────────────────────────────────────────────────────────

## Build Manual

Saat ini kamu menjalankan app dalam mode **development** (`npm run dev`). Untuk melihat versi yang akan dideploy ke internet, kamu perlu **build** terlebih dahulu:

```cmd
npm run build
```

Lalu preview hasilnya:

```cmd
npm run preview
```

Buka URL yang ditampilkan (biasanya http://localhost:4173/). Ini adalah versi produksi — sama seperti yang akan dilihat user di internet.

──────────────────────────────────────────────────────────────

## Apa yang Dihasilkan Build

`npm run build` membuat folder `dist/` berisi file statis yang siap deploy:

```
dist/
├── index.html              ← Halaman utama (entry point)
├── favicon.svg             ← Icon tab browser
├── icons.svg               ← Sprite SVG icons
└── assets/
    ├── index-xxxxxxxx.js   ← Semua JavaScript/TypeScript dibundle jadi satu file
    └── index-xxxxxxxx.css  ← Semua CSS dibundle jadi satu file
```

| File | Asal | Fungsinya |
|------|------|-----------|
| `index.html` | `index.html` (root) | Halaman utama yang memuat JS dan CSS |
| `assets/*.js` | Semua `.tsx` + library React | Seluruh kode app dibundle dan di-minify jadi satu file |
| `assets/*.css` | Semua `.css` | Seluruh style dibundle dan di-minify jadi satu file |
| `favicon.svg` | `public/favicon.svg` | Icon tab browser |
| `icons.svg` | `public/icons.svg` | Sprite SVG icons |

`xxxxxxxx` pada nama file adalah **hash unik** yang berubah setiap kali kamu build. Tujuannya supaya browser selalu mengambil file terbaru dan tidak menggunakan versi lama yang tersimpan di cache.

Folder `src/` adalah tempat semua kode kamu berada. `main.tsx` adalah entry point — ia memuat `App.tsx`, yang merender component `ProfileCard`. Kita akan mendalami kodenya di bagian berikutnya.

──────────────────────────────────────────────────────────────

## **Checkpoint**

Sebelum lanjut, verifikasi:

- [ ] `npm run dev` menampilkan kartu profil di browser
- [ ] Toggle dark mode berfungsi (klik tombolnya)
- [ ] Kamu memahami struktur file

**Selanjutnya:** Buka `02-profile-card.md` untuk memahami cara kerja kodenya.
