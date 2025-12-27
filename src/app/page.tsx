import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-6xl mb-6">🚨</div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Emergency Info
          </h1>
          <p className="text-xl text-text-secondary mb-8">
            Create a personal emergency information page that first responders can access instantly by scanning a QR code. No app required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Start Free 30-Day Trial
            </Link>
            <Link
              href="/info"
              className="bg-card-bg hover:bg-input-bg border border-card-border font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Emergency Info?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card-bg p-6 rounded-xl border border-card-border">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Scan & View</h3>
            <p className="text-text-secondary">
              Anyone can scan your QR code and instantly see your emergency info. No app download needed.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-xl border border-card-border">
            <div className="text-3xl mb-4">🩸</div>
            <h3 className="text-xl font-semibold mb-2">Critical Info</h3>
            <p className="text-text-secondary">
              Blood type, allergies, medications, conditions, and emergency contacts - all in one place.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-xl border border-card-border">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">Click to Call</h3>
            <p className="text-text-secondary">
              Emergency contacts have one-tap calling. Get help fast when seconds matter.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
          <div className="flex-1 text-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 text-white">1</div>
            <h3 className="font-semibold mb-2">Create Profile</h3>
            <p className="text-text-secondary text-sm">Add your medical info and emergency contacts</p>
          </div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 text-white">2</div>
            <h3 className="font-semibold mb-2">Get QR Code</h3>
            <p className="text-text-secondary text-sm">Download and print on a wallet card or bracelet</p>
          </div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 text-white">3</div>
            <h3 className="font-semibold mb-2">Stay Protected</h3>
            <p className="text-text-secondary text-sm">First responders can access your info instantly</p>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-card-bg p-5 rounded-xl border border-card-border text-center">
            <div className="text-4xl mb-3">👴</div>
            <h3 className="font-semibold">Elderly Parents</h3>
            <p className="text-text-secondary text-sm mt-1">Peace of mind if they get lost or confused</p>
          </div>
          <div className="bg-card-bg p-5 rounded-xl border border-card-border text-center">
            <div className="text-4xl mb-3">👶</div>
            <h3 className="font-semibold">Children</h3>
            <p className="text-text-secondary text-sm mt-1">Keep them safe with contact info always available</p>
          </div>
          <div className="bg-card-bg p-5 rounded-xl border border-card-border text-center">
            <div className="text-4xl mb-3">💊</div>
            <h3 className="font-semibold">Medical Conditions</h3>
            <p className="text-text-secondary text-sm mt-1">Share allergies and medications with first responders</p>
          </div>
          <div className="bg-card-bg p-5 rounded-xl border border-card-border text-center">
            <div className="text-4xl mb-3">🏃</div>
            <h3 className="font-semibold">Athletes</h3>
            <p className="text-text-secondary text-sm mt-1">Be prepared for accidents during activities</p>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-card-bg rounded-2xl border border-card-border p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Simple Pricing</h2>
          <p className="text-text-secondary mb-6">Start with a free 30-day trial</p>
          <div className="text-5xl font-bold mb-2">$40<span className="text-xl font-normal text-text-secondary">/year</span></div>
          <p className="text-text-secondary mb-6">Unlimited profiles for your whole family</p>
          <Link
            href="/register"
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Start Free Trial
          </Link>
          <p className="text-text-tertiary text-sm mt-4">No credit card required</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-card-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-text-tertiary text-sm">
          <p>Emergency Info Platform &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
