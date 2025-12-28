import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = '/var/www/rescuelink/data';
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PROFILES_FILE = path.join(DATA_DIR, 'profiles.json');

// Admin user (no password hash exposed)
const ADMIN_USER = {
  id: '1',
  email: 'admin@rescuelinkid.com',
  name: 'Admin User',
  createdAt: '2024-01-15',
  trialEndsAt: '2099-12-31',
  isPaid: true,
  isAdmin: true,
};

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

interface StoredProfile {
  userId: string;
  id: string;
  slug: string;
  name: string;
  [key: string]: unknown;
}

async function getUsers(): Promise<StoredUser[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveUsers(users: StoredUser[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function getProfiles(): Promise<StoredProfile[]> {
  try {
    const data = await fs.readFile(PROFILES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// GET - Get all users with profile counts
export async function GET() {
  try {
    const users = await getUsers();
    const profiles = await getProfiles();

    // Build user list with profile counts (exclude password hashes)
    const allUsers = [
      {
        ...ADMIN_USER,
        profileCount: profiles.filter(p => p.userId === ADMIN_USER.id).length,
      },
      ...users.map(u => {
        const { passwordHash: _, ...userWithoutPassword } = u;
        return {
          ...userWithoutPassword,
          profileCount: profiles.filter(p => p.userId === u.id).length,
        };
      }),
    ];

    return NextResponse.json({ users: allUsers });
  } catch (error) {
    console.error('Error getting users:', error);
    return NextResponse.json(
      { error: 'Failed to get users' },
      { status: 500 }
    );
  }
}

// PUT - Update a user (give free account, etc.)
export async function PUT(request: NextRequest) {
  try {
    const { userId, isPaid, trialEndsAt } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Can't modify admin user
    if (userId === '1') {
      return NextResponse.json(
        { error: 'Cannot modify admin user' },
        { status: 403 }
      );
    }

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user fields
    if (isPaid !== undefined) {
      users[userIndex].isPaid = isPaid;
    }
    if (trialEndsAt !== undefined) {
      users[userIndex].trialEndsAt = trialEndsAt;
    }

    await saveUsers(users);

    const { passwordHash: _, ...userWithoutPassword } = users[userIndex];
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a user
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Can't delete admin user
    if (userId === '1') {
      return NextResponse.json(
        { error: 'Cannot delete admin user' },
        { status: 403 }
      );
    }

    const users = await getUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove user
    users.splice(userIndex, 1);
    await saveUsers(users);

    // Also remove user's profiles
    const profiles = await getProfiles();
    const remainingProfiles = profiles.filter(p => p.userId !== userId);
    await fs.writeFile(PROFILES_FILE, JSON.stringify(remainingProfiles, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
