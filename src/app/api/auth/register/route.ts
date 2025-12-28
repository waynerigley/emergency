import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = '/var/www/rescuelink/data';
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Admin emails that get admin access
const ADMIN_EMAILS = ['admin@rescuelinkid.com', 'waynerigley@gmail.com'];

interface StoredUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
  trialEndsAt: string;
  isPaid: boolean;
  isAdmin: boolean;
}

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory exists
  }
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
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const users = await getUsers();
    if (users.some(u => u.email === email) || email === 'admin@rescuelinkid.com') {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create trial end date (30 days from now)
    const trialEnd = new Date();
    trialEnd.setDate(trialEnd.getDate() + 30);

    const newUser: StoredUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      passwordHash,
      createdAt: new Date().toISOString().split('T')[0],
      trialEndsAt: trialEnd.toISOString().split('T')[0],
      isPaid: false,
      isAdmin: ADMIN_EMAILS.includes(email),
    };

    // Save to file
    users.push(newUser);
    await saveUsers(users);

    // Return user without password hash, with empty profiles array
    const { passwordHash: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({ user: { ...userWithoutPassword, profiles: [] } });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
