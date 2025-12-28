import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = '/var/www/rescuelink/data';
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  createdAt: string;
  trialEndsAt: string;
  isPaid: boolean;
  isAdmin: boolean;
}

async function getUsers(): Promise<StoredUser[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function getProfiles() {
  try {
    const data = await fs.readFile(PROFILES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// GET - Export all data (excluding password hashes)
export async function GET() {
  try {
    const users = await getUsers();
    const profiles = await getProfiles();

    // Remove password hashes from users
    const sanitizedUsers = users.map(u => {
      const { passwordHash: _, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });

    const exportData = {
      exportedAt: new Date().toISOString(),
      users: sanitizedUsers,
      profiles: profiles,
      stats: {
        totalUsers: users.length,
        totalProfiles: profiles.length,
        paidUsers: users.filter(u => u.isPaid).length,
        trialUsers: users.filter(u => !u.isPaid).length,
      }
    };

    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="rescuelink-backup-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });
  } catch (error) {
    console.error('Error exporting data:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
