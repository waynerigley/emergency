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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-2xl mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Upgrade Your Account</h1>
            <p className="text-text-secondary text-lg">
              Continue protecting your family with Rescue Link ID
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-8 mb-8 hover:border-green-500/30 transition-all hover:shadow-xl hover:shadow-green-500/5">
            <div className="text-center mb-8">
              <div className="inline-block bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                Best Value
              </div>
              <div className="text-5xl font-bold mb-2">$40<span className="text-xl font-normal text-text-secondary">/year</span></div>
              <p className="text-text-secondary">One simple price for unlimited protection</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/5 transition-colors">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Unlimited profiles for your whole family</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/5 transition-colors">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Unlimited QR codes and wallet cards</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/5 transition-colors">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>24/7 emergency page availability</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/5 transition-colors">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Priority support</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-500/5 transition-colors">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>All future features included</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">How to Pay</h2>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-red-600/25">1</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Send E-Transfer</h3>
                  <p className="text-text-secondary text-sm mb-3">
                    Send $40 CAD via Interac e-Transfer to:
                  </p>
                  <div className="bg-input-bg border border-input-border rounded-xl p-4 font-mono text-sm flex items-center justify-between">
                    <span>payments@rescuelinkid.com</span>
                    <button
                      onClick={() => navigator.clipboard.writeText('payments@rescuelinkid.com')}
                      className="ml-3 p-2 hover:bg-card-border rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      <svg className="w-4 h-4 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-red-600/25">2</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Include Your Email</h3>
                  <p className="text-text-secondary text-sm mb-3">
                    In the e-transfer message, include the email address you used to register:
                  </p>
                  {user && (
                    <div className="bg-input-bg border border-input-border rounded-xl p-4 font-mono text-sm flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-red-600/25">3</div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">We&apos;ll Activate Your Account</h3>
                  <p className="text-text-secondary text-sm">
                    Once we receive your payment, we&apos;ll activate your subscription within 24 hours. You&apos;ll receive an email confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Payment */}
          <div className="bg-card-bg rounded-2xl border border-card-border p-8 mb-8 hover:border-purple-500/30 transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Other Payment Methods</h2>
            </div>
            <p className="text-text-secondary mb-4">
              Prefer a different payment method? Contact us and we&apos;ll work something out.
            </p>
            <a
              href="mailto:support@rescuelinkid.com"
              className="inline-flex items-center gap-3 bg-input-bg hover:bg-card-border border border-input-border font-medium py-3 px-6 rounded-xl transition-all hover:-translate-y-0.5"
            >
              <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span>support@rescuelinkid.com</span>
            </a>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold">Payment FAQ</h2>
            </div>

            <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What happens if I don&apos;t pay?</h3>
                  <p className="text-text-secondary text-sm">
                    Your emergency pages will continue to work, but you won&apos;t be able to edit profiles or create new ones until you subscribe.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Can I get a refund?</h3>
                  <p className="text-text-secondary text-sm">
                    Yes, we offer a 30-day money-back guarantee. If you&apos;re not satisfied, contact us for a full refund.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card-bg rounded-2xl border border-card-border p-6 hover:border-red-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Do you offer discounts?</h3>
                  <p className="text-text-secondary text-sm">
                    Contact us if you&apos;re facing financial hardship. We believe everyone deserves access to emergency preparedness tools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Dashboard */}
          <div className="mt-12 text-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
