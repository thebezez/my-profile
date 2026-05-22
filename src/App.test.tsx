import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('menampilkan github link', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })
})
