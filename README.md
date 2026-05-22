# My Profile

My student profile card — built with React + Vite + TypeScript.


## Live Demo

https://YOUR_USERNAME.github.io/my-profile/

## Slide

[CI/CD For Modern Web Developer](https://docs.google.com/presentation/d/1SV_Wq6DlQRE5O93GvXtEqqDlijFS39xAEzUcMU29KQ8/edit?usp=sharing)

## Tech Stack

- React 19 + TypeScript 6
- Vite 8 (build tool)
- Vitest 4 + Testing Library (testing)
- ESLint (linting)
- GitHub Actions (CI/CD)
- GitHub Pages (hosting)

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:5173/ |
| `npm test` | Run all tests once |
| `npm run lint` | Check code style |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview production build locally |

## Project Structure

```
my-profile/
├── src/
│   ├── App.tsx               ← Main component with theme toggle
│   ├── App.css               ← Global styles + theme variables
│   ├── App.test.tsx          ← Tests for App component
│   ├── main.tsx              ← Entry point
│   ├── components/
│   │   ├── profile-card.tsx  ← Profile card component
│   │   ├── profile-card.css  ← Profile card styles
│   │   └── icons.tsx         ← SVG icon components
│   ├── utils/
│   │   └── format-bio.ts     ← Bio truncation utility
│   └── test/
│       └── setup.ts          ← Test setup file
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── .github/workflows/
│   ├── ci.yml                ← CI pipeline
│   └── deploy.yml            ← CD pipeline
├── docs/                     ← Workshop materials
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.test.json
└── eslint.config.js
```
