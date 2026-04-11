# AGENTS.md - Coding Guidelines for Agentic AI

## Project Overview

React + Vite frontend application for TerangaMath website. Uses Tailwind CSS v4, React 19, and i18next for internationalization.

## Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Lint check
npm run lint

# Preview production build
npm run preview
```

**Note**: No test runner configured. Add tests with Vitest or Jest if needed.

## Code Style Guidelines

### Imports
- Use ES modules (`"type": "module"` in package.json)
- Group imports: React/dependencies first, then local modules, then assets
- Use relative paths for local imports (`../components/`, `../../assets/`)

```javascript
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../layouts/Header';
import logo from '../../assets/logo/tm.png';
```

### Formatting
- Semicolons: optional but be consistent within files
- Quotes: single quotes for strings
- Indent: 2 spaces
- JSX: self-closing tags when no children

### Naming Conventions
- Components: PascalCase (e.g., `Home.jsx`, `FloatingSoutenir`)
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE for true constants
- Files: PascalCase for components, camelCase for utilities
- CSS: Tailwind classes (no custom CSS files)

### Component Structure
- Default exports for page/feature components
- Functional components with hooks
- Use `useTranslation()` from react-i18next for i18n

```javascript
export default function ComponentName() {
  const { t } = useTranslation();
  // component logic
}
```

### Styling (Tailwind CSS v4)
- Use Tailwind utility classes exclusively
- No custom CSS files (index.css only imports Tailwind)
- Responsive: use `sm:`, `md:`, `lg:`, `xl:` prefixes
- Colors: use standard Tailwind palette or theme colors

### Error Handling
- ESLint configured with react-hooks and react-refresh rules
- No-unused-vars rule ignores UPPER_SNAKE_CASE pattern
- Use optional chaining where appropriate

### Project Structure
```
src/
  components/
    {feature}/          # Page/feature directories
      Component.jsx
    layouts/             # Header, Footer
  assets/
    logo/               # Logo files
    others/             # General images
    partners/           # Partner logos
  locales/              # i18n JSON files
    fr.json
    en.json
```

### i18n Guidelines
- Use translation keys with dot notation: `t('home.pillars.olympiades.title')`
- Default language: French (fr)
- Fallback: French
- All user-facing text must use `t()` function

### ESLint Rules
- Extends: `@eslint/js/recommended`, `react-hooks/recommended`, `react-refresh/vite`
- Custom rule: `no-unused-vars` ignores `^[A-Z_]` pattern
- Ignores: `dist/` directory

### Git Workflow
- GitHub Actions workflow in `.github/workflows/deploy.yml`
- No pre-commit hooks configured

## Key Dependencies

- React 19 + React DOM
- React Router DOM v7
- Framer Motion (animations)
- i18next + react-i18next
- Tailwind CSS v4 + @tailwindcss/vite
- Lucide React (icons)
- Three.js (3D - if needed)

## Important Notes

1. **JSX only**: No TypeScript in this project
2. **Vite**: Uses Vite for bundling and dev server
3. **ES2020**: Target ECMAScript version
4. **No tests**: Add testing framework if implementing tests
5. **StrictMode**: App wrapped in React StrictMode
