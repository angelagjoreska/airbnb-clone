"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Праќаме POST барање до Spring Boot бекендот (порта 8080)
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: name,
                    lastName: "",
                    email: email,
                    password: password,
                    phoneNumber: ""
                }),
            });

            if (response.ok) {
                alert("Registration successful!");
                router.push("/login");
            } else {
                const err = await response.json();
                alert(err.message || "Register failed");
            }

        } catch (err) {
            alert("Backend not reachable");
        }
    };


    return (
        <main style={{ backgroundColor: "#000", minHeight: "100vh", color: "white" }}>
            <Navbar onSearch={() => {}} />

            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "80px",
                paddingBottom: "40px"
            }}>
                <div style={{
                    width: "100%",
                    maxWidth: "450px",
                    padding: "40px",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
                }}>
                    <h2 style={{ marginBottom: "8px", color: "white", fontSize: "24px" }}>Create an account</h2>
                    <p style={{ color: "#a0a0a0", marginBottom: "32px", fontSize: "14px" }}>Join the Airbnb community today.</p>

                    <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div>
                            <label style={{ display: "block", color: "#e0e0e0", marginBottom: "8px", fontSize: "14px" }}>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", color: "#e0e0e0", marginBottom: "8px", fontSize: "14px" }}>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: "block", color: "#e0e0e0", marginBottom: "8px", fontSize: "14px" }}>Password</label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </div>

                        <button type="submit" style={buttonStyle}>
                            Agree and continue
                        </button>
                    </form>

                    <div style={{ height: "1px", backgroundColor: "#333", margin: "24px 0" }} />

                    <p style={{ textAlign: "center", fontSize: "14px", color: "#a0a0a0" }}>
                        Already have an account? <Link href="/login" style={{ color: "#ff385c", textDecoration: "none", fontWeight: "bold" }}>Log in</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

// Стилизација за инпутите за да бидат темни и прегледни
const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#2a2a2a",
    border: "1px solid #444",
    borderRadius: "8px",
    color: "white",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box"
};

// Стилизација за копчето (Airbnb розова)
const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#ff385c",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background 0.2s"
};