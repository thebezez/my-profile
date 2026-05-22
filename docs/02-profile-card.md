# Bagian 2: Memahami Kode

> **Tujuan**: Memahami component profile card.
> **Waktu**: ~10 menit

Buka file-file berikut di editor kamu dan pelajari poin-poinnya:

──────────────────────────────────────────────────────────────

## `src/App.tsx` — Entry Point

- `useState(false)` — state `isDark` untuk tema. `false` = light mode.
- `toggleTheme()` — toggle class `dark` di `<html>`, mengganti seluruh tema.
- `<ProfileCard ... />` — menerima data via **props**: `name`, `bio`, `skills`, `avatarUrl`, `githubUrl`.
- `SunIcon` / `MoonIcon` — icon SVG dari `icons.tsx`, dipakai di tombol tema.

## `src/components/profile-card.tsx`

- `interface ProfileCardProps` — tipe data props. TypeScript akan error kalau tipe salah.
- `formatBio(bio)` — memanggil utilitas untuk trim bio panjang.
- `skills.map()` — render daftar skill. React butuh `key` unik untuk tiap item.
- Icon (`GitHubIcon`) — diimpor dari `icons.tsx` supaya file tetap bersih.

## `src/components/icons.tsx` — Icon

File terpisah berisi `SunIcon`, `MoonIcon`, `MapPinIcon`, `GitHubIcon`. Dipisahkan supaya bisa dipakai ulang dan file lain tetap rapi.

## `src/utils/format-bio.ts` — Utility

- Bio ≤ 100 karakter → tampilkan apa adanya.
- Bio > 100 karakter → potong dan tambah `"..."`.
- **Pure function** — input sama, output selalu sama. Mudah di-test.


──────────────────────────────────────────────────────────────

## Kustomisasi Profil

Edit `src/App.tsx`, ubah props `<ProfileCard>` dengan data kamu:

- `name` — nama kamu
- `bio` — bio singkat
- `skills` — skill kamu
- `githubUrl` — URL GitHub kamu

Simpan dan cek browser — Vite HMR update secara instan.

Commit dan push perubahan kamu:

```cmd
git add .
git commit -m "kustomisasi profile dengan data saya"
git push
```

──────────────────────────────────────────────────────────────

## **Checkpoint**

- [ ] Kamu mengerti fungsi setiap file (`App.tsx`, `profile-card.tsx`, `icons.tsx`, `format-bio.ts`)
- [ ] Kamu sudah kustomisasi profil dengan data kamu sendiri
- [ ] Kamu memahami bahwa `formatBio` adalah pure function

**Selanjutnya:** Buka `03-testing.md` untuk menulis test untuk kode ini.
