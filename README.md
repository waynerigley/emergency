# Emergency Info Platform

A personal emergency information system that allows users to create secure, shareable emergency contact pages accessible via QR code.

## Concept

In an emergency, first responders or bystanders can scan a QR code (on a wallet card, phone case, medical bracelet, etc.) to instantly access critical medical and contact information - no app download required.

## Origin

Originally built for Ty Rigley's personal website (tyrigley.com) as a simple emergency info page. This project expands that concept into a multi-user platform.

---

## Features

### Core Features (MVP)
- [ ] User registration/login (email + password)
- [ ] Create personal emergency profile
- [ ] Generate unique secret URL (not guessable)
- [ ] Generate printable QR code
- [ ] Mobile-friendly emergency page (no login required to view)

### Profile Information
- [ ] Photo
- [ ] Full name
- [ ] Date of birth / Age
- [ ] Blood type
- [ ] Allergies (with severity levels)
- [ ] Current medications (name, dosage, frequency)
- [ ] Medical conditions
- [ ] Emergency contacts (multiple, with relationships)
  - Name
  - Phone (click-to-call)
  - Email
  - Relationship
  - Priority order
- [ ] Primary physician
  - Name
  - Phone
  - Address
- [ ] Preferred hospital
- [ ] Insurance information (optional)
- [ ] Address / Location
- [ ] Special instructions (DNR, medical devices, etc.)

### Advanced Features
- [ ] Multiple profiles per account (manage family members)
- [ ] Profile sharing (caregiver access)
- [ ] QR code customization (colors, logo)
- [ ] Printable wallet card generator
- [ ] Medical bracelet QR code (small format)
- [ ] Emergency page themes (high contrast for accessibility)
- [ ] Offline access (PWA)
- [ ] Multi-language support
- [ ] Medication reminders (optional)
- [ ] Document uploads (insurance cards, medical records)
- [ ] Location sharing in emergencies

---

## Technical Architecture

### Frontend
- **Framework**: React or Next.js
- **Styling**: Tailwind CSS
- **QR Generation**: qrcode.js or similar
- **PDF Generation**: For printable cards

### Backend
- **Option 1**: Firebase (Auth + Firestore) - Quick to build
- **Option 2**: Node.js + PostgreSQL - More control
- **Option 3**: Supabase - Best of both worlds

### Hosting
- **Frontend**: Vercel, Netlify, or Proxmox
- **Database**: Firebase, Supabase, or self-hosted PostgreSQL

### Security Considerations
- Secret URLs should be 20+ characters (UUID v4)
- No sensitive data in URL parameters
- HTTPS required
- Optional: PIN protection for sensitive fields
- Rate limiting on page views
- Audit log for profile access

---

## Database Schema

### Users
```
users {
  id: uuid
  email: string
  password_hash: string
  created_at: timestamp
  updated_at: timestamp
}
```

### Profiles
```
profiles {
  id: uuid
  user_id: uuid (FK)
  secret_slug: string (unique, 24 chars)

  // Basic Info
  photo_url: string
  full_name: string
  date_of_birth: date
  blood_type: enum

  // Medical
  allergies: json[]
  medications: json[]
  conditions: json[]
  special_instructions: text

  // Location
  address: string
  city: string
  province_state: string
  postal_code: string
  country: string

  // Preferences
  preferred_hospital: string
  insurance_info: json

  created_at: timestamp
  updated_at: timestamp
}
```

### Emergency Contacts
```
emergency_contacts {
  id: uuid
  profile_id: uuid (FK)
  name: string
  relationship: string
  phone: string
  email: string
  priority: integer
  created_at: timestamp
}
```

### Physicians
```
physicians {
  id: uuid
  profile_id: uuid (FK)
  name: string
  specialty: string
  phone: string
  address: string
  is_primary: boolean
}
```

---

## URL Structure

- `/` - Landing page (marketing)
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User's profiles list
- `/profile/new` - Create new profile
- `/profile/:id/edit` - Edit profile
- `/profile/:id/qr` - View/download QR code
- `/e/:secretSlug` - Public emergency page (no auth)

---

## Emergency Page Design

The public emergency page (`/e/:secretSlug`) should be:

1. **Fast** - Minimal assets, inline CSS
2. **Mobile-first** - Works on any phone
3. **High contrast** - Easy to read in any lighting
4. **Click-to-call** - One tap to call contacts
5. **Offline capable** - Service worker caching
6. **No JavaScript required** - Core info visible without JS
7. **Print friendly** - Can be printed if needed

### Page Sections (in order)
1. Emergency banner
2. Photo + Name + Age
3. Blood Type (prominent)
4. Allergies (prominent if any exist)
5. Medical Conditions
6. Current Medications
7. Emergency Contacts (with call buttons)
8. Physician Info
9. Special Instructions
10. Last updated timestamp

---

## Monetization (Optional)

### Free Tier
- 1 profile
- Basic QR code
- Standard emergency page

### Premium ($3-5/month)
- Unlimited profiles (family plan)
- Custom QR codes
- Printable wallet cards
- Document storage
- Priority support

---

## Competitors / Inspiration

- ICE (In Case of Emergency) phone contacts
- Medical ID on iPhone/Android
- Road ID
- MedicAlert bracelets
- MyID apps

**Our differentiator**: No app required to VIEW - just scan and see. Simple, fast, works everywhere.

---

## Development Phases

### Phase 1: MVP (Week 1-2)
- User auth (Firebase)
- Single profile creation
- Emergency page generation
- QR code generation

### Phase 2: Enhancement (Week 3-4)
- Multiple profiles
- Wallet card PDF generator
- Better UI/UX
- Mobile optimization

### Phase 3: Polish (Week 5+)
- PWA / offline support
- Family sharing
- Analytics dashboard
- Premium features

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/waynerigley/emergency.git
cd emergency

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

---

## Tech Stack Recommendation

For quick development with your existing experience:

- **Frontend**: Next.js 14 (App Router)
- **Auth**: Firebase Auth
- **Database**: Firebase Firestore
- **Hosting**: Vercel (free tier) or Proxmox
- **QR Codes**: qrcode npm package
- **PDF Generation**: @react-pdf/renderer
- **Styling**: Tailwind CSS

This matches your tyrigley.com stack and will be fastest to build.

---

## Notes

- Original emergency page: `tyrigley.com/em-7f8a9b2c4d6e1f3a5b7c9d.html`
- Built with Claude Code + Claude Agents
- Server: Proxmox on local network

---

## License

MIT - Personal project by Wayne Rigley
