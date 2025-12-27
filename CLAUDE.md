# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rescue Link ID (rescuelinkid.com) - A Next.js application for creating shareable emergency information pages with QR codes. First responders or bystanders scan a QR code (wallet card, phone case, medical bracelet) to instantly access critical medical and contact information - no app or login required to view.

### Target Users
- Elderly individuals who may get lost
- Anyone with medical conditions
- Parents creating profiles for children

### Business Model
- 30-day free trial (no credit card, all features available)
- $40/year subscription
- Manual payment process (e-transfer/EMT) - payment page TBD

### Core User Features
- Primary contact info, emergency contacts, address
- Medications and medical information
- QR code generation with unique unguessable URLs
- Printable/laminatable wallet cards

### Admin Features
- Admin panel to manage users and trials
- User contact form (EmailJS planned)
- Version number displayed on site

### Security Requirements
- All data encrypted at rest
- Information page explaining security measures
- URLs must be unguessable (20+ character slugs)

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
- `/` - Landing page with login section + info button (server component)
- `/login` - Login form (client component)
- `/register` - Registration form (client component)
- `/dashboard` - User dashboard to manage profiles (not yet implemented)
- `/e/[slug]` - Public emergency page, no auth required (not yet implemented)
- `/info` - Features and security information page (not yet implemented)
- `/admin` - Admin panel for user/trial management (not yet implemented)
- `/payment` - Subscription payment info page (not yet implemented)

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
