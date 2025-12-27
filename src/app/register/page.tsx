"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Implement Firebase auth
    // For now, just show success and redirect to login
    alert("Registration successful! Please sign in with your new account.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl">🚨</Link>
          <h1 className="text-2xl font-bold mt-4">Create Account</h1>
          <p className="text-text-secondary mt-2">Start your free 30-day trial</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card-bg rounded-xl p-8 border border-card-border">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg focus:outline-none focus:border-red-500"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg focus:outline-none focus:border-red-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg focus:outline-none focus:border-red-500"
              placeholder="At least 8 characters"
              required
              minLength={8}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg focus:outline-none focus:border-red-500"
              placeholder="Confirm your password"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            {loading ? "Creating account..." : "Start Free Trial"}
          </button>

          <p className="text-center text-text-secondary mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-red-500 hover:text-red-400">
              Sign in
            </Link>
          </p>

          <p className="text-text-tertiary text-xs text-center mt-4">
            No credit card required. 30-day free trial with all features.
          </p>
        </form>
      </div>
    </div>
  );
}
