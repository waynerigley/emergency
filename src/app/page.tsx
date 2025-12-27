import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-6xl mb-6">🚨</div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Emergency Info
          </h1>
          <p className="text-xl text-slate-300 mb-8">
            Create a personal emergency information page that first responders can access instantly by scanning a QR code. No app required.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Scan & View</h3>
            <p className="text-slate-400">
              Anyone can scan your QR code and instantly see your emergency info. No app download needed.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="text-3xl mb-4">🩸</div>
            <h3 className="text-xl font-semibold mb-2">Critical Info</h3>
            <p className="text-slate-400">
              Blood type, allergies, medications, conditions, and emergency contacts - all in one place.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">Click to Call</h3>
            <p className="text-slate-400">
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
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h3 className="font-semibold mb-2">Create Profile</h3>
            <p className="text-slate-400 text-sm">Add your medical info and emergency contacts</p>
          </div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h3 className="font-semibold mb-2">Get QR Code</h3>
            <p className="text-slate-400 text-sm">Download and print on a wallet card or bracelet</p>
          </div>
          <div className="flex-1 text-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h3 className="font-semibold mb-2">Stay Protected</h3>
            <p className="text-slate-400 text-sm">First responders can access your info instantly</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-slate-500 text-sm">
          <p>Built with Firebase • Next.js • Claude</p>
        </div>
      </footer>
    </div>
  );
}
