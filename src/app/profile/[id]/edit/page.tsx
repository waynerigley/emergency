"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { User, Profile, updateProfile, EmergencyContact, Medication } from "@/lib/mockData";
import AddressAutocomplete from "@/components/AddressAutocomplete";
import PhotoUpload from "@/components/PhotoUpload";

export default function EditProfile() {
  const router = useRouter();
  const params = useParams();
  const profileId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [physicianName, setPhysicianName] = useState("");
  const [physicianPhone, setPhysicianPhone] = useState("");
  const [hasEpiPen, setHasEpiPen] = useState(false);
  const [hasPacemaker, setHasPacemaker] = useState(false);
  const [isDeaf, setIsDeaf] = useState(false);
  const [isNonVerbal, setIsNonVerbal] = useState(false);
  const [isBlind, setIsBlind] = useState(false);
  const [usesSignLanguage, setUsesSignLanguage] = useState(false);

  // Medications
  const [medications, setMedications] = useState<Medication[]>([]);
  const [newMedName, setNewMedName] = useState("");
  const [newMedDosage, setNewMedDosage] = useState("");
  const [newMedFrequency, setNewMedFrequency] = useState("");

  // Emergency contacts
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactRelationship, setNewContactRelationship] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser) as User;
      setUser(userData);

      // Find the profile
      const foundProfile = userData.profiles.find(p => p.id === profileId);
      if (foundProfile) {
        setProfile(foundProfile);
        // Populate form fields
        setName(foundProfile.name);
        setDateOfBirth(foundProfile.dateOfBirth);
        setBloodType(foundProfile.bloodType);
        setAddress(foundProfile.address || "");
        setPhoto(foundProfile.photo || "");
        setAllergies(foundProfile.allergies.join(", "));
        setMedicalConditions(foundProfile.medicalConditions.join(", "));
        setSpecialInstructions(foundProfile.specialInstructions || "");
        setPhysicianName(foundProfile.physicianName || "");
        setPhysicianPhone(foundProfile.physicianPhone || "");
        setHasEpiPen(foundProfile.hasEpiPen || false);
        setHasPacemaker(foundProfile.hasPacemaker || false);
        setIsDeaf(foundProfile.isDeaf || false);
        setIsNonVerbal(foundProfile.isNonVerbal || false);
        setIsBlind(foundProfile.isBlind || false);
        setUsesSignLanguage(foundProfile.usesSignLanguage || false);
        setMedications(foundProfile.medications || []);
        setContacts(foundProfile.emergencyContacts || []);
      } else {
        router.push('/dashboard');
      }
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router, profileId]);

  const addMedication = () => {
    if (newMedName && newMedDosage && newMedFrequency) {
      setMedications([...medications, {
        id: `med_${Date.now()}`,
        name: newMedName,
        dosage: newMedDosage,
        frequency: newMedFrequency
      }]);
      setNewMedName("");
      setNewMedDosage("");
      setNewMedFrequency("");
    }
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const addContact = () => {
    if (newContactName && newContactRelationship && newContactPhone) {
      setContacts([...contacts, {
        id: `contact_${Date.now()}`,
        name: newContactName,
        relationship: newContactRelationship,
        phone: newContactPhone,
        isPrimary: contacts.length === 0
      }]);
      setNewContactName("");
      setNewContactRelationship("");
      setNewContactPhone("");
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    setSaving(true);

    const updatedProfile = updateProfile(user.id, profile.id, {
      name,
      dateOfBirth,
      bloodType,
      address,
      photo: photo || undefined,
      allergies: allergies.split(',').map(a => a.trim()).filter(a => a),
      medicalConditions: medicalConditions.split(',').map(c => c.trim()).filter(c => c),
      medications,
      emergencyContacts: contacts,
      specialInstructions: specialInstructions || undefined,
      physicianName: physicianName || undefined,
      physicianPhone: physicianPhone || undefined,
      hasEpiPen: hasEpiPen || undefined,
      hasPacemaker: hasPacemaker || undefined,
      isDeaf: isDeaf || undefined,
      isNonVerbal: isNonVerbal || undefined,
      isBlind: isBlind || undefined,
      usesSignLanguage: usesSignLanguage || undefined
    });

    if (updatedProfile) {
      // Update local user state
      const updatedProfiles = user.profiles.map(p => p.id === profile.id ? updatedProfile : p);
      const updatedUser = { ...user, profiles: updatedProfiles };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      router.push('/dashboard');
    } else {
      setSaving(false);
      alert('Error updating profile');
    }
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

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <Link href="/dashboard" className="text-red-500 hover:underline">Return to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-card-bg rounded-xl transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-text-secondary text-sm">Update emergency information for {profile.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              {profile && (
                <PhotoUpload
                  profileId={profile.id}
                  currentPhoto={photo}
                  onPhotoChange={setPhoto}
                />
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Blood Type *</label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Home Address</label>
                <AddressAutocomplete
                  value={address}
                  onChange={setAddress}
                  placeholder="Start typing an address..."
                  className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          </div>

          {/* Medical Info */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-6">
            <h2 className="text-lg font-semibold mb-4">Medical Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Allergies (comma-separated)</label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Peanuts, Penicillin, Bee stings"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Medical Conditions (comma-separated)</label>
                <input
                  type="text"
                  value={medicalConditions}
                  onChange={(e) => setMedicalConditions(e.target.value)}
                  className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Asthma, Diabetes, Heart condition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Special Instructions</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500 min-h-[100px]"
                  placeholder="Any special instructions for first responders..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasEpiPen}
                    onChange={(e) => setHasEpiPen(e.target.checked)}
                    className="w-5 h-5 rounded border-input-border bg-input-bg text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium">Has EpiPen</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasPacemaker}
                    onChange={(e) => setHasPacemaker(e.target.checked)}
                    className="w-5 h-5 rounded border-input-border bg-input-bg text-purple-500 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium">Has Pacemaker</span>
                </label>
              </div>
            </div>
          </div>

          {/* Communication & Accessibility */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-6">
            <h2 className="text-lg font-semibold mb-4">Communication & Accessibility</h2>
            <p className="text-text-secondary text-sm mb-4">Check any that apply - helps first responders communicate effectively</p>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-3 cursor-pointer bg-input-bg rounded-xl px-4 py-3 hover:bg-input-bg/80 transition-colors">
                <input
                  type="checkbox"
                  checked={isDeaf}
                  onChange={(e) => setIsDeaf(e.target.checked)}
                  className="w-5 h-5 rounded border-input-border bg-input-bg text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium block">Deaf / Hard of Hearing</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer bg-input-bg rounded-xl px-4 py-3 hover:bg-input-bg/80 transition-colors">
                <input
                  type="checkbox"
                  checked={isNonVerbal}
                  onChange={(e) => setIsNonVerbal(e.target.checked)}
                  className="w-5 h-5 rounded border-input-border bg-input-bg text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium block">Non-Verbal</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer bg-input-bg rounded-xl px-4 py-3 hover:bg-input-bg/80 transition-colors">
                <input
                  type="checkbox"
                  checked={isBlind}
                  onChange={(e) => setIsBlind(e.target.checked)}
                  className="w-5 h-5 rounded border-input-border bg-input-bg text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium block">Blind / Visually Impaired</span>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer bg-input-bg rounded-xl px-4 py-3 hover:bg-input-bg/80 transition-colors">
                <input
                  type="checkbox"
                  checked={usesSignLanguage}
                  onChange={(e) => setUsesSignLanguage(e.target.checked)}
                  className="w-5 h-5 rounded border-input-border bg-input-bg text-blue-500 focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium block">Uses Sign Language</span>
                </div>
              </label>
            </div>
          </div>

          {/* Medications */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-6">
            <h2 className="text-lg font-semibold mb-4">Medications</h2>
            {medications.length > 0 && (
              <div className="space-y-2 mb-4">
                {medications.map((med) => (
                  <div key={med.id} className="flex items-center justify-between bg-input-bg rounded-xl px-4 py-3">
                    <div>
                      <span className="font-medium">{med.name}</span>
                      <span className="text-text-secondary text-sm ml-2">{med.dosage} - {med.frequency}</span>
                    </div>
                    <button type="button" onClick={() => removeMedication(med.id)} className="text-red-500 hover:text-red-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
                className="px-3 py-2 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500 text-sm"
                placeholder="Medication name"
              />
              <input
                type="text"
                value={newMedDosage}
                onChange={(e) => setNewMedDosage(e.target.value)}
                className="px-3 py-2 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500 text-sm"
                placeholder="Dosage"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMedFrequency}
                  onChange={(e) => setNewMedFrequency(e.target.value)}
                  className="flex-1 px-3 py-2 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500 text-sm"
                  placeholder="Frequency"
                />
                <button type="button" onClick={addMedication} className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm">
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-6">
            <h2 className="text-lg font-semibold mb-4">Emergency Contacts</h2>
            {contacts.length > 0 && (
              <div className="space-y-2 mb-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between bg-input-bg rounded-xl px-4 py-3">
                    <div>
                      <span className="font-medium">{contact.name}</span>
                      <span className="text-text-secondary text-sm ml-2">({contact.relationship}) - {contact.phone}</span>
                      {contact.isPrimary && <span className="ml-2 text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded">Primary</span>}
                    </div>
                    <button type="button" onClick={() => removeContact(contact.id)} className="text-red-500 hover:text-red-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className="px-3 py-2 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500 text-sm"
                placeholder="Contact name"
              />
              <input
                type="text"
                value={newContactRelationship}
                onChange={(e) => setNewContactRelationship(e.target.value)}
                className="px-3 py-2 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500 text-sm"
                placeholder="Relationship"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="flex-1 px-3 py-2 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500 text-sm"
                  placeholder="Phone"
                />
                <button type="button" onClick={addContact} className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm">
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Physician */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-6">
            <h2 className="text-lg font-semibold mb-4">Primary Physician</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Physician Name</label>
                <input
                  type="text"
                  value={physicianName}
                  onChange={(e) => setPhysicianName(e.target.value)}
                  className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="Dr. Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Physician Phone</label>
                <input
                  type="tel"
                  value={physicianPhone}
                  onChange={(e) => setPhysicianPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-xl focus:outline-none focus:border-red-500"
                  placeholder="555-123-4567"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="flex-1 text-center py-4 px-8 bg-card-bg hover:bg-input-bg border border-card-border font-semibold rounded-xl transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg shadow-red-600/25 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
