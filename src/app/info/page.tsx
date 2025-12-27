import Link from "next/link";

export default function Info() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      {/* Hero */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Everything You Need to Know</h1>
          <p className="text-xl text-text-secondary">
            Emergency Info is a simple, secure platform for sharing critical medical information when it matters most.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card-bg p-6 rounded-xl border border-card-border">
            <div className="text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">QR Code Access</h3>
            <p className="text-text-secondary">
              Generate a unique QR code that links directly to your emergency information page. Print it on a wallet card, attach to a medical bracelet, or keep it on your phone case.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-xl border border-card-border">
            <div className="text-3xl mb-4">🩸</div>
            <h3 className="text-xl font-semibold mb-2">Complete Medical Profile</h3>
            <p className="text-text-secondary">
              Store blood type, allergies, current medications, medical conditions, and special instructions. First responders see everything they need at a glance.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-xl border border-card-border">
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">One-Tap Calling</h3>
            <p className="text-text-secondary">
              Emergency contacts are displayed with click-to-call buttons. Anyone viewing your page can reach your family instantly.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-xl border border-card-border">
            <div className="text-3xl mb-4">👨‍👩‍👧</div>
            <h3 className="text-xl font-semibold mb-2">Family Profiles</h3>
            <p className="text-text-secondary">
              Create profiles for your entire family - kids, elderly parents, anyone who needs emergency information accessible. One account, unlimited profiles.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-xl border border-card-border">
            <div className="text-3xl mb-4">🖨️</div>
            <h3 className="text-xl font-semibold mb-2">Printable Wallet Cards</h3>
            <p className="text-text-secondary">
              Download professional PDF wallet cards with your QR code. Laminate them for durability and keep them handy at all times.
            </p>
          </div>
          <div className="bg-card-bg p-6 rounded-xl border border-card-border">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold mb-2">No App Required</h3>
            <p className="text-text-secondary">
              Emergency pages work in any browser. No app download needed - just scan and view. Works on any phone or device.
            </p>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-card-bg rounded-2xl border border-card-border p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🔐</div>
            <h2 className="text-3xl font-bold mb-4">Security First</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Your medical information is sensitive. We take security seriously.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Unguessable URLs</h4>
                <p className="text-text-secondary text-sm">Each emergency page has a 20+ character random URL that cannot be guessed or brute-forced.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Encrypted Data</h4>
                <p className="text-text-secondary text-sm">All personal information is encrypted at rest and in transit using industry-standard encryption.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1">No Tracking</h4>
                <p className="text-text-secondary text-sm">We don&apos;t track who views your emergency pages. Privacy is paramount.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1">HTTPS Only</h4>
                <p className="text-text-secondary text-sm">All connections are secured with HTTPS. Your data never travels unencrypted.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-green-500 text-xl">✓</div>
              <div>
                <h4 className="font-semibold mb-1">You Control Your Data</h4>
                <p className="text-text-secondary text-sm">Edit or delete your profiles anytime. Regenerate URLs if you ever need to invalidate old links.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-green-500 text-xl">✓</div>
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
        <div className="max-w-md mx-auto bg-card-bg rounded-2xl border border-card-border p-8 text-center">
          <div className="inline-block bg-red-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
            30-Day Free Trial
          </div>
          <div className="text-5xl font-bold mb-2">$40<span className="text-xl font-normal text-text-secondary">/year</span></div>
          <p className="text-text-secondary mb-6">That&apos;s less than $4/month</p>

          <ul className="text-left space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span>Unlimited profiles for your whole family</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span>Unlimited QR codes and wallet cards</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span>All features included</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span>No credit card for trial</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span>Cancel anytime</span>
            </li>
          </ul>

          <Link
            href="/register"
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-card-bg rounded-xl border border-card-border p-6">
            <h3 className="font-semibold mb-2">Who can see my emergency information?</h3>
            <p className="text-text-secondary">Only people who have your unique QR code or URL can view your emergency page. The URL is random and cannot be guessed.</p>
          </div>
          <div className="bg-card-bg rounded-xl border border-card-border p-6">
            <h3 className="font-semibold mb-2">Do I need to download an app?</h3>
            <p className="text-text-secondary">No! Emergency pages work in any web browser. Anyone with a smartphone can scan your QR code and view your information instantly.</p>
          </div>
          <div className="bg-card-bg rounded-xl border border-card-border p-6">
            <h3 className="font-semibold mb-2">What if I lose my wallet card?</h3>
            <p className="text-text-secondary">You can regenerate a new URL at any time from your dashboard, which will invalidate the old QR code. Then just print a new wallet card.</p>
          </div>
          <div className="bg-card-bg rounded-xl border border-card-border p-6">
            <h3 className="font-semibold mb-2">How do I pay?</h3>
            <p className="text-text-secondary">After your 30-day trial, you can pay $40/year via e-transfer. We&apos;ll send you payment instructions when your trial is ending.</p>
          </div>
          <div className="bg-card-bg rounded-xl border border-card-border p-6">
            <h3 className="font-semibold mb-2">Can I create profiles for my family members?</h3>
            <p className="text-text-secondary">Yes! One account includes unlimited profiles. Create emergency pages for your children, parents, or anyone else in your family.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-text-secondary mb-8">Join thousands of families who trust Emergency Info to keep their loved ones safe.</p>
          <Link
            href="/register"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Start Your Free Trial
          </Link>
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
