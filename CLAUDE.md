# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Emergency Info Platform - A Next.js application for creating shareable emergency information pages with QR codes. Currently in early development (UI-only stage, Firebase integration pending).

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Planned:** Firebase Auth, Firestore, QR code generation

## Architecture

### Routing Structure
- `/` - Landing page (server component)
- `/login` - Login form (client component)
- `/register` - Registration form (client component)
- `/dashboard` - User dashboard (not yet implemented)
- `/e/[slug]` - Public emergency page (not yet implemented)

### Component Patterns
- Server components are default; use `"use client"` directive for interactive pages
- Form state managed with React useState hooks
- Tailwind utility classes for all styling (no CSS modules)

### Styling Conventions
- Dark theme with slate colors (800, 900)
- Red accent color for emergency context
- Responsive design with Tailwind breakpoints (`md:`, `lg:`)
- Gradient backgrounds for visual hierarchy

## Custom Agents

### github-filebase-sync
Use this agent after major changes to sync with the GitHub private repository. Invoke it:
- After completing significant features or refactors
- After file additions, modifications, or structural changes
- After project initialization or configuration updates

The agent handles git staging, commits with conventional message format, and pushes to the remote.

## Project Documentation

Detailed specifications including database schema, feature breakdown, and development phases are in `docs/README-project.md`.
