"use client";

import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {

        try {

            const res = await fetch(
                "https://icerp.up.railway.app/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await res.json();
            console.log(data);

            if (data.token) {

                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                alert("Welcome to ICERP 👑");


                window.location.href = "/";

            }
            else {

                alert(data.message || "Login failed");

            }


        } catch (error) {

            console.log(error);

            alert("Server connection error");

        }

    }


    return (
        <main className="min-h-screen bg-[#05070D] text-white flex items-center justify-center">


            <div className="bg-[#0D1117] p-8 rounded-2xl border border-cyan-500/20 w-[400px]">


                <h1 className="text-3xl text-cyan-400 font-bold mb-6 text-center">
                    ❄️ ICERP Login
                </h1>


                <input
                    className="w-full p-3 mb-4 bg-black rounded"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />


                <input
                    className="w-full p-3 mb-6 bg-black rounded"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />


                <button
                    onClick={handleLogin}
                    className="w-full bg-cyan-400 text-black p-3 rounded-xl font-bold hover:bg-cyan-300"
                >
                    Login
                </button>


            </div>


        </main>
    );
}