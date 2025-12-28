import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = '/var/www/rescuelink/data';
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Admin user with hashed password (created at build time)
const ADMIN_USER = {
  id: '1',
  email: 'admin@rescuelinkid.com',
  name: 'Admin User',
  passwordHash: '$2b$10$lugomaZ2vhvSJWxXrnbWWeKt4kMAiuUFiEaFkRo.2piLQttdh5g3C',
  createdAt: '2024-01-15',
  trialEndsAt: '2025-02-15',
  isPaid: true,
  isAdmin: true,
};

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

async function getUsers(): Promise<StoredUser[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check admin user first
    if (email === ADMIN_USER.email) {
      const isValid = await bcrypt.compare(password, ADMIN_USER.passwordHash);
      if (isValid) {
        const { passwordHash: _, ...userWithoutPassword } = ADMIN_USER;
        return NextResponse.json({ user: userWithoutPassword });
      }
    }

    // Check registered users
    const users = await getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (isValid) {
        const { passwordHash: _, ...userWithoutPassword } = user;
        // Grant admin if email is in admin list
        if (ADMIN_EMAILS.includes(email)) {
          userWithoutPassword.isAdmin = true;
        }
        return NextResponse.json({ user: userWithoutPassword });
      }
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
