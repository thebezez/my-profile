import { useState } from 'react'
import { ProfileCard } from './components/profile-card'
import { SunIcon, MoonIcon } from './components/icons'
import './components/profile-card.css'
import './App.css'

function App() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="app">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
      <ProfileCard
        name="Muhammad Rifqi Abidi"
        bio="Mahasigma super"
        skills={['React', 'TypeScript', 'Node.js', 'Git']}
        avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=student"
        githubUrl="https://github.com/Muhammad Rifqi Abidi"
      />
    </div>
  )
}

export default App
