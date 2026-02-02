"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Please enter a valid email address.";
    }

    if (!password) {
      e.password = "Password is required.";
    } else if (password.length < 6) {
      e.password = "Password must be at least 6 characters.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setGeneralError("");
    if (!validate()) return;

    setLoading(true);

    try {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 1000));
      // Hardcoded admin credentials:
      if (email === "admin@example.com" && password === "password123") {
        router.push("/Admin");
      } else {
        setGeneralError("Invalid email or password.");
        setLoading(false);
      }
    } catch (err) {
      setGeneralError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Admin Login</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition text-gray-800 ${
                errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
              placeholder="you@example.com"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition text-gray-800 ${
                  errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
                }`}
                placeholder="••••••••"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          {generalError && (
            <div className="mb-5 text-center text-sm text-red-600" role="alert" aria-live="assertive">
              {generalError}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <svg
                className="w-5 h-5 mx-auto text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Use <span className="font-semibold text-gray-700">admin@example.com</span> /{" "}
          <span className="font-semibold text-gray-700">password123</span> for the demo.
        </p>
      </div>
    </div>
  );
}
