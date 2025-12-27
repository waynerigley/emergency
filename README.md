# 🚨 Emergency Info

A personal emergency information platform that allows users to create secure, shareable emergency contact pages accessible via QR code.

## Concept

In an emergency, first responders or bystanders can scan a QR code (on a wallet card, phone case, medical bracelet, etc.) to instantly access critical medical and contact information - **no app download required**.

## Features

- 📱 **Scan & View** - QR code links directly to emergency info page
- 🩸 **Medical Info** - Blood type, allergies, medications, conditions
- 📞 **Click to Call** - One-tap calling for emergency contacts
- 👨‍👩‍👧 **Family Profiles** - Manage multiple people (kids, parents)
- 🔐 **Secure URLs** - Long random URLs that can't be guessed
- 🖨️ **Printable Cards** - Generate wallet cards with QR codes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Auth**: Firebase Authentication
- **Database**: Firebase Firestore
- **Hosting**: Vercel / Proxmox

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── dashboard/        # User's profiles (TODO)
│   └── e/[slug]/         # Public emergency page (TODO)
├── components/           # Reusable components (TODO)
└── lib/                  # Firebase config, utils (TODO)

docs/
├── PROJECT-SPEC.md       # Full project specification
└── example-emergency-page.html  # Reference implementation
```

## Roadmap

- [x] Project setup with Next.js + Tailwind
- [x] Landing page
- [x] Login/Register UI
- [ ] Firebase Auth integration
- [ ] Profile creation form
- [ ] Emergency page generation
- [ ] QR code generation
- [ ] Wallet card PDF export

## Origin

Originally built as a feature for [tyrigley.com](https://tyrigley.com) - a simple emergency info page for a kid. Expanded into a full platform idea.

## License

MIT
