"use client";

import React, { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in with:", email, password);
    // TODO: Call your API route
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignIn}>
        <h2>Sign In</h2>

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>

        <p className="switch-text">
          Don’t have an account? <a href="/auth/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
