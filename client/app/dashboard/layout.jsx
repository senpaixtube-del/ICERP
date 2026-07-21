"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    Store,
    Trophy,
    Shield,
    Headphones,
    MessageSquare,
    Search,
    Settings,
    Crown,
    Bell,
    LogOut,
    Users,
    User,
    Home,
    Ticket,
    CreditCard,
    BarChart3,
    Gift,
    Star,
    HelpCircle,
    Disc,
    Zap,
    Sparkles,
    TrendingUp,
    Clock,
    ChevronRight,
    Activity,
    Wallet,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";

export default function DashboardLayout({ children }) {

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                setUser(parsed);
            } catch (e) {
                console.error("Error parsing user data:", e);
            }
        }

        if (!token) {
            router.push("/login");
        }
        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="loader"></div>
            </div>
        );
    }

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard", active: true },
        { icon: <Store size={20} />, label: "Store", href: "/store" },
        { icon: <Trophy size={20} />, label: "Leaderboard", href: "/leaderboard" },
        { icon: <Shield size={20} />, label: "Rules", href: "/rules" },
        { icon: <Headphones size={20} />, label: "Support", href: "/support" },
        { icon: <MessageSquare size={20} />, label: "Forum", href: "/forum" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-950 text-white">

            {/* ===== SIDEBAR ===== */}
            <aside className={`${isOpen ? "w-64" : "w-20"} bg-gray-900/80 backdrop-blur-xl border-r border-white/10 transition-all duration-300 flex flex-col fixed h-full z-50`}>

                {/* ===== LOGO ===== */}
                <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
                    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                            src="/images/icelogo.png"
                            alt="IceRP Logo"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>
                    {isOpen && (
                        <div>
                            <h1 className="font-bold text-lg text-white">IceRP</h1>
                            <p className="text-xs text-gray-400">RolePlay System</p>
                        </div>
                    )}
                </div>

                {/* Search */}
                <div className="px-3 py-4">
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                        <Search size={16} className="text-gray-400" />
                        {isOpen && (
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent outline-none text-sm w-full text-white"
                            />
                        )}
                        {isOpen && <span className="text-xs text-gray-500 ml-auto">Ctrl+K</span>}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition group ${item.active
                                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            {item.icon}
                            {isOpen && (
                                <>
                                    <span className="text-sm font-medium flex-1">{item.label}</span>
                                    {item.active && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                                </>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="border-t border-white/10 p-3">
                    <Link href="/profile" className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-black">
                            {user?.username ? user.username[0].toUpperCase() : "S"}
                        </div>
                        {isOpen && (
                            <div className="flex-1">
                                <p className="font-bold text-sm text-white">{user?.username || "Soroush"}</p>
                                <p className="text-xs text-gray-400">{user?.role || "Premium"}</p>
                            </div>
                        )}
                        {isOpen && <Settings size={18} className="text-gray-400" />}
                    </Link>
                </div>
            </aside>

            {/* ===== MAIN CONTENT ===== */}
            <div className={`${isOpen ? "ml-64" : "ml-20"} flex-1 transition-all duration-300 min-h-screen flex flex-col`}>

                {/* ===== HEADER / NAVBAR ===== */}
                <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-white/5 transition">
                            <LayoutDashboard size={20} className="text-gray-400" />
                        </button>
                        <div className="flex items-center gap-3">
                            {/* لوگو کوچک در هدر */}
                            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src="/images/icelogo.png"
                                    alt="IceRP"
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                                <p className="text-sm text-gray-400">Welcome Back, <span className="text-yellow-400">{user?.username?.toUpperCase() || "VINEWOOD"}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 px-4 py-2 rounded-xl">
                            <Crown size={16} className="text-yellow-400" />
                            <span className="text-sm font-bold text-yellow-400">{user?.role || "Premium"}</span>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-white/5 transition relative">
                            <Bell size={20} className="text-gray-400" />
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                        </button>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                router.push("/login");
                            }}
                            className="p-2 rounded-lg hover:bg-white/5 transition"
                        >
                            <LogOut size={20} className="text-gray-400 hover:text-red-400" />
                        </button>
                    </div>
                </header>

                {/* ===== CHILDREN (محتوای صفحه) ===== */}
                <main className="flex-1 p-8">
                    {children}
                </main>

            </div>
        </div>
    );
}