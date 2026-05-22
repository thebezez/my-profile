# Troubleshooting

## Masalah Umum

### "Tidak bisa clone repo"

**Solusi:**
1. Pastikan kamu menggunakan URL repo KAMU:
   ```cmd
   git clone https://github.com/YOUR_USERNAME/my-profile.git
   ```
2. Atau gunakan `gh` untuk membuat repo dari template dan clone:
   ```cmd
   gh repo create my-profile --template flyingstarlai/my-profile --clone --public
   ```
3. Jika kamu salah clone, hapus folder dan clone ulang dari URL yang benar.

---

### "git push bilang permission denied"

**Penyebab:** `origin` mengarah ke repo yang salah, atau belum login dengan `gh auth`.

**Solusi:**
1. Cek remote kamu: `git remote -v`
2. `origin` harus mengarah ke `https://github.com/YOUR_USERNAME/my-profile.git`
3. Jika mengarah ke repo instruktur, perbaiki:
   ```cmd
   git remote set-url origin https://github.com/YOUR_USERNAME/my-profile.git
   ```
4. Jika credential error, jalankan `gh auth login` lagi.

---

### "`gh auth login` tidak berfungsi"

**Gejala:** Browser tidak terbuka, atau kode tidak bisa di-paste.

**Solusi:**
1. Coba jalankan `gh auth login` lagi
2. Pilih **HTTPS** sebagai protocol
3. Pilih **Login with a web browser**
4. Copy kode satu kali secara manual, lalu buka https://github.com/login/device di browser
5. Paste kodenya di sana


---

### "`gh` command not found"

**Solusi:**
Install GitHub CLI:

**Windows:**
```cmd
winget install GitHub.cli
```

**Linux:**
```cmd
sudo apt install gh
```

Verifikasi: `gh --version`

---

### "Test tidak mau berjalan"

**Gejala:** `npm test` error dengan "command not found" atau error modul.

**Solusi:**
1. Pastikan kamu sudah install dependencies test:
   ```cmd
   npm install -D vitest jsdom
   ```
2. Pastikan `"test": "vitest run"` ada di `package.json` bagian `"scripts"`
3. Pastikan `vite.config.ts` punya blok `test`:
   ```ts
   test: {
     environment: 'jsdom',
     globals: true,
   }
   ```

---

### "Test gagal dengan `document is not defined`"

**Penyebab:** Vitest tidak punya lingkungan browser yang dikonfigurasi.

**Solusi:** Tambahkan `environment: 'jsdom'` ke blok `test` di `vite.config.ts`.

---

### "`toBeInTheDocument` is not a function"

**Solusi:** Tambahkan import ini di bagian atas file test kamu:
```ts
import '@testing-library/jest-dom'
```

---

### "GitHub Actions menampilkan error permission"

**Gejala:** Deploy workflow gagal dengan "Permission denied" atau "Resource not accessible".

**Solusi:**
1. Buka **Settings → Pages → Source** dan pilih **GitHub Actions**
2. Pastikan repositori kamu **Public** (GitHub Pages gratis membutuhkan repo public)
3. Cek bahwa `deploy.yml` punya blok `permissions` yang benar:
   ```yaml
   permissions:
     pages: write
     id-token: write
   ```

---

### "Halaman kosong setelah deploy"

**Penyebab:** `base` path hilang di config Vite. GitHub Pages melayani situs kamu di `/my-profile/`, tapi Vite tidak tahu tentang itu.

**Solusi:** Buka `vite.config.ts` dan pastikan `base` sudah diset untuk production:
```ts
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/my-profile/' : '/',
  // ... sisa config
})
```

`/my-profile/` harus sama persis dengan nama repo GitHub kamu.

---

### "CSS tidak loading di GitHub Pages"

**Penyebab:** Sama seperti halaman kosong — `base` path hilang. File CSS direferensikan dengan path yang salah.

**Solusi:** Set `base` production path di `vite.config.ts` dan build ulang.

---

### "Error 404 saat mengunjungi situs"

**Kemungkinan penyebab:**
1. URL salah — cek nama repo cocok: `YOUR_USERNAME.github.io/REPO_NAME/`
2. Deploy workflow belum selesai — cek tab Actions
3. GitHub Pages belum diaktifkan — buka Settings → Pages → Source: GitHub Actions

---

### "`npm run lint` gagal"

**Solusi:**
1. Jalankan `npm run lint` secara lokal untuk melihat errornya
2. Error lint umum:
   - Variabel tidak terpakai → hapus atau tambahkan prefix `_`
   - Return type hilang → TypeScript bisa infer, tapi ESLint mungkin komplain
   - Import tidak terpakai → hapus

---

### "Deploy workflow tidak berjalan"

**Cek:**
1. Kamu push ke branch `main` (deploy hanya trigger di main)
2. `.github/workflows/deploy.yml` ada dan sudah di-commit
3. GitHub Pages sudah diaktifkan dengan Source diset ke "GitHub Actions"

---

### "Bagaimana cara update situs live?"

Buat branch, push, buka PR, merge:
```cmd
git checkout -b feature/my-change
# (edit file)
git add .
git commit -m "deskripsi perubahan"
git push -u origin feature/my-change
gh pr create --title "Perubahan saya" --body "Deskripsi"
gh pr merge
```

`gh pr merge` merge PR dan otomatis pindah ke `main`. Deploy workflow berjalan otomatis setelah merge. Tunggu 1-2 menit, lalu refresh situs kamu (Ctrl+Shift+R untuk hard refresh).

---

### "Perubahan tidak muncul di situs live"

1. Tunggu 1-2 menit untuk deploy workflow selesai
2. Hard refresh: **Ctrl+Shift+R**
3. Cek tab Actions — apakah deploy workflow masih berjalan?
4. Cek deploy workflow — apakah berhasil?

