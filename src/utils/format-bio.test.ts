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