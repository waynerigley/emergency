// Mock data for testing - will be replaced with Firebase data

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export interface Profile {
  id: string;
  slug: string;
  name: string;
  dateOfBirth: string;
  photo?: string;
  bloodType: string;
  allergies: string[];
  medicalConditions: string[];
  medications: Medication[];
  emergencyContacts: EmergencyContact[];
  address: string;
  specialInstructions?: string;
  physicianName?: string;
  physicianPhone?: string;
  hasEpiPen?: boolean;
  hasPacemaker?: boolean;
  // Communication
  isDeaf?: boolean;
  isNonVerbal?: boolean;
  isBlind?: boolean;
  usesSignLanguage?: boolean;
  lastUpdated: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  trialEndsAt: string;
  isPaid: boolean;
  isAdmin: boolean;
  profiles: Profile[];
}

// Test users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@rescuelinkid.com',
    name: 'Admin User',
    createdAt: '2024-01-15',
    trialEndsAt: '2025-02-15',
    isPaid: true,
    isAdmin: true,
    profiles: [
      {
        id: 'p1',
        slug: 'abc123def456ghi789jkl',
        name: 'Tyler Rigley',
        dateOfBirth: '2015-06-20',
        bloodType: 'O+',
        allergies: ['Peanuts', 'Penicillin'],
        medicalConditions: ['Asthma'],
        medications: [
          { id: 'm1', name: 'Albuterol', dosage: '90mcg', frequency: 'As needed' }
        ],
        emergencyContacts: [
          { id: 'c1', name: 'Wayne Rigley', relationship: 'Father', phone: '555-123-4567', isPrimary: true },
          { id: 'c2', name: 'Sarah Rigley', relationship: 'Mother', phone: '555-234-5678', isPrimary: false }
        ],
        address: '123 Main Street, Anytown, USA 12345',
        specialInstructions: 'Has an inhaler in backpack at all times.',
        physicianName: 'Dr. Smith',
        physicianPhone: '555-345-6789',
        lastUpdated: '2024-12-20'
      },
      {
        id: 'p3',
        slug: 'mno456pqr789stu012vwx',
        name: 'Emma Rigley',
        dateOfBirth: '2018-03-15',
        bloodType: 'A+',
        allergies: ['Dairy'],
        medicalConditions: [],
        medications: [],
        emergencyContacts: [
          { id: 'c4', name: 'Wayne Rigley', relationship: 'Father', phone: '555-123-4567', isPrimary: true },
          { id: 'c5', name: 'Sarah Rigley', relationship: 'Mother', phone: '555-234-5678', isPrimary: false }
        ],
        address: '123 Main Street, Anytown, USA 12345',
        specialInstructions: 'Lactose intolerant - no dairy products.',
        physicianName: 'Dr. Smith',
        physicianPhone: '555-345-6789',
        lastUpdated: '2024-12-20'
      },
      {
        id: 'p4',
        slug: 'ghi789jkl012mno345pqr',
        name: 'Robert Rigley',
        dateOfBirth: '1952-11-08',
        bloodType: 'O+',
        allergies: ['Aspirin'],
        medicalConditions: ['Type 2 Diabetes', 'High Blood Pressure'],
        medications: [
          { id: 'm3', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
          { id: 'm4', name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
        ],
        emergencyContacts: [
          { id: 'c6', name: 'Wayne Rigley', relationship: 'Son', phone: '555-123-4567', isPrimary: true },
          { id: 'c7', name: 'Margaret Rigley', relationship: 'Wife', phone: '555-456-7890', isPrimary: false }
        ],
        address: '456 Oak Lane, Anytown, USA 12345',
        specialInstructions: 'May become confused if blood sugar is low. Carries glucose tablets.',
        physicianName: 'Dr. Johnson',
        physicianPhone: '555-567-8901',
        hasPacemaker: true,
        lastUpdated: '2024-12-20'
      },
      {
        id: 'p5',
        slug: 'stu012vwx345yza678bcd',
        name: 'Margaret Rigley',
        dateOfBirth: '1955-04-22',
        bloodType: 'B+',
        allergies: [],
        medicalConditions: ['Arthritis', 'Mild Dementia'],
        medications: [
          { id: 'm5', name: 'Donepezil', dosage: '10mg', frequency: 'Once daily at bedtime' },
          { id: 'm6', name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed for pain' }
        ],
        emergencyContacts: [
          { id: 'c8', name: 'Wayne Rigley', relationship: 'Son', phone: '555-123-4567', isPrimary: true },
          { id: 'c9', name: 'Robert Rigley', relationship: 'Husband', phone: '555-456-7890', isPrimary: false }
        ],
        address: '456 Oak Lane, Anytown, USA 12345',
        specialInstructions: 'May not remember her address. Please call son Wayne immediately.',
        physicianName: 'Dr. Johnson',
        physicianPhone: '555-567-8901',
        lastUpdated: '2024-12-20'
      }
    ]
  }
];

// Helper function to get all users (including from localStorage)
export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return mockUsers;

  const storedUsers = localStorage.getItem('registeredUsers');
  if (storedUsers) {
    const registered = JSON.parse(storedUsers) as User[];
    return [...mockUsers, ...registered];
  }
  return mockUsers;
}

// Helper function to find profile by slug
export function getProfileBySlug(slug: string): Profile | null {
  // Check mock users first
  for (const user of mockUsers) {
    const profile = user.profiles.find(p => p.slug === slug);
    if (profile) return profile;
  }

  // Check registered users in localStorage
  if (typeof window !== 'undefined') {
    const storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
      const users = JSON.parse(storedUsers) as User[];
      for (const user of users) {
        const profile = user.profiles.find(p => p.slug === slug);
        if (profile) return profile;
      }
    }
  }

  return null;
}

// Helper function to calculate age from date of birth
export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Helper function to check if trial is active
export function isTrialActive(trialEndsAt: string): boolean {
  return new Date(trialEndsAt) > new Date();
}

// Helper function to get days remaining in trial
export function getDaysRemaining(trialEndsAt: string): number {
  const end = new Date(trialEndsAt);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// Generate a random slug for profile URLs
function generateSlug(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let slug = '';
  for (let i = 0; i < 24; i++) {
    slug += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return slug;
}

// Save profile to server API
async function saveProfileToServer(profile: Profile & { userId: string }): Promise<void> {
  try {
    await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
  } catch (error) {
    console.error('Failed to save profile to server:', error);
  }
}

// Add a new profile for a user
export function addProfile(userId: string, profileData: Omit<Profile, 'id' | 'slug' | 'lastUpdated'>): Profile | null {
  if (typeof window === 'undefined') return null;

  const newProfile: Profile = {
    ...profileData,
    id: `profile_${Date.now()}`,
    slug: generateSlug(),
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  // Update current user in localStorage
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const user = JSON.parse(currentUser) as User;
    if (user.id === userId) {
      user.profiles.push(newProfile);
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  // Also update registered users if applicable
  const storedUsers = localStorage.getItem('registeredUsers');
  if (storedUsers) {
    const users = JSON.parse(storedUsers);
    const userIndex = users.findIndex((u: User) => u.id === userId);
    if (userIndex !== -1) {
      users[userIndex].profiles.push(newProfile);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
    }
  }

  // Save to server for QR code access
  saveProfileToServer({ ...newProfile, userId });

  return newProfile;
}

// Update an existing profile
export function updateProfile(userId: string, profileId: string, profileData: Partial<Profile>): Profile | null {
  if (typeof window === 'undefined') return null;

  let updatedProfile: Profile | null = null;

  // Update current user in localStorage
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    const user = JSON.parse(currentUser) as User;
    if (user.id === userId) {
      const profileIndex = user.profiles.findIndex(p => p.id === profileId);
      if (profileIndex !== -1) {
        user.profiles[profileIndex] = {
          ...user.profiles[profileIndex],
          ...profileData,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        updatedProfile = user.profiles[profileIndex];
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    }
  }

  // Also update registered users if applicable
  const storedUsers = localStorage.getItem('registeredUsers');
  if (storedUsers) {
    const users = JSON.parse(storedUsers);
    const userIndex = users.findIndex((u: User) => u.id === userId);
    if (userIndex !== -1) {
      const profileIndex = users[userIndex].profiles.findIndex((p: Profile) => p.id === profileId);
      if (profileIndex !== -1) {
        users[userIndex].profiles[profileIndex] = {
          ...users[userIndex].profiles[profileIndex],
          ...profileData,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        updatedProfile = users[userIndex].profiles[profileIndex];
        localStorage.setItem('registeredUsers', JSON.stringify(users));
      }
    }
  }

  // Save to server for QR code access
  if (updatedProfile) {
    saveProfileToServer({ ...updatedProfile, userId });
  }

  return updatedProfile;
}
