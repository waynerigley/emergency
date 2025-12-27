# 🔗 Rescue Link ID

**rescuelinkid.com**

A personal emergency information platform that allows users to create secure, shareable emergency contact pages accessible via QR code.

## Concept

In an emergency, first responders or bystanders can scan a QR code (on a wallet card, phone case, medical bracelet, etc.) to instantly access critical medical and contact information - **no app download required**.

Users can sign in and list their primary contact information, emergency contacts, medications, medical info, and address. Each profile generates a QR code linking to a unique, unguessable URL. Perfect for elderly individuals who may get lost, or anyone with medical conditions.

## Features

- 📱 **Scan & View** - QR code links directly to emergency info page
- 🩸 **Medical Info** - Blood type, allergies, medications, conditions
- 📞 **Click to Call** - One-tap calling for emergency contacts
- 👨‍👩‍👧 **Family Profiles** - Manage multiple people (kids, parents)
- 🔐 **Secure URLs** - Long random URLs that can't be guessed
- 🖨️ **Printable Cards** - Generate wallet cards with QR codes
- 🌓 **Light/Dark Mode** - Theme toggle for user preference

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Auth**: Firebase Authentication (planned)
- **Database**: Firebase Firestore (planned)
- **Hosting**: Proxmox / Custom Domain

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

**Test Login:** `admin` / `1234`

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── dashboard/        # User's profiles
│   ├── info/             # Features & security info
│   ├── admin/            # Admin panel
│   ├── payment/          # Payment instructions
│   └── e/[slug]/         # Public emergency page
├── components/           # ThemeProvider, Header, etc.
└── lib/                  # Mock data, utilities

docs/
├── README-project.md     # Full project specification
└── example-emergency-page.html  # Reference implementation
```

## Roadmap

- [x] Project setup with Next.js + Tailwind
- [x] Landing page
- [x] Login/Register UI
- [x] Light/Dark theme toggle
- [x] Dashboard page
- [x] Info page with security details
- [x] Admin panel
- [x] Payment page
- [x] Emergency page (/e/[slug])
- [ ] Firebase Auth integration
- [ ] Profile creation/edit form
- [ ] QR code generation
- [ ] Wallet card PDF export
- [ ] EmailJS contact form

## Business Model

- 30-day free trial (no credit card required)
- $40/year subscription
- Payment via e-transfer

## License

MIT
