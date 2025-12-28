import Link from "next/link";

export default function Info() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      {/* Hero */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-6">Everything You Need to Know</h1>
          <p className="text-xl text-text-secondary">
            Rescue Link ID is a simple, secure platform for sharing critical medical information when it matters most.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border hover:border-red-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">QR Code Access</h3>
            <p className="text-text-secondary">
              Generate a unique QR code that links directly to your emergency information page. Print it on a wallet card, attach to a medical bracelet, or keep it on your phone case.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border hover:border-red-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5">
            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Medical Profile</h3>
            <p className="text-text-secondary">
              Store blood type, allergies, current medications, medical conditions, and special instructions. First responders see everything they need at a glance.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border hover:border-red-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">One-Tap Calling</h3>
            <p className="text-text-secondary">
              Emergency contacts are displayed with click-to-call buttons. Anyone viewing your page can reach your family instantly.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border hover:border-red-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Family Profiles</h3>
            <p className="text-text-secondary">
              Create profiles for your entire family - kids, elderly parents, anyone who needs emergency information accessible. One account, unlimited profiles.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border hover:border-red-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Printable Wallet Cards</h3>
            <p className="text-text-secondary">
              Download professional PDF wallet cards with your QR code. Laminate them for durability and keep them handy at all times.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border hover:border-red-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No App Required</h3>
            <p className="text-text-secondary">
              Emergency pages work in any browser. No app download needed - just scan and view. Works on any phone or device.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border hover:border-red-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5">
            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Profile Photos</h3>
            <p className="text-text-secondary">
              Upload a photo to help first responders identify the person quickly. Especially helpful for children and elderly family members.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border hover:border-red-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/5">
            <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Communication Needs</h3>
            <p className="text-text-secondary">
              Indicate if the person is deaf, non-verbal, blind, or uses sign language. Helps first responders communicate effectively in emergencies.
            </p>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-card-bg rounded-2xl border border-card-border p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold mb-4">Security First</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Your medical information is sensitive. We take security seriously.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-4 rounded-xl hover:bg-green-500/5 transition-colors">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Unguessable URLs</h4>
                <p className="text-text-secondary text-sm">Each emergency page has a 20+ character random URL that cannot be guessed or brute-forced.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-green-500/5 transition-colors">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Encrypted Data</h4>
                <p className="text-text-secondary text-sm">All personal information is encrypted at rest and in transit using industry-standard encryption.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-green-500/5 transition-colors">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">No Tracking</h4>
                <p className="text-text-secondary text-sm">We don&apos;t track who views your emergency pages. Privacy is paramount.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-green-500/5 transition-colors">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">HTTPS Only</h4>
                <p className="text-text-secondary text-sm">All connections are secured with HTTPS. Your data never travels unencrypted.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-green-500/5 transition-colors">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">You Control Your Data</h4>
                <p className="text-text-secondary text-sm">Edit or delete your profiles anytime. Regenerate URLs if you ever need to invalidate old links.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-green-500/5 transition-colors">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Minimal Data Collection</h4>
                <p className="text-text-secondary text-sm">We only collect what&apos;s necessary for the service. No selling data to third parties.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Affordable Pricing</h2>
        <div className="max-w-md mx-auto bg-card-bg rounded-2xl border border-card-border p-8 text-center hover:border-red-500/30 transition-all hover:shadow-xl hover:shadow-red-500/5">
          <div className="inline-block bg-red-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
            30-Day Free Trial
          </div>
          <div className="text-5xl font-bold mb-2">$40<span className="text-xl font-normal text-text-secondary">/year</span></div>
          <p className="text-text-secondary mb-6">That&apos;s less than $4/month</p>

          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Unlimited profiles for your whole family</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Unlimited QR codes and wallet cards</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>All features included</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>No credit card for trial</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Cancel anytime</span>
            </li>
          </ul>

          <Link
            href="/register"
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40"
          >
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Who can see my emergency information?</h3>
                <p className="text-text-secondary">Only people who have your unique QR code or URL can view your emergency page. The URL is random and cannot be guessed.</p>
              </div>
            </div>
          </div>
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do I need to download an app?</h3>
                <p className="text-text-secondary">No! Emergency pages work in any web browser. Anyone with a smartphone can scan your QR code and view your information instantly.</p>
              </div>
            </div>
          </div>
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What if I lose my wallet card?</h3>
                <p className="text-text-secondary">You can regenerate a new URL at any time from your dashboard, which will invalidate the old QR code. Then just print a new wallet card.</p>
              </div>
            </div>
          </div>
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">How do I pay?</h3>
                <p className="text-text-secondary">After your 30-day trial, you can pay $40/year via e-transfer. We&apos;ll send you payment instructions when your trial is ending.</p>
              </div>
            </div>
          </div>
          <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I create profiles for my family members?</h3>
                <p className="text-text-secondary">Yes! One account includes unlimited profiles. Create emergency pages for your children, parents, or anyone else in your family.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center bg-card-bg rounded-2xl border border-card-border p-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-text-secondary mb-8">Join thousands of families who trust Rescue Link ID to keep their loved ones safe.</p>
          <Link
            href="/register"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40"
          >
            Start Your Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-card-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-text-tertiary text-sm">
          <p>Rescue Link ID &copy; {new Date().getFullYear()} | rescuelinkid.com</p>
        </div>
      </footer>
    </div>
  );
}
