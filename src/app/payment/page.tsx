"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@/lib/mockData";

export default function Payment() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">💳</div>
            <h1 className="text-4xl font-bold mb-4">Upgrade Your Account</h1>
            <p className="text-text-secondary text-lg">
              Continue protecting your family with Emergency Info
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-8 mb-8">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold mb-2">$40<span className="text-xl font-normal text-text-secondary">/year</span></div>
              <p className="text-text-secondary">One simple price for unlimited protection</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>Unlimited profiles for your whole family</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>Unlimited QR codes and wallet cards</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>24/7 emergency page availability</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-500 text-xl">✓</span>
                <span>All future features included</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">How to Pay</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">1</div>
                <div>
                  <h3 className="font-semibold mb-1">Send E-Transfer</h3>
                  <p className="text-text-secondary text-sm">
                    Send $40 CAD via Interac e-Transfer to:
                  </p>
                  <div className="mt-2 bg-input-bg border border-input-border rounded-lg p-3 font-mono text-sm">
                    payments@emergencyinfo.ca
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">2</div>
                <div>
                  <h3 className="font-semibold mb-1">Include Your Email</h3>
                  <p className="text-text-secondary text-sm">
                    In the e-transfer message, include the email address you used to register:
                  </p>
                  {user && (
                    <div className="mt-2 bg-input-bg border border-input-border rounded-lg p-3 font-mono text-sm">
                      {user.email}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">3</div>
                <div>
                  <h3 className="font-semibold mb-1">We&apos;ll Activate Your Account</h3>
                  <p className="text-text-secondary text-sm">
                    Once we receive your payment, we&apos;ll activate your subscription within 24 hours. You&apos;ll receive an email confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Payment */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-8 mb-8">
            <h2 className="text-xl font-bold mb-4">Other Payment Methods</h2>
            <p className="text-text-secondary mb-4">
              Prefer a different payment method? Contact us and we&apos;ll work something out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:support@emergencyinfo.ca"
                className="flex items-center justify-center gap-2 bg-card-bg hover:bg-input-bg border border-card-border font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <span>📧</span>
                <span>support@emergencyinfo.ca</span>
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Payment FAQ</h2>

            <div className="bg-card-bg rounded-xl border border-card-border p-6">
              <h3 className="font-semibold mb-2">What happens if I don&apos;t pay?</h3>
              <p className="text-text-secondary text-sm">
                Your emergency pages will continue to work, but you won&apos;t be able to edit profiles or create new ones until you subscribe.
              </p>
            </div>

            <div className="bg-card-bg rounded-xl border border-card-border p-6">
              <h3 className="font-semibold mb-2">Can I get a refund?</h3>
              <p className="text-text-secondary text-sm">
                Yes, we offer a 30-day money-back guarantee. If you&apos;re not satisfied, contact us for a full refund.
              </p>
            </div>

            <div className="bg-card-bg rounded-xl border border-card-border p-6">
              <h3 className="font-semibold mb-2">Do you offer discounts?</h3>
              <p className="text-text-secondary text-sm">
                Contact us if you&apos;re facing financial hardship. We believe everyone deserves access to emergency preparedness tools.
              </p>
            </div>
          </div>

          {/* Back to Dashboard */}
          <div className="mt-12 text-center">
            <Link
              href="/dashboard"
              className="text-red-500 hover:text-red-400 font-medium"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
