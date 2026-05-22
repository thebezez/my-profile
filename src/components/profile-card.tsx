interface ProfileCardProps {
  name: string
  bio: string
  skills: string[]
  avatarUrl: string
  githubUrl: string
}

import { formatBio } from '../utils/format-bio'
import { GitHubIcon } from './icons'

export { SunIcon, MoonIcon } from './icons'

export function ProfileCard({ name, bio, skills, avatarUrl, githubUrl }: ProfileCardProps) {
  return (
    <div className="profile-card">
      <div className="profile-card-header" />
      <div className="profile-card-body">
        <div className="avatar-wrapper">
          <img src={avatarUrl} alt={name} className="avatar" />
          <span className="avatar-status" />
        </div>
        <h1 className="name">{name}</h1>
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
