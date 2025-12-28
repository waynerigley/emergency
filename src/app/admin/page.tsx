"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, getDaysRemaining, isTrialActive } from "@/lib/mockData";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  trialEndsAt: string;
  isPaid: boolean;
  isAdmin: boolean;
  profileCount: number;
}

export default function Admin() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.isAdmin) {
        setCurrentUser(user);
        loadUsers();
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const handleViewUser = (user: AdminUser) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleGiveFreeAccount = async (userId: string) => {
    setActionLoading(userId);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          isPaid: true,
          trialEndsAt: '2099-12-31',
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'User granted free lifetime account!' });
        loadUsers();
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to update user' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to update user' });
    }
    setActionLoading(null);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      return;
    }

    setActionLoading(userId);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'User deleted successfully' });
        setShowUserModal(false);
        loadUsers();
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to delete user' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete user' });
    }
    setActionLoading(null);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleExportData = async () => {
    try {
      const response = await fetch('/api/admin/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rescuelink-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: 'Data exported successfully!' });
    } catch {
      setMessage({ type: 'error', text: 'Failed to export data' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSendEmail = () => {
    window.location.href = 'mailto:?subject=Rescue Link ID&body=Hello from Rescue Link ID';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  // Stats
  const totalUsers = users.length;
  const activeTrials = users.filter(u => !u.isPaid && isTrialActive(u.trialEndsAt)).length;
  const paidUsers = users.filter(u => u.isPaid).length;
  const totalProfiles = users.reduce((sum, u) => sum + (u.profileCount || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      <div className="container mx-auto px-4 py-8">
        {/* Message Toast */}
        {message && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white font-medium`}>
            {message.text}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-text-secondary mt-1">Manage users and subscriptions</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-card-bg hover:bg-input-bg border border-card-border font-medium py-2.5 px-4 rounded-xl transition-all hover:-translate-y-0.5 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-card-bg hover:bg-input-bg border border-card-border font-medium py-2.5 px-4 rounded-xl transition-all hover:-translate-y-0.5 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold">{totalUsers}</div>
                <div className="text-text-secondary text-sm">Total Users</div>
              </div>
            </div>
          </div>
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-blue-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold">{activeTrials}</div>
                <div className="text-text-secondary text-sm">Active Trials</div>
              </div>
            </div>
          </div>
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-green-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold">{paidUsers}</div>
                <div className="text-text-secondary text-sm">Paid Users</div>
              </div>
            </div>
          </div>
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-orange-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold">{totalProfiles}</div>
                <div className="text-text-secondary text-sm">Total Profiles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-card-bg rounded-2xl border border-card-border overflow-hidden mb-8">
          <div className="p-6 border-b border-card-border">
            <h2 className="text-xl font-bold">All Users</h2>
            <p className="text-text-secondary text-sm mt-1">Manage user accounts and subscriptions</p>
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
                {users.map((user) => {
                  const trialActive = isTrialActive(user.trialEndsAt);
                  const daysLeft = getDaysRemaining(user.trialEndsAt);

                  return (
                    <tr key={user.id} className="border-b border-card-border hover:bg-input-bg/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-text-secondary text-sm">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {user.isPaid ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-500 rounded-lg text-xs font-medium">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                              Paid
                            </span>
                          ) : trialActive ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-xs font-medium">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                              Trial
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 text-red-500 rounded-lg text-xs font-medium">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                              Expired
                            </span>
                          )}
                          {user.isAdmin && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 text-purple-500 rounded-lg text-xs font-medium">
                              Admin
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-text-secondary">{user.profileCount || 0}</span>
                      </td>
                      <td className="p-4">
                        {user.isPaid ? (
                          <span className="text-green-500 font-medium">Active</span>
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
                          <button
                            onClick={() => handleViewUser(user)}
                            className="p-2 hover:bg-input-bg rounded-lg transition-colors"
                            title="View Details"
                          >
                            <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          {!user.isPaid && !user.isAdmin && (
                            <button
                              onClick={() => handleGiveFreeAccount(user.id)}
                              disabled={actionLoading === user.id}
                              className="p-2 hover:bg-green-500/10 rounded-lg transition-colors text-green-500 disabled:opacity-50"
                              title="Give Free Account"
                            >
                              {actionLoading === user.id ? (
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
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
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <button
              onClick={handleSendEmail}
              className="bg-card-bg hover:bg-input-bg border border-card-border p-5 rounded-2xl text-left transition-all hover:-translate-y-1 hover:border-red-500/30"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Send Email</h3>
              <p className="text-text-secondary text-sm">Open email client to contact users</p>
            </button>
            <button
              onClick={handleExportData}
              className="bg-card-bg hover:bg-input-bg border border-card-border p-5 rounded-2xl text-left transition-all hover:-translate-y-1 hover:border-red-500/30"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Export Data</h3>
              <p className="text-text-secondary text-sm">Download all user and profile data</p>
            </button>
            <Link
              href="/info"
              className="bg-card-bg hover:bg-input-bg border border-card-border p-5 rounded-2xl text-left transition-all hover:-translate-y-1 hover:border-red-500/30"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">View Info Page</h3>
              <p className="text-text-secondary text-sm">See the public info page</p>
            </Link>
          </div>
        </div>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card-bg rounded-2xl border border-card-border max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-card-border flex justify-between items-center">
                <h3 className="text-xl font-bold">User Details</h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-input-bg rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xl font-bold">{selectedUser.name}</div>
                    <div className="text-text-secondary">{selectedUser.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-input-bg p-4 rounded-xl">
                    <div className="text-text-secondary text-sm">Status</div>
                    <div className="font-semibold">
                      {selectedUser.isPaid ? 'Paid' : isTrialActive(selectedUser.trialEndsAt) ? 'Trial' : 'Expired'}
                    </div>
                  </div>
                  <div className="bg-input-bg p-4 rounded-xl">
                    <div className="text-text-secondary text-sm">Profiles</div>
                    <div className="font-semibold">{selectedUser.profileCount || 0}</div>
                  </div>
                  <div className="bg-input-bg p-4 rounded-xl">
                    <div className="text-text-secondary text-sm">Joined</div>
                    <div className="font-semibold">{selectedUser.createdAt}</div>
                  </div>
                  <div className="bg-input-bg p-4 rounded-xl">
                    <div className="text-text-secondary text-sm">Trial Ends</div>
                    <div className="font-semibold">{selectedUser.trialEndsAt}</div>
                  </div>
                </div>

                {!selectedUser.isAdmin && (
                  <div className="flex gap-3 pt-4">
                    {!selectedUser.isPaid && (
                      <button
                        onClick={() => handleGiveFreeAccount(selectedUser.id)}
                        disabled={actionLoading === selectedUser.id}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white font-semibold py-3 px-4 rounded-xl transition-all"
                      >
                        {actionLoading === selectedUser.id ? 'Processing...' : 'Give Free Account'}
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(selectedUser.id)}
                      disabled={actionLoading === selectedUser.id}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-3 px-4 rounded-xl transition-all"
                    >
                      {actionLoading === selectedUser.id ? 'Processing...' : 'Delete User'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
