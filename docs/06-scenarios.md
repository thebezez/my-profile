# Bagian 6: Skenario & Tantangan

> **Tujuan**: Berlatih siklus CI/CD secara lengkap.
> **Waktu**: ~20 menit

──────────────────────────────────────────────────────────────

## Skenario 1: "Tidak sengaja menulis kode yang salah"

> Kamu sudah tahu cara branch dan membuka PR dari Bagian 4-5. Sekarang mari lihat CI/CD melakukan **tugas utamanya**: menangkap bug sebelum sampai ke user.

### 1. Buat branch

```cmd
git checkout -b fix/break-on-purpose
```

### 2. Rusak fungsi `formatBio`

Buka `src/utils/format-bio.ts` dan ubah untuk mengembalikan hal yang salah:

```ts
export function formatBio(bio: string, maxLength: number = 100): string {
  return bio.substring(0, maxLength)
}
```

### 3. Jalankan test secara lokal

```cmd
npm test
```

Kamu seharusnya melihat test GAGAL — fungsi tidak lagi menambahkan `...` saat teks dipotong, dan tidak melakukan `trimEnd()`.

### 4. Push dan buka Pull Request

```cmd
git add .
git commit -m "oops: sengaja rusak formatBio"
git push -u origin fix/break-on-purpose
```

Lalu buka PR:

```cmd
gh pr create --title "Sengaja rusak formatBio" --body "Menguji deteksi kegagalan CI."
```

### 5. Pantau CI gagal

Di halaman Pull Request kamu, kamu seharusnya melihat:

```
[FAIL] CI — Some checks were not successful
```

Klik **"Details"** untuk melihat test mana yang gagal dan alasannya.

> **Ini adalah fungsi utama CI/CD.** Bug tidak pernah sampai ke `main`. Test menangkapnya secara otomatis. Kode yang error **diblokir** dari merge.

### 6. Perbaiki bug

Buka `src/utils/format-bio.ts` dan kembalikan:

```ts
export function formatBio(bio: string, maxLength: number = 100): string {
  if (bio.length <= maxLength) return bio
  return bio.substring(0, maxLength).trimEnd() + '...'
}
```

### 7. Push perbaikannya

```cmd
git add .
git commit -m "perbaikan: kembalikan fungsi formatBio"
git push
```

### 8. Pantau CI lulus

Kembali ke Pull Request kamu. Statusnya seharusnya berubah menjadi:

```
[PASS] CI — All checks have passed
```

Cek dari terminal:

```cmd
gh pr checks
```

### 9. Merge

```cmd
gh pr merge
```

`gh pr merge` merge PR di remote. Sinkronkan local `main`:

```cmd
git checkout main
git pull
```


──────────────────────────────────────────────────────────────

## Skenario 2: "Kirim fitur baru"

Mari tambahkan **field lokasi** ke kartu profil kamu — fitur baru yang dikirim melalui workflow lengkap branch → PR → CI → merge → deploy.

### 1. Buat feature branch

```cmd
git checkout -b feature/add-location
```

### 2. Tambahkan prop `location` ke ProfileCard

Buka `src/components/profile-card.tsx` dan update — tambahkan `location` ke interface, import `MapPinIcon`, dan render di bawah nama:

```tsx
interface ProfileCardProps {
  name: string
  bio: string
  skills: string[]
  avatarUrl: string
  githubUrl: string
  location: string
}

import { formatBio } from '../utils/format-bio'
import { MapPinIcon, GitHubIcon } from './icons'

export { SunIcon, MoonIcon } from './icons'

export function ProfileCard({ name, bio, skills, avatarUrl, githubUrl, location }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <div className="profile-card-header" />
      <div className="profile-card-body">
        <div className="avatar-wrapper">
          <img src={avatarUrl} alt={name} className="avatar" />
          <span className="avatar-status" />
        </div>
        <h1 className="name">{name}</h1>
        <p className="location">
          <MapPinIcon />
          {location}
        </p>
        <p className="bio">{formatBio(bio)}</p>
        <div className="divider" />
        <p className="skills-label">Keahlian</p>
        <div className="skills">
          {skills.map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
        <a href={githubUrl} target="_blank" className="github-link" rel="noreferrer">
          <GitHubIcon />
          GitHub
        </a>
      </div>
    </div>
  )
}
```

### 3. Update App.tsx

Tambahkan prop `location` di `src/App.tsx`:

```tsx
<ProfileCard
  name="Nama Kamu"
  bio="Mahasiswa Ilmu Komputer yang suka membangun sesuatu."
  skills={['React', 'TypeScript', 'Node.js', 'Git']}
  avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=student"
  githubUrl="https://github.com/USERNAME_KAMU"
  location="Malang, Jawa Timur"
/>
```

Ganti dengan info asli kamu.

### 4. Tulis test untuk fitur baru

Buat file `src/components/profile-card.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ProfileCard } from './profile-card'

const defaultProps = {
  name: 'Budi',
  bio: 'Mahasiswa yang suka ngoding',
  skills: ['React', 'Node'],
  avatarUrl: 'https://example.com/avatar.png',
  githubUrl: 'https://github.com/budi',
  location: 'Malang, Jawa Timur',
}

describe('ProfileCard', () => {
  it('merender link GitHub', () => {
    render(<ProfileCard {...defaultProps} />)
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://github.com/budi')
  })

  it('merender lokasi', () => {
    render(<ProfileCard {...defaultProps} />)
    expect(screen.getByText(/Malang, Jawa Timur/)).toBeInTheDocument()
  })
})
```

### 5. Test secara lokal

```cmd
npm run dev
```

Verifikasi lokasi muncul di bawah nama kamu.

```cmd
npm test
```

Verifikasi SEMUA test lulus — kamu seharusnya sekarang punya lebih banyak test dari sebelumnya.

### 6. Push → PR → CI → Merge → Deploy

```cmd
git add .
git commit -m "fitur: tambah field lokasi ke profile card"
git push -u origin feature/add-location
```

Buka PR:

```cmd
gh pr create --title "Tambah field lokasi ke profile card" --body "Fitur baru: menampilkan lokasi di profile card dengan test coverage."
```

Tunggu CI complete

```cmd
gh pr checks
```

Merge (jalankan dari feature branch):

```cmd
gh pr merge
```

`gh pr merge` merge PR di remote. Sinkronkan local `main`:

```cmd
git checkout main
git pull
```


──────────────────────────────────────────────────────────────



Untuk referensi cepat, cek `cheat-sheet.md`. Jika ada yang salah, cek `troubleshooting.md`.
