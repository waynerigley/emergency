import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <img src="/logo2.png" alt="Rescue Link ID" className="h-32 md:h-40 mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight whitespace-nowrap">
            Emergency Info That <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Saves Lives</span>
          </h1>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Create a secure emergency profile accessible via QR code. First responders get instant access to critical medical information - no app required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5"
            >
              Start Free 30-Day Trial
            </Link>
            <Link
              href="/info"
              className="bg-card-bg hover:bg-input-bg border border-card-border font-semibold py-4 px-8 rounded-xl transition-all hover:-translate-y-0.5"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-8 text-text-tertiary text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Unlimited profiles</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Rescue Link ID?</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">Everything you need to keep your loved ones safe in an emergency</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card-bg p-8 rounded-2xl border border-card-border hover:border-red-500/30 transition-colors">
            <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant QR Access</h3>
            <p className="text-text-secondary leading-relaxed">
              Anyone can scan your QR code and instantly view critical emergency information. No app download or account required.
            </p>
          </div>
          <div className="bg-card-bg p-8 rounded-2xl border border-card-border hover:border-red-500/30 transition-colors">
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Complete Medical Profile</h3>
            <p className="text-text-secondary leading-relaxed">
              Blood type, allergies, medications, conditions, and special instructions - everything first responders need to know.
            </p>
          </div>
          <div className="bg-card-bg p-8 rounded-2xl border border-card-border hover:border-red-500/30 transition-colors">
            <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">One-Tap Calling</h3>
            <p className="text-text-secondary leading-relaxed">
              Emergency contacts with click-to-call buttons plus navigation to home address. Get help fast when seconds matter.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-text-secondary">Three simple steps to protect yourself and your family</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white shadow-lg shadow-red-500/25">1</div>
            <h3 className="font-semibold text-lg mb-2">Create Profile</h3>
            <p className="text-text-secondary">Add medical info, allergies, medications, and emergency contacts</p>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white shadow-lg shadow-red-500/25">2</div>
            <h3 className="font-semibold text-lg mb-2">Get QR Code</h3>
            <p className="text-text-secondary">Download and print on a wallet card, bracelet, or key tag</p>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div className="flex-1 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 text-white shadow-lg shadow-red-500/25">3</div>
            <h3 className="font-semibold text-lg mb-2">Stay Protected</h3>
            <p className="text-text-secondary">First responders can access your info instantly when needed</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect For</h2>
          <p className="text-text-secondary">Protecting the people who matter most</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border text-center hover:border-card-border/80 transition-colors">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Elderly Parents</h3>
            <p className="text-text-secondary text-sm">Peace of mind if they wander or get confused</p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border text-center hover:border-card-border/80 transition-colors">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Children</h3>
            <p className="text-text-secondary text-sm">Keep them safe with contact info always available</p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border text-center hover:border-card-border/80 transition-colors">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Medical Conditions</h3>
            <p className="text-text-secondary text-sm">Share allergies and medications with responders</p>
          </div>
          <div className="bg-card-bg p-6 rounded-2xl border border-card-border text-center hover:border-card-border/80 transition-colors">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Active Lifestyles</h3>
            <p className="text-text-secondary text-sm">Be prepared for accidents during activities</p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-card-bg rounded-3xl border border-card-border p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
            <div className="inline-block bg-red-500/10 text-red-500 text-sm font-semibold px-4 py-1 rounded-full mb-6">
              30-Day Free Trial
            </div>
            <div className="text-5xl font-bold mb-2">$40<span className="text-xl font-normal text-text-secondary">/year</span></div>
            <p className="text-text-secondary mb-8">Unlimited profiles for your whole family</p>
            <Link
              href="/register"
              className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all shadow-lg shadow-red-600/25 hover:shadow-red-600/40"
            >
              Start Free Trial
            </Link>
            <p className="text-text-tertiary text-sm mt-4">No credit card required</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-card-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔗</span>
              <span className="font-semibold">Rescue Link ID</span>
            </div>
            <p className="text-text-tertiary text-sm">
              &copy; {new Date().getFullYear()} Rescue Link ID. All rights reserved.
            </p>
            <div className="flex gap-6 text-text-secondary text-sm">
              <Link href="/info" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="/info" className="hover:text-foreground transition-colors">Security</Link>
              <Link href="/payment" className="hover:text-foreground transition-colors">Pricing</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
