"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    // 1. Дефинирање на држави (states) за инпутите
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // 2. Функција која ќе го изврши реалниот POST повик до Spring Boot
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem("token", data.token);
                localStorage.setItem("email", data.email);
                localStorage.setItem("role", data.role);

                window.location.href = "/";

                alert("Login successful!");

                router.push("/");
            } else {
                const err = await response.json();
                alert(err.message || "Login failed");
            }

        } catch (err) {
            alert("Backend not reachable");
        }
    };




    return (
        <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
            <Navbar onSearch={() => {}} />
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "100px" }}>
                <div style={{ width: "400px", padding: "40px", backgroundColor: "#1a1a1a", border: "1px solid #333", borderRadius: "12px" }}>
                    <h2 style={{ marginBottom: "24px", color: "white" }}>Welcome back!</h2>

                    {/* 3. Го обвиткуваме кодот во <form> и го врзуваме onSubmit настанот */}
                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: "16px" }}>
                            <label style={{ display: "block", color: "#a0a0a0", marginBottom: "8px" }}>Email</label>
                            <input
                                type="email"
                                placeholder="you@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: "100%", padding: "12px", backgroundColor: "#2a2a2a", border: "1px solid #444", borderRadius: "8px", color: "white", boxSizing: "border-box" }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: "24px" }}>
                            <label style={{ display: "block", color: "#a0a0a0", marginBottom: "8px" }}>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ width: "100%", padding: "12px", backgroundColor: "#2a2a2a", border: "1px solid #444", borderRadius: "8px", color: "white", boxSizing: "border-box" }}
                                required
                            />
                        </div>

                        {/* 4. Му даваме type="submit" на копчето */}
                        <button
                            type="submit"
                            style={{ width: "100%", padding: "12px", backgroundColor: "#ff385c", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
                        >
                            Log in
                        </button>
                    </form>

                    <p style={{ marginTop: "20px", textAlign: "center", fontSize: "14px", color: "#a0a0a0" }}>
                        Don't have an account? <Link href="/register" style={{ color: "#ff385c", textDecoration: "none" }}>Sign up</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}