import { getProfileBySlug, calculateAge } from "@/lib/mockData";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EmergencyPage({ params }: PageProps) {
  const { slug } = await params;
  const profile = getProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  const age = calculateAge(profile.dateOfBirth);

  return (
    <div className="min-h-screen bg-white">
      {/* This page always uses light theme for emergency visibility */}
      <style>{`
        .emergency-page {
          --background: #ffffff;
          --foreground: #1e293b;
        }
      `}</style>

      <div className="max-w-lg mx-auto pb-8">
        {/* Emergency Banner */}
        <div className="bg-red-600 text-white text-center py-3 px-4">
          <p className="font-bold text-sm uppercase tracking-wide">
            ⚠️ Emergency Information Only
          </p>
        </div>

        {/* Header with Photo */}
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white text-center py-8 px-4">
          {/* Photo placeholder */}
          <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl border-4 border-white/30">
            {profile.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-slate-300 mt-1">{age} years old</p>
        </div>

        {/* Blood Type Badge */}
        <div className="flex justify-center -mt-5">
          <div className="bg-white border-4 border-red-600 rounded-xl px-6 py-3 shadow-lg">
            <span className="text-red-600 text-2xl font-bold">{profile.bloodType}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-6">
          {/* Allergies */}
          {profile.allergies.length > 0 && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <h2 className="text-xs font-bold text-red-800 uppercase tracking-wide mb-3">
                ⚠️ Allergies
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.allergies.map((allergy, idx) => (
                  <span
                    key={idx}
                    className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-lg"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Medical Conditions */}
          {profile.medicalConditions.length > 0 && (
            <div className="mb-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
              <h2 className="text-xs font-bold text-orange-800 uppercase tracking-wide mb-3">
                Medical Conditions
              </h2>
              <ul className="space-y-1">
                {profile.medicalConditions.map((condition, idx) => (
                  <li key={idx} className="text-slate-700 font-medium">
                    • {condition}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Medications */}
          {profile.medications.length > 0 && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h2 className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-3">
                💊 Current Medications
              </h2>
              <div className="space-y-2">
                {profile.medications.map((med) => (
                  <div key={med.id} className="bg-white rounded-lg p-3 border border-blue-100">
                    <div className="font-semibold text-slate-800">{med.name}</div>
                    <div className="text-sm text-slate-600">
                      {med.dosage} - {med.frequency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {profile.specialInstructions && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <h2 className="text-xs font-bold text-yellow-800 uppercase tracking-wide mb-3">
                📝 Special Instructions
              </h2>
              <p className="text-slate-700">{profile.specialInstructions}</p>
            </div>
          )}

          {/* Emergency Contacts */}
          <div className="mb-6">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
              📞 Emergency Contacts
            </h2>
            <div className="space-y-3">
              {profile.emergencyContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`bg-slate-50 rounded-xl p-4 border-l-4 ${
                    contact.relationship.toLowerCase().includes('father') ? 'border-blue-500' :
                    contact.relationship.toLowerCase().includes('mother') ? 'border-pink-500' :
                    contact.relationship.toLowerCase().includes('doctor') || contact.relationship.toLowerCase().includes('physician') ? 'border-red-500' :
                    'border-slate-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-slate-800">{contact.name}</div>
                      <div className="text-sm text-slate-500">{contact.relationship}</div>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>📞</span>
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Physician */}
          {profile.physicianName && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                🩺 Physician
              </h2>
              <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-red-500">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-slate-800">{profile.physicianName}</div>
                    <div className="text-sm text-slate-500">Primary Care Physician</div>
                  </div>
                  {profile.physicianPhone && (
                    <a
                      href={`tel:${profile.physicianPhone}`}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>📞</span>
                      <span>Call</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Address */}
          {profile.address && (
            <div className="mb-6">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                🏠 Home Address
              </h2>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-slate-700">{profile.address}</p>
              </div>
            </div>
          )}

          {/* Last Updated */}
          <div className="text-center text-slate-400 text-sm py-4 border-t border-slate-200">
            Last updated: {profile.lastUpdated}
          </div>

          {/* Footer */}
          <div className="text-center py-4">
            <p className="text-slate-400 text-xs">
              Powered by Emergency Info
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
