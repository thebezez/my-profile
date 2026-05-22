# Bagian 4: Set Up CI Pipeline

> **Tujuan**: Push kode ke GitHub dan menyiapkan testing otomatis setiap push.
> **Waktu**: ~20 menit

──────────────────────────────────────────────────────────────

## Apa yang Kita Bangun

```
  Kamu push kode           GitHub Actions
  ke GitHub                berjalan otomatis
  ───────────       ────────────────────────
                  ┌──────────────────────┐
  git push  ────▶ │  1. Install deps     │
                  │  2. Run lint         │
                  │  3. Run tests        │
                  │  4. Run build        │
                  └──────────┬───────────┘
                             │
                      ┌──────┴──────┐
                      │             │
                      ▼             ▼
                  [PASS] Lulus      [FAIL] Gagal
                  (hijau)       (silang merah)
```

Setiap kali kamu push kode, GitHub akan otomatis menjalankan test kamu. Jika gagal, kamu langsung tahu — sebelum sampai ke user.

──────────────────────────────────────────────────────────────

## Langkah 1: Verifikasi Repo Kamu

Kamu seharusnya sudah membuat repo dari template di Bagian 0. Verifikasi remote kamu:

```cmd
git remote -v
```

Kamu seharusnya melihat:

```
origin    https://github.com/YOUR_USERNAME/my-profile.git (fetch)
origin    https://github.com/YOUR_USERNAME/my-profile.git (push)
```

- `origin` = **repo kamu** (kamu push ke sini)

Jika `origin` mengarah ke `flyingstarlai/my-profile` bukan repo kamu, perbaiki:

```cmd
git remote set-url origin https://github.com/YOUR_USERNAME/my-profile.git
```

Ganti `YOUR_USERNAME` dengan username GitHub kamu.

──────────────────────────────────────────────────────────────

## Langkah 2: Buat CI Workflow

Buat feature branch:

```cmd
git checkout -b feature/add-ci
```

Buat struktur folder ini di proyek kamu:

```
.github/
└── workflows/
    └── ci.yml
```

Bisa dibuat dari terminal:

```cmd
mkdir -p .github/workflows
```

Lalu buat file `.github/workflows/ci.yml` dengan konten ini:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

Mari kita bahas baris per baris:

| Baris | Fungsinya |
|------|-----------|
| `name: CI` | Nama yang ditampilkan di tab Actions |
| `on: push/pull_request` | Kapan dijalankan — setiap push ke `main` atau PR ke `main` |
| `runs-on: ubuntu-latest` | GitHub memberikan VM Linux baru |
| `actions/checkout@v4` | Download kode kamu ke VM |
| `actions/setup-node@v4` | Install Node.js 22 |
| `npm ci` | Install dependencies (clean install, lebih cepat dari `npm install`) |
| `npm run lint` | Cek style kode |
| `npm test` | Menjalankan test Vitest kamu |
| `npm run build` | Memastikan proyek bisa build tanpa error |

> **Catatan**: Workflow ini hanya trigger pada **push ke `main`** dan **PR ke `main`**. Ketika kamu push ke branch `feature/add-ci`, workflow **tidak** berjalan — ini normal. CI akan berjalan saat kamu membuat Pull Request (via event `pull_request`).


──────────────────────────────────────────────────────────────

## Mengapa Pull Request?

Kamu mungkin bertanya: **kenapa tidak langsung push ke `main`?**

Alasannya:

1. **`main` adalah "live code"**. Kode di `main` adalah apa yang user lihat. Mengedit langsung berisiko memasukkan bug ke production.

2. **Pull Request = penghubung**. PR menghubungkan branch kamu ke `main` dan memicu CI otomatis. Kamu bisa lihat hasilnya sebelum merge.

3. **Safety net**. Jika CI gagal di PR, kamu tahu ada masalah. Kode bermasalah tidak pernah sampai ke `main`.

```
  Alur kerja profesional:

  branch ──▶ Pull Request ──▶ CI cek ──▶ merge ke main
                  ▲
              CI berjalan di sini
```


──────────────────────────────────────────────────────────────

## Langkah 3: Push dan Buka Pull Request

Commit dan push ke repo kamu:

```cmd
git add .
git commit -m "tambah workflow CI"
git push -u origin feature/add-ci
```

Buka Pull Request menggunakan `gh` CLI:

```cmd
gh pr create --title "Tambah workflow CI" --body "Menyiapkan pipeline CI GitHub Actions yang menjalankan lint, test, dan build pada setiap push dan PR."
```

Atau lakukan di browser:

1. Buka repo kamu di GitHub (**https://github.com/YOUR_USERNAME/my-profile**)
2. Klik tab **Pull Requests** → **New Pull Request**
3. Base: `main` ← Compare: `feature/add-ci`
4. Klik **Create Pull Request**

Kamu seharusnya melihat workflow berjalan di PR (lingkaran kuning).

Ini adalah **workflow yang sesungguhnya** — branch → PR → CI check → merge. Bukan sekadar push ke `main`.

### Pantau CI berjalan

Dari terminal:

```cmd
gh pr checks
```

Atau klik PR di browser untuk melihat statusnya.

Saat selesai, kamu akan melihat:
- **Centang hijau** -- semua langkah lulus
- **Silang merah** -- ada yang gagal (klik untuk melihat error)

Setelah CI lulus, merge PR (jalankan dari feature branch):

```cmd
gh pr merge
```

`gh pr merge` merge PR di remote, namun local `main` belum tentu ter-update. Sinkronkan local:

```cmd
git checkout main
git pull
```

Sekarang local `main` sudah berisi hasil merge, dan kamu siap membuat feature branch baru.

Eksekusi pertama memakan waktu 1-2 menit. Sambil menunggu, saya akan menjelaskan apa yang terjadi di balik layar...

──────────────────────────────────────────────────────────────

## Memahami Tab Actions

```
  Repositori GitHub
  ┌─────────────────────────────────────────────────┐
  │  Code  Issues  Pull requests  Actions  ...       │
  │                                      ▲           │
  │  ┌──────────────────────────────────┐│           │
  │  │ CI /  add CI workflow             ││           │
  │  │ [pass] Nama Kamu — 2 menit lalu   ││           │
  │  │                                   ││           │
  │  │  Detail run:                      ││           │
  │  │  [pass] Checkout                  ││           │
  │  │  [pass] Setup Node.js             ││           │
  │  │  [pass] npm ci                    ││           │
  │  │  [pass] npm run lint              ││           │
  │  │  [pass] npm test                  ││           │
  │  │  [pass] npm run build             ││           │
  │  └──────────────────────────────────┘│           │
  └─────────────────────────────────────────────────┘
```

Klik langkah apa saja untuk melihat log lengkap. Jika test gagal, log menunjukkan persis test mana dan alasannya.

──────────────────────────────────────────────────────────────

## **Checkpoint**

Sebelum lanjut, verifikasi:

- [ ] Kamu push ke **repo kamu**
- [ ] Tab Actions menampilkan workflow run di Pull Request kamu
- [ ] Workflow menampilkan centang hijau (pass)
- [ ] Kamu merge Pull Request ke `main`

**Masalah umum:**
- `npm run lint` gagal → mungkin ada error linting. Jalankan `npm run lint` lokal dulu dan perbaiki.
- `npm test` gagal → test mungkin berperilaku berbeda di mesin CI. Cek error log.
- Workflow tidak muncul → pastikan `.github/workflows/ci.yml` sudah di-commit dan push.
- Error permission → pastikan repo kamu tidak menggunakan branch protection (kita bekerja solo).

**Selanjutnya:** Buka `05-deploy.md` untuk deploy situs kamu ke internet.
