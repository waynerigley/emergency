"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authenticateUser } from "@/lib/mockData";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = authenticateUser(email, password);

    if (user) {
      // Store user in localStorage for now
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Redirect based on user type
      if (user.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      setError("Invalid credentials. Try admin / 1234");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl">🔗</Link>
          <h1 className="text-2xl font-bold mt-4">Sign In</h1>
          <p className="text-text-secondary mt-2">Access your emergency profiles</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card-bg rounded-xl p-8 border border-card-border">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Email / Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg focus:outline-none focus:border-red-500"
              placeholder="admin"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-input-bg border border-input-border rounded-lg focus:outline-none focus:border-red-500"
              placeholder="1234"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-text-secondary mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-red-500 hover:text-red-400">
              Sign up
            </Link>
          </p>

          <div className="mt-6 pt-6 border-t border-card-border">
            <p className="text-text-tertiary text-xs text-center">
              Test credentials: admin / 1234
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
