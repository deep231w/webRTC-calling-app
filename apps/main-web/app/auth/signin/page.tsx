"use client";

import React, { useState } from "react";
import axios from "axios";
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("bc url- ",process.env.NEXT_PUBLIC_BACKEND_URL )

  const handleSignIn = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in with:", email, password);
    
    const response= await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/signin`,{
        email,
        password
    },{withCredentials:true})

    console.log("response of signin = ", response);

    localStorage.setItem("user",JSON.stringify(response?.data?.user));

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
