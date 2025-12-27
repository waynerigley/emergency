# 🚨 Emergency Info

A personal emergency information platform that allows users to create secure, shareable emergency contact pages accessible via QR code.

## Concept

In an emergency, first responders or bystanders can scan a QR code (on a wallet card, phone case, medical bracelet, etc.) to instantly access critical medical and contact information - **no app download required**. This website is going to be open to the public so I need a main landing page that has user login section as well as a informational button. That tells you all about the features and what it does. This website is essentially going to be. For people. To sign in. And list their primary contact information, emergency contact information. Medicines that they are on. And anything medical. As well as an address. This. Individual user. Layout. Will have the ability to print a QR code. To a very unique URL that would not be guessed by another user or anybody trying to infiltrate the system. Each QR code on scan. Will bring you to the emergency contact for that person without having to log into anything. So this will be valid for elderly people that may get lost. Or a medical situation. The thought is to have the QR code printed out. Where they would be able to laminate it and keep it on their person. Do you have any other ideas that we could implement into this? I would like a test HTML while we're building this. Until we're finalized and then I can set up a container on Proxmox and get a URL. To set this all up up. Also take a look at the MD file that was brought over as an idea from another project. I think the other project also set a few things up in the folder emergency. At the top of the website we can also have a version number. Also I'm thinking. When a user is logged in. They have a area where they can contact me. I'm not sure how we can set that up yet, probably with e-mail JS. Is an idea. We can also do a 30 day trial. And I will also have to have an admin side. To manage users. And 30 day trials. We're also going to need. On the. Information page. About security of information. And we need to ensure that all this information is encrypted as much as we can. The trial is free, no credit card or personal information. And all features will be available. If they want to purchase, we can have a button. That will bring them to another page. Where we can set up information so they can EMT me the money. We can figure that part out when we get to it. I'm thinking probably $40.00 for the year.

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
