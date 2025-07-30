import axios from "axios";
import React, { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Empty field detected");
            return;
        }

        const data = { email, password };

        axios.post("http://localhost:3000/users/login", data)
            .then(response => {
                const accessToken = response.data.accessToken
                localStorage.setItem("token", accessToken);
                console.log("Login Successful");

            })
            .catch(err => {
                console.error("Login error:", err);
                alert("Login failed: " + (err.response?.data?.message || "Unknown error"));
            });
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="flex gap-1.5 flex-col max-w-md mx-auto mt-4">
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="border border-gray-400 px-2 py-1 rounded w-full"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="border border-gray-400 px-2 py-1 rounded w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Login</button>
            </form>
        </>
    );
}
