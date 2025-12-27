"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, mockUsers, getDaysRemaining, isTrialActive } from "@/lib/mockData";

export default function Admin() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.isAdmin) {
        setCurrentUser(user);
      } else {
        router.push('/dashboard');
      }
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

  if (!currentUser) return null;

  // Stats
  const totalUsers = mockUsers.length;
  const activeTrials = mockUsers.filter(u => !u.isPaid && isTrialActive(u.trialEndsAt)).length;
  const paidUsers = mockUsers.filter(u => u.isPaid).length;
  const totalProfiles = mockUsers.reduce((sum, u) => sum + u.profiles.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-text-secondary">Manage users and subscriptions</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="bg-card-bg hover:bg-input-bg border border-card-border font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-card-bg hover:bg-input-bg border border-card-border font-medium py-2 px-4 rounded-lg transition-colors text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card-bg rounded-xl border border-card-border p-6">
            <div className="text-3xl font-bold text-red-500">{totalUsers}</div>
            <div className="text-text-secondary">Total Users</div>
          </div>
          <div className="bg-card-bg rounded-xl border border-card-border p-6">
            <div className="text-3xl font-bold text-blue-500">{activeTrials}</div>
            <div className="text-text-secondary">Active Trials</div>
          </div>
          <div className="bg-card-bg rounded-xl border border-card-border p-6">
            <div className="text-3xl font-bold text-green-500">{paidUsers}</div>
            <div className="text-text-secondary">Paid Users</div>
          </div>
          <div className="bg-card-bg rounded-xl border border-card-border p-6">
            <div className="text-3xl font-bold text-orange-500">{totalProfiles}</div>
            <div className="text-text-secondary">Total Profiles</div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-card-bg rounded-xl border border-card-border overflow-hidden">
          <div className="p-6 border-b border-card-border">
            <h2 className="text-xl font-bold">All Users</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-card-border bg-input-bg">
                  <th className="text-left p-4 font-semibold text-sm">User</th>
                  <th className="text-left p-4 font-semibold text-sm">Status</th>
                  <th className="text-left p-4 font-semibold text-sm">Profiles</th>
                  <th className="text-left p-4 font-semibold text-sm">Trial/Sub</th>
                  <th className="text-left p-4 font-semibold text-sm">Joined</th>
                  <th className="text-left p-4 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => {
                  const trialActive = isTrialActive(user.trialEndsAt);
                  const daysLeft = getDaysRemaining(user.trialEndsAt);

                  return (
                    <tr key={user.id} className="border-b border-card-border hover:bg-input-bg/50">
                      <td className="p-4">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-text-secondary text-sm">{user.email}</div>
                      </td>
                      <td className="p-4">
                        {user.isPaid ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            Paid
                          </span>
                        ) : trialActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            Trial
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/10 text-red-500 rounded-full text-xs font-medium">
                            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                            Expired
                          </span>
                        )}
                        {user.isAdmin && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium ml-1">
                            Admin
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="text-text-secondary">{user.profiles.length}</span>
                      </td>
                      <td className="p-4">
                        {user.isPaid ? (
                          <span className="text-green-500">Active</span>
                        ) : trialActive ? (
                          <span className="text-blue-500">{daysLeft} days left</span>
                        ) : (
                          <span className="text-red-500">Expired</span>
                        )}
                      </td>
                      <td className="p-4 text-text-secondary text-sm">
                        {user.createdAt}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="text-text-secondary hover:text-foreground text-sm">
                            View
                          </button>
                          <button className="text-text-secondary hover:text-foreground text-sm">
                            Edit
                          </button>
                          {!user.isPaid && (
                            <button className="text-green-500 hover:text-green-400 text-sm">
                              Mark Paid
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <button className="bg-card-bg hover:bg-input-bg border border-card-border p-4 rounded-xl text-left transition-colors">
            <div className="text-2xl mb-2">📧</div>
            <h3 className="font-semibold">Send Email</h3>
            <p className="text-text-secondary text-sm">Contact users or send announcements</p>
          </button>
          <button className="bg-card-bg hover:bg-input-bg border border-card-border p-4 rounded-xl text-left transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="font-semibold">Export Data</h3>
            <p className="text-text-secondary text-sm">Download user and subscription data</p>
          </button>
          <button className="bg-card-bg hover:bg-input-bg border border-card-border p-4 rounded-xl text-left transition-colors">
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="font-semibold">Settings</h3>
            <p className="text-text-secondary text-sm">Configure platform settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}
