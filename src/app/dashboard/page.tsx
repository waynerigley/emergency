"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { User, Profile, getDaysRemaining, isTrialActive } from "@/lib/mockData";
import { QRCodeSVG } from "qrcode.react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

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

  const getProfileUrl = (profile: Profile) => {
    return `https://rescuelinkid.com/e/${profile.slug}`;
  };

  const handleShareLink = (profile: Profile) => {
    const url = getProfileUrl(profile);
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleShowQR = (profile: Profile) => {
    setSelectedProfile(profile);
    setShowQRModal(true);
  };

  const handleDownloadQR = () => {
    if (!qrRef.current || !selectedProfile) return;

    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 400, 400);

        const link = document.createElement('a');
        link.download = `rescue-link-qr-${selectedProfile.name.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrintWalletCard = (profile: Profile) => {
    const url = getProfileUrl(profile);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rescue Link ID - ${profile.name}</title>
        <style>
          @page { margin: 0.5in; }
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .card {
            border: 2px solid #dc2626;
            border-radius: 16px;
            padding: 20px;
            max-width: 400px;
            margin: 0 auto;
            page-break-inside: avoid;
          }
          .header {
            background: linear-gradient(135deg, #dc2626, #ea580c);
            color: white;
            padding: 15px;
            border-radius: 12px 12px 0 0;
            margin: -20px -20px 20px -20px;
            text-align: center;
          }
          .header h1 { margin: 0; font-size: 18px; }
          .header p { margin: 5px 0 0; font-size: 12px; opacity: 0.9; }
          .name { font-size: 24px; font-weight: bold; margin-bottom: 10px; text-align: center; }
          .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .label { color: #666; font-size: 12px; }
          .value { font-weight: 600; font-size: 14px; }
          .qr-section { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 2px dashed #ddd; }
          .qr-code { margin: 10px auto; }
          .scan-text { font-size: 11px; color: #666; margin-top: 10px; }
          .url { font-size: 10px; color: #999; word-break: break-all; }
          .emergency { color: #dc2626; font-weight: bold; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>RESCUE LINK ID</h1>
            <p>Emergency Medical Information</p>
          </div>
          <div class="name">${profile.name}</div>
          <div class="info-row">
            <span class="label">Blood Type</span>
            <span class="value emergency">${profile.bloodType}</span>
          </div>
          ${profile.allergies.length > 0 ? `
          <div class="info-row">
            <span class="label">Allergies</span>
            <span class="value emergency">${profile.allergies.join(', ')}</span>
          </div>
          ` : ''}
          ${profile.medicalConditions.length > 0 ? `
          <div class="info-row">
            <span class="label">Conditions</span>
            <span class="value">${profile.medicalConditions.join(', ')}</span>
          </div>
          ` : ''}
          ${profile.emergencyContacts.length > 0 ? `
          <div class="info-row">
            <span class="label">Emergency Contact</span>
            <span class="value">${profile.emergencyContacts[0].name}: ${profile.emergencyContacts[0].phone}</span>
          </div>
          ` : ''}
          <div class="qr-section">
            <div class="qr-code">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}" alt="QR Code" width="150" height="150">
            </div>
            <div class="scan-text">Scan for complete emergency information</div>
            <div class="url">${url}</div>
          </div>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    printWindow.document.close();
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
            <p className="text-text-secondary mt-1">Welcome back, {user.name}</p>
          </div>
          <div className="flex gap-3">
            {user.isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 bg-card-bg hover:bg-input-bg border border-card-border font-medium py-2.5 px-4 rounded-xl transition-all hover:-translate-y-0.5 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin Panel
              </Link>
            )}
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

        {/* Trial/Subscription Status */}
        {!user.isPaid && (
          <div className={`mb-8 p-5 rounded-2xl border ${trialActive ? 'bg-blue-500/10 border-blue-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${trialActive ? 'bg-blue-500/20' : 'bg-red-500/20'}`}>
                  {trialActive ? (
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
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
              </div>
              <Link
                href="/payment"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 text-sm"
              >
                Upgrade - $40/year
              </Link>
            </div>
          </div>
        )}

        {/* Profiles Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Your Profiles</h2>
              <p className="text-text-secondary text-sm mt-1">Manage emergency profiles for you and your family</p>
            </div>
            <Link
              href="/profile/new"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Profile
            </Link>
          </div>

          {user.profiles.length === 0 ? (
            <div className="bg-card-bg rounded-2xl border border-card-border p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No profiles yet</h3>
              <p className="text-text-secondary mb-6 max-w-sm mx-auto">Create your first emergency profile to get started protecting yourself and your loved ones</p>
              <Link
                href="/profile/new"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Profile
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.profiles.map((profile) => (
                <div key={profile.id} className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-500/25">
                        {profile.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{profile.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-500 text-xs font-medium px-2 py-1 rounded-lg">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>
                            {profile.bloodType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5 text-sm">
                    {profile.allergies.length > 0 && (
                      <div className="flex items-center gap-2 text-text-secondary">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{profile.allergies.length} allergies listed</span>
                      </div>
                    )}
                    {profile.medications.length > 0 && (
                      <div className="flex items-center gap-2 text-text-secondary">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                        <span>{profile.medications.length} medications</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-text-secondary">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <span>{profile.emergencyContacts.length} emergency contacts</span>
                    </div>
                  </div>

                  {/* QR Code Preview */}
                  <div
                    className="bg-white p-4 rounded-xl mb-5 flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => handleShowQR(profile)}
                  >
                    <QRCodeSVG
                      value={getProfileUrl(profile)}
                      size={96}
                      level="M"
                    />
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => handleShareLink(profile)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 text-xs font-medium py-2 px-3 rounded-lg transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </button>
                    <button
                      onClick={() => handleShowQR(profile)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 text-xs font-medium py-2 px-3 rounded-lg transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      QR
                    </button>
                    <button
                      onClick={() => handlePrintWalletCard(profile)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 text-xs font-medium py-2 px-3 rounded-lg transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/e/${profile.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-card-bg hover:bg-input-bg border border-card-border font-medium py-2.5 px-4 rounded-xl transition-all text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </Link>
                    <Link
                      href={`/profile/${profile.id}/edit`}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-xl transition-all text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                  </div>

                  <p className="text-text-tertiary text-xs mt-4 text-center">
                    Last updated: {profile.lastUpdated}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => user.profiles.length > 0 && handlePrintWalletCard(user.profiles[0])}
              disabled={user.profiles.length === 0}
              className="bg-card-bg hover:bg-input-bg border border-card-border p-5 rounded-2xl text-left transition-all hover:-translate-y-1 hover:border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Print Wallet Card</h3>
              <p className="text-text-secondary text-sm">Download a printable PDF</p>
            </button>
            <button
              onClick={() => user.profiles.length > 0 && handleShowQR(user.profiles[0])}
              disabled={user.profiles.length === 0}
              className="bg-card-bg hover:bg-input-bg border border-card-border p-5 rounded-2xl text-left transition-all hover:-translate-y-1 hover:border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Download QR Code</h3>
              <p className="text-text-secondary text-sm">High-res for printing</p>
            </button>
            <button
              onClick={() => user.profiles.length > 0 && handleShareLink(user.profiles[0])}
              disabled={user.profiles.length === 0}
              className="bg-card-bg hover:bg-input-bg border border-card-border p-5 rounded-2xl text-left transition-all hover:-translate-y-1 hover:border-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Share Link</h3>
              <p className="text-text-secondary text-sm">Copy emergency page URL</p>
            </button>
            <Link href="/info" className="bg-card-bg hover:bg-input-bg border border-card-border p-5 rounded-2xl text-left transition-all hover:-translate-y-1 hover:border-red-500/30">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Help & FAQ</h3>
              <p className="text-text-secondary text-sm">Learn more about features</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Copy Success Toast */}
      {copySuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in z-50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Link copied to clipboard!
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && selectedProfile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowQRModal(false)}>
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">QR Code</h3>
              <button onClick={() => setShowQRModal(false)} className="p-2 hover:bg-input-bg rounded-xl transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-text-secondary text-sm mb-4 text-center">{selectedProfile.name}</p>
            <div className="bg-white p-6 rounded-xl flex items-center justify-center mb-4" ref={qrRef}>
              <QRCodeSVG
                value={getProfileUrl(selectedProfile)}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="space-y-3">
              <button
                onClick={handleDownloadQR}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download QR Code
              </button>
              <button
                onClick={() => {
                  handleShareLink(selectedProfile);
                  setShowQRModal(false);
                }}
                className="w-full bg-card-bg hover:bg-input-bg border border-card-border font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Link
              </button>
            </div>
            <p className="text-text-tertiary text-xs mt-4 text-center break-all">
              {getProfileUrl(selectedProfile)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
