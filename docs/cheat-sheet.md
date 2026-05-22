# Lembar Cheat

## Perintah

| Perintah | Fungsinya |
|---------|-----------|
| `npm run dev` | Jalankan dev server di http://localhost:5173/ |
| `npm test` | Jalankan semua test sekali |
| `npm run build` | Build untuk produksi → `dist/` |
| `npm run lint` | Cek style kode |
| `npm run preview` | Preview build produksi secara lokal |

## Perintah Git

| Perintah | Fungsinya |
|---------|-----------|
| `git clone URL` | Download repo ke laptop |
| `git add .` | Stage semua perubahan |
| `git commit -m "msg"` | Simpan snapshot |
| `git push -u origin branch` | Upload branch ke repo kamu |
| `git push` | Upload (setelah -u diset) |
| `git pull origin main` | Download terbaru dari repo kamu |
| `git checkout -b nama` | Buat & pindah ke branch baru |
| `git checkout main` | Kembali ke main |
| `git branch` | Daftar branch |
| `git remote -v` | Tampilkan remote repo (origin = repo kamu) |

## Perintah GitHub CLI (`gh`)

| Perintah | Fungsinya |
|---------|-----------|
| `gh auth login` | Login ke GitHub dari terminal |
| `gh auth status` | Cek apakah sudah login |
| `gh repo create my-profile --template flyingstarlai/my-profile --clone --public` | Buat repo dari template + download |
| `gh pr create --title "..." --body "..."` | Buka Pull Request |
| `gh pr checks` | Cek status CI di PR saat ini |
| `gh pr merge` | Merge PR saat ini (harus di feature branch) |
| `gh pr list` | Daftar PR yang terbuka |

## Workflow PR

```
1. git checkout -b feature/my-thing     ← Buat branch
2. (edit file)                           ← Buat perubahan
3. git add . && git commit -m "..."     ← Commit
4. git push -u origin feature/my-thing  ← Push ke repo KAMU
5. gh pr create --title "..." --body "..."  ← Buka Pull Request
6. gh pr checks                          ← Tunggu CI pass
7. gh pr merge                           ← Merge (otomatis pindah ke main)
```

## Referensi YAML

```yaml
name: Workflow Name          # Ditampilkan di tab Actions

on:                           # Kapan dijalankan
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:                         
  job-name:
    runs-on: ubuntu-latest    # OS untuk runner
    steps:                    
      - uses: actions/checkout@v4    # Download kode kamu
      - uses: actions/setup-node@v4  # Install Node.js
        with:
          node-version: 22
      - run: npm ci           # Install dependencies
      - run: npm test         # Jalankan test
```

## Struktur File

```
my-profile/
├── src/
│   ├── App.tsx               ← Component utama
│   ├── App.css               ← Style global + tema
│   ├── App.test.tsx          ← Test untuk App
│   ├── main.tsx              ← Entry point
│   ├── components/
│   │   ├── profile-card.tsx  ← Component kartu profil
│   │   ├── profile-card.css  ← Style kartu
│   │   └── icons.tsx         ← SVG icon components
│   ├── utils/
│   │   └── format-bio.ts     ← Utilitas pemotongan bio
│   └── test/
│       └── setup.ts          ← Setup file testing
├── public/
│   ├── favicon.svg           ← Icon tab browser
│   └── icons.svg             ← Sprite SVG icons
├── .github/workflows/
│   ├── ci.yml                ← Pipeline CI
│   └── deploy.yml            ← Pipeline CD
├── docs/                     ← Materi workshop
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.test.json
└── eslint.config.js
```

## Konsep Utama

| Istilah | Artinya |
|---------|---------|
| **Pipeline** | Seluruh proses otomatis |
| **Workflow** | Satu proses spesifik (misalnya, CI) |
| **Job** | Satu langkah dalam workflow (misalnya, build) |
| **Step** | Satu aksi (misalnya, jalankan `npm test`) |
| **Artifact** | Output yang sudah di-build (dist/) |
| **PR (Pull Request)** | Permintaan untuk merge branch kamu ke main — CI berjalan sebelum merge |
| **Branch** | Salinan kode tempat kamu membuat perubahan dengan aman |
| **origin** | Repo kamu di GitHub |

## URL

- **Repo instruktur**: `github.com/flyingstarlai/my-profile`
- **Tab Actions**: `github.com/YOUR_USERNAME/my-profile/actions`
- **Web URL**: `YOUR_USERNAME.github.io/my-profile/`
