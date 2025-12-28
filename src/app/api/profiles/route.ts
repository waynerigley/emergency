import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = process.env.DATA_DIR || '/var/www/rescuelink/data';
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

interface Profile {
  id: string;
  slug: string;
  name: string;
  dateOfBirth: string;
  photo?: string;
  bloodType: string;
  allergies: string[];
  medicalConditions: string[];
  medications: Array<{
    id: string;
    name: string;
    dosage: string;
    frequency: string;
  }>;
  emergencyContacts: Array<{
    id: string;
    name: string;
    relationship: string;
    phone: string;
    isPrimary: boolean;
  }>;
  address: string;
  specialInstructions?: string;
  physicianName?: string;
  physicianPhone?: string;
  hasEpiPen?: boolean;
  hasPacemaker?: boolean;
  lastUpdated: string;
  userId: string;
}

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readProfiles(): Promise<Profile[]> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(PROFILES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeProfiles(profiles: Profile[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(PROFILES_FILE, JSON.stringify(profiles, null, 2));
}

// GET - retrieve all profiles or a specific one by slug
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  const profiles = await readProfiles();

  if (slug) {
    const profile = profiles.find(p => p.slug === slug);
    if (profile) {
      return NextResponse.json(profile);
    }
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }

  return NextResponse.json(profiles);
}

// POST - create a new profile
export async function POST(request: NextRequest) {
  try {
    const profile: Profile = await request.json();

    if (!profile.slug || !profile.name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const profiles = await readProfiles();

    // Check if slug already exists
    const existingIndex = profiles.findIndex(p => p.slug === profile.slug);
    if (existingIndex >= 0) {
      // Update existing profile
      profiles[existingIndex] = profile;
    } else {
      // Add new profile
      profiles.push(profile);
    }

    await writeProfiles(profiles);

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error('Error saving profile:', error);
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 });
  }
}

// PUT - update an existing profile
export async function PUT(request: NextRequest) {
  try {
    const profile: Profile = await request.json();

    if (!profile.slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const profiles = await readProfiles();
    const existingIndex = profiles.findIndex(p => p.slug === profile.slug);

    if (existingIndex < 0) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    profiles[existingIndex] = { ...profiles[existingIndex], ...profile };
    await writeProfiles(profiles);

    return NextResponse.json(profiles[existingIndex]);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
