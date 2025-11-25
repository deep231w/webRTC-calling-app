"use client";

import React, { useState } from "react";
// import "../auth.css";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Create account:", name, email, password);
    // TODO: Call your signup API
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>

        <label>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Sign Up</button>

        <p className="switch-text">
          Already have an account? <a href="/auth/signin">Sign In</a>
        </p>
      </form>
    </div>
  );
}
