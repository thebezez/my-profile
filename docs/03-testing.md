# Bagian 3: Menulis Test

> **Tujuan**: Menulis component test dan unit test.
> **Waktu**: ~10 menit

──────────────────────────────────────────────────────────────

## Langkah 1: Component Test untuk App

Project ini sudah memiliki test setup (Vitest + Testing Library). Buka file `src/App.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('menampilkan github link', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })
})
```

Penjelasan baris per baris:

| Baris | Fungsi |
|-------|--------|
| `render(<App />)` | Me-render komponen React ke DOM virtual (jsdom) |
| `screen.getByRole('link', { name: /github/i })` | Mencari `<a>` yang berisi teks "GitHub" |
| `toBeInTheDocument()` | Matcher dari `@testing-library/jest-dom`, memastikan elemen ada di DOM |
| `describe('App', ...)` | Mengelompokkan test terkait komponen App |
| `it('menampilkan github link', ...)` | Mendefinisikan satu kasus test |

### Tantangan

Tambahkan test baru di dalam `describe('App', ...)` yang memeriksa nama profil ditampilkan:

```tsx
it('menampilkan nama profil', () => {
  render(<App />)
  expect(screen.getByText('Nama Kamu')).toBeInTheDocument()
})
```

Jalankan:

```cmd
npm test
```

Kamu seharusnya melihat 1 test lulus (atau 2 setelah menyelesaikan tantangan).

──────────────────────────────────────────────────────────────

## Langkah 2: Unit Test untuk `formatBio`

Selain component test, kita bisa mengetes **pure function** secara langsung — tanpa UI, tanpa React, tanpa browser. Input sederhana → output yang diharapkan.

Buat file `src/utils/format-bio.test.ts`:

```ts
import { formatBio } from './format-bio'

describe('formatBio', () => {
  it('mengembalikan bio pendek tanpa perubahan', () => {
    expect(formatBio('Hello World', 20)).toBe('Hello World')
  })

  it('memotong bio panjang dan menambahkan ...', () => {
    expect(formatBio('Seorang mahasiswa yang sedang belajar React dan TypeScript', 15)).toBe('Seorang mahasis...')
  })

  it('menangani string kosong', () => {
    expect(formatBio('', 10)).toBe('')
  })
})
```

`expect(...).toBe(...)` memeriksa apakah hasilnya sesuai.

Jalankan:

```cmd
npm test
```

Kamu seharusnya melihat 4 test lulus (atau 5 setelah menyelesaikan tantangan).

──────────────────────────────────────────────────────────────

## Simpan Perubahan

Commit dan push semua test yang sudah kamu buat:

```cmd
git add .
git commit -m "tambah test untuk App dan formatBio"
git push
```

──────────────────────────────────────────────────────────────

## **Checkpoint**

Sebelum lanjut, verifikasi:

- [ ] `npm test` menampilkan 4 test lulus (atau 5 setelah menyelesaikan tantangan)
- [ ] Kamu tahu bahwa `npm test` menjalankan semua test sekali
- [ ] Kamu memahami perbedaan component test (render UI) vs unit test (pure function)

**Selanjutnya:** Buka `04-ci-pipeline.md` untuk menyiapkan GitHub Actions CI.
