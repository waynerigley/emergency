"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, getDaysRemaining, isTrialActive, mockUsers } from "@/lib/mockData";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const trialActive = isTrialActive(user.trialEndsAt);
  const daysRemaining = getDaysRemaining(user.trialEndsAt);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-text-secondary">Welcome back, {user.name}</p>
          </div>
          <div className="flex gap-3">
            {user.isAdmin && (
              <Link
                href="/admin"
                className="bg-card-bg hover:bg-input-bg border border-card-border font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-card-bg hover:bg-input-bg border border-card-border font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Trial/Subscription Status */}
        {!user.isPaid && (
          <div className={`mb-8 p-4 rounded-xl border ${trialActive ? 'bg-blue-500/10 border-blue-500/50' : 'bg-red-500/10 border-red-500/50'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                {trialActive ? (
                  <>
                    <p className="font-semibold text-blue-400">Free Trial Active</p>
                    <p className="text-text-secondary text-sm">{daysRemaining} days remaining</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-red-400">Trial Expired</p>
                    <p className="text-text-secondary text-sm">Upgrade to continue using Rescue Link ID</p>
                  </>
                )}
              </div>
              <Link
                href="/payment"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm"
              >
                Upgrade - $40/year
              </Link>
            </div>
          </div>
        )}

        {/* Profiles Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Profiles</h2>
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              + Add Profile
            </button>
          </div>

          {user.profiles.length === 0 ? (
            <div className="bg-card-bg rounded-xl border border-card-border p-12 text-center">
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-xl font-semibold mb-2">No profiles yet</h3>
              <p className="text-text-secondary mb-6">Create your first emergency profile to get started</p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Create Profile
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.profiles.map((profile) => (
                <div key={profile.id} className="bg-card-bg rounded-xl border border-card-border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {profile.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{profile.name}</h3>
                        <p className="text-text-secondary text-sm">Blood Type: {profile.bloodType}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    {profile.allergies.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-red-400">⚠️</span>
                        <span className="text-text-secondary">{profile.allergies.length} allergies listed</span>
                      </div>
                    )}
                    {profile.medications.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span>💊</span>
                        <span className="text-text-secondary">{profile.medications.length} medications</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span>📞</span>
                      <span className="text-text-secondary">{profile.emergencyContacts.length} emergency contacts</span>
                    </div>
                  </div>

                  {/* QR Code Preview */}
                  <div className="bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                      QR Code
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/e/${profile.slug}`}
                      className="flex-1 bg-card-bg hover:bg-input-bg border border-card-border text-center font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      View Page
                    </Link>
                    <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                      Edit
                    </button>
                  </div>

                  <p className="text-text-tertiary text-xs mt-3 text-center">
                    Last updated: {profile.lastUpdated}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-card-bg hover:bg-input-bg border border-card-border p-4 rounded-xl text-left transition-colors">
            <div className="text-2xl mb-2">🖨️</div>
            <h3 className="font-semibold">Print Wallet Card</h3>
            <p className="text-text-secondary text-sm">Download a printable PDF</p>
          </button>
          <button className="bg-card-bg hover:bg-input-bg border border-card-border p-4 rounded-xl text-left transition-colors">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold">Download QR Code</h3>
            <p className="text-text-secondary text-sm">High-res for printing</p>
          </button>
          <button className="bg-card-bg hover:bg-input-bg border border-card-border p-4 rounded-xl text-left transition-colors">
            <div className="text-2xl mb-2">🔗</div>
            <h3 className="font-semibold">Share Link</h3>
            <p className="text-text-secondary text-sm">Copy emergency page URL</p>
          </button>
          <Link href="/info" className="bg-card-bg hover:bg-input-bg border border-card-border p-4 rounded-xl text-left transition-colors">
            <div className="text-2xl mb-2">❓</div>
            <h3 className="font-semibold">Help & FAQ</h3>
            <p className="text-text-secondary text-sm">Learn more about features</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
