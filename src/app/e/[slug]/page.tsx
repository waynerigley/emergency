"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Profile, getProfileBySlug, calculateAge } from "@/lib/mockData";

// Helper to generate maps URL
function getMapsUrl(address: string): string {
  const encoded = encodeURIComponent(address);
  return `https://maps.google.com/maps?daddr=${encoded}`;
}

// Fetch profile from server API
async function fetchProfileFromServer(slug: string): Promise<Profile | null> {
  try {
    const response = await fetch(`/api/profiles?slug=${encodeURIComponent(slug)}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch {
    return null;
  }
}

export default function EmergencyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!slug) return;

      // First try localStorage (for the profile owner)
      const localProfile = getProfileBySlug(slug);
      if (localProfile) {
        setProfile(localProfile);
        setLoading(false);
        return;
      }

      // Then try server API (for QR code scanners)
      const serverProfile = await fetchProfileFromServer(slug);
      if (serverProfile) {
        setProfile(serverProfile);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }

    loadProfile();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg text-slate-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (notFound || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Profile Not Found</h1>
          <p className="text-slate-600">This emergency profile doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const age = calculateAge(profile.dateOfBirth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-md mx-auto">
        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-4 px-4 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-sm uppercase tracking-wider">Emergency Information</span>
          </div>
        </div>

        {/* Profile Header */}
        <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white pt-8 pb-12 px-6">
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:30px_30px]"></div>
          <div className="relative text-center">
            {profile.photo ? (
              <div className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white/20 shadow-xl overflow-hidden">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-28 h-28 bg-gradient-to-br from-white/20 to-white/5 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl font-light border-4 border-white/20 shadow-xl backdrop-blur">
                {profile.name.charAt(0)}
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
            <p className="text-slate-400 mt-1 text-lg">{age} years old</p>
          </div>
        </div>

        {/* Blood Type Badge */}
        <div className="flex justify-center -mt-6 relative z-10">
          <div className="bg-white border-4 border-red-500 rounded-2xl px-8 py-4 shadow-xl">
            <div className="text-xs text-slate-500 uppercase tracking-wide text-center mb-1">Blood Type</div>
            <span className="text-red-600 text-3xl font-black">{profile.bloodType}</span>
          </div>
        </div>

        {/* Critical Alerts - EpiPen & Pacemaker */}
        {(profile.hasEpiPen || profile.hasPacemaker) && (
          <div className="px-4 pt-6">
            <div className="flex gap-3 justify-center">
              {profile.hasEpiPen && (
                <div className="bg-orange-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                  </svg>
                  HAS EPIPEN
                </div>
              )}
              {profile.hasPacemaker && (
                <div className="bg-purple-600 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  HAS PACEMAKER
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-4 pt-8 pb-8 space-y-4">
          {/* Allergies */}
          {profile.allergies.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-red-800 uppercase tracking-wide">Allergies</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.allergies.map((allergy, idx) => (
                  <span key={idx} className="bg-red-600 text-white font-bold px-4 py-2 rounded-xl text-base shadow-sm">
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Medical Conditions */}
          {profile.medicalConditions.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-amber-800 uppercase tracking-wide">Medical Conditions</h2>
              </div>
              <ul className="space-y-2">
                {profile.medicalConditions.map((condition, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium bg-white rounded-xl px-4 py-3 shadow-sm">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medications */}
          {profile.medications.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-blue-800 uppercase tracking-wide">Current Medications</h2>
              </div>
              <div className="space-y-2">
                {profile.medications.map((med) => (
                  <div key={med.id} className="bg-white rounded-xl px-4 py-3 shadow-sm border border-blue-100">
                    <div className="font-semibold text-slate-800">{med.name}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{med.dosage} • {med.frequency}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {profile.specialInstructions && (
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-violet-800 uppercase tracking-wide">Special Instructions</h2>
              </div>
              <p className="text-slate-700 leading-relaxed">{profile.specialInstructions}</p>
            </div>
          )}

          {/* Emergency Contacts */}
          {profile.emergencyContacts.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Emergency Contacts</h2>
              </div>
              <div className="space-y-3">
                {profile.emergencyContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        contact.relationship.toLowerCase().includes('father') ? 'bg-blue-500' :
                        contact.relationship.toLowerCase().includes('mother') ? 'bg-pink-500' :
                        contact.relationship.toLowerCase().includes('spouse') || contact.relationship.toLowerCase().includes('wife') || contact.relationship.toLowerCase().includes('husband') ? 'bg-purple-500' :
                        'bg-slate-500'
                      }`}>
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{contact.name}</div>
                        <div className="text-sm text-slate-500">{contact.relationship}</div>
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold px-5 py-3 rounded-xl transition-colors shadow-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Call
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Physician */}
          {profile.physicianName && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Physician</h2>
              </div>
              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
                    Dr
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{profile.physicianName}</div>
                    <div className="text-sm text-slate-500">Primary Care Physician</div>
                  </div>
                </div>
                {profile.physicianPhone && (
                  <a
                    href={`tel:${profile.physicianPhone}`}
                    className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold px-5 py-3 rounded-xl transition-colors shadow-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Address */}
          {profile.address && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Home Address</h2>
              </div>
              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                <p className="text-slate-700 flex-1 pr-4">{profile.address}</p>
                <a
                  href={getMapsUrl(profile.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-5 py-3 rounded-xl transition-colors shadow-sm flex items-center gap-2 shrink-0"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Directions
                </a>
              </div>
            </div>
          )}

          {/* Last Updated */}
          <div className="text-center text-slate-400 text-sm pt-6 pb-2">
            Last updated: {profile.lastUpdated}
          </div>

          {/* Footer */}
          <div className="text-center pb-4">
            <div className="inline-flex items-center gap-2 text-slate-400 text-xs">
              <span>🔗</span>
              <span>Powered by Rescue Link ID</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
