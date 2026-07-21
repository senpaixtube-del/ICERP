"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Crown, ArrowRight, User, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    const cardRef = useRef(null);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardRef.current?.style.setProperty("--x", `${x}px`);
        cardRef.current?.style.setProperty("--y", `${y}px`);
    };

    // SHAKE CARD ON ERROR
    const shakeCard = () => {
        cardRef.current?.classList.add("shake");
        setTimeout(() => {
            cardRef.current?.classList.remove("shake");
        }, 500);
    };

    async function register() {
        setLoading(true);
        setMessage("");

        // تبدیل ایمیل به lowercase و trim
        const email = form.email.toLowerCase().trim();
        const username = form.username.trim();

        try {
            const res = await fetch(
                "https://icerp.up.railway.app/api/auth/register",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password: form.password
                    })
                }
            );

            const data = await res.json();

            if (res.ok) {
                setMessage("Account created successfully ✅");
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            } else {
                setMessage(data.message || "Register failed");
                shakeCard();
            }
        } catch (err) {
            console.error("Register error:", err);
            setMessage("Server connection error");
            shakeCard();
        }

        setLoading(false);
    }

    return (
        <main className="
            min-h-screen
            flex
            items-center
            justify-center
            px-6
            text-white
            relative
            overflow-hidden
        ">
            {/* ===== BACKGROUND ===== */}
            <div
                className="
                    absolute
                    inset-0
                    bg-cover
                    bg-center
                    bg-no-repeat
                "
                style={{
                    backgroundImage: "url('/snowlogin.png')"
                }}
            />

            {/* ===== OVERLAY ===== */}
            <div className="overlay-blur" />

            {/* ===== REGISTER CARD ===== */}
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                className="
                    relative
                    z-10
                    ice-cover
                    login-show
                "
            >
                {/* ===== LOGO ===== */}
                <div className="
                    login-logo
                    flex
                    justify-center
                    mb-6
                ">
                    <div className="
                        p-5
                        rounded-full
                        bg-cyan-400/10
                        border
                        border-cyan-300/30
                    ">
                        <Crown
                            size={55}
                            className="
                                text-cyan-300
                                drop-shadow-[0_0_20px_#22d3ee]
                            "
                        />
                    </div>
                </div>

                {/* ===== TITLE ===== */}
                <div className="ice-content">
                    <h1 className="
                        text-4xl
                        font-black
                        text-center
                    ">
                        Create Account ❄️
                    </h1>

                    <p className="
                        text-center
                        text-cyan-100/70
                        mt-3
                        mb-8
                    ">
                        Join ICERP RolePlay System
                    </p>

                    {/* ===== USERNAME ===== */}
                    <div className="
                        flex
                        items-center
                        gap-3
                        border
                        border-white/10
                        rounded-xl
                        px-4
                        mb-5
                        bg-black/20
                    ">
                        <User className="text-cyan-300" size={20} />
                        <input
                            className="
                                ice-input
                                !bg-transparent
                                !border-0
                                !mb-0
                                !h-14
                            "
                            placeholder="Username"
                            value={form.username}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    username: e.target.value
                                })
                            }
                        />
                    </div>

                    {/* ===== EMAIL ===== */}
                    <div className="
                        flex
                        items-center
                        gap-3
                        border
                        border-white/10
                        rounded-xl
                        px-4
                        mb-5
                        bg-black/20
                    ">
                        <Mail className="text-cyan-300" size={20} />
                        <input
                            className="
                                ice-input
                                !bg-transparent
                                !border-0
                                !mb-0
                                !h-14
                            "
                            placeholder="Email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }
                        />
                    </div>

                    {/* ===== PASSWORD ===== */}
                    <div className="
                        flex
                        items-center
                        gap-3
                        border
                        border-white/10
                        rounded-xl
                        px-4
                        mb-5
                        bg-black/20
                    ">
                        <Lock className="text-cyan-300" size={20} />
                        <input
                            className="
                                ice-input
                                !bg-transparent
                                !border-0
                                !mb-0
                                !h-14
                            "
                            placeholder="Password"
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value
                                })
                            }
                        />
                    </div>

                    {/* ===== BUTTON ===== */}
                    <button
                        onClick={register}
                        disabled={loading}
                        className="ice-button"
                    >
                        {loading
                            ? <div className="loader"></div>
                            : (
                                <>
                                    CREATE ACCOUNT
                                    <ArrowRight className="inline ml-2" />
                                </>
                            )
                        }
                    </button>

                    {/* ===== MESSAGE ===== */}
                    {message && (
                        <p className={`ice-message mt-5 ${message.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                            {message}
                        </p>
                    )}

                    {/* ===== LINK TO LOGIN ===== */}
                    <p className="
                        text-center
                        mt-6
                        text-gray-300
                    ">
                        Already have an account?
                        <a
                            href="/login"
                            className="
                                ml-2
                                text-cyan-300
                                hover:text-cyan-200
                                transition
                            "
                        >
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}