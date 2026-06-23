"use client";

import { useEffect, useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMissingSetup, setIsMissingSetup] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsMissingSetup(params.get("setup") === "missing-password");
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || "Could not log in.");
      }

      const params = new URLSearchParams(window.location.search);
      const nextPath = params.get("next") || "/";
      window.location.assign(nextPath.startsWith("/") ? nextPath : "/");
    } catch (error) {
      setMessage(error.message || "Could not log in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-panel">
        <p className="eyebrow">On Par</p>
        <h1>Beverage Dashboard</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Password</span>
            <input
              autoComplete="current-password"
              autoFocus
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter dashboard password"
              type="password"
              value={password}
            />
          </label>
          <button className="primary-button" disabled={isSubmitting || !password} type="submit">
            {isSubmitting ? "Checking..." : "Log in"}
          </button>
        </form>
        {isMissingSetup ? (
          <p className="login-message">Set DASHBOARD_PASSWORD in the environment to enable login.</p>
        ) : null}
        {message ? <p className="login-message">{message}</p> : null}
      </section>
    </main>
  );
}
