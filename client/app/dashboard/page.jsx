"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    Users,
    User,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Crown,
    Shield,
    Gift,
    Store,
    Trophy,
    Headphones,
    MessageSquare,
    Sparkles,
    TrendingUp,
    Clock,
    ChevronRight,
    BarChart3,
    Disc,
    Zap,
    HelpCircle,
    Server
} from "lucide-react";

// ===== SNOWFLAKE ICON =====
const SnowflakeIcon = ({ size = 20, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M12 2v20M12 2L8 6M12 2l4 4M12 22l-4-4M12 22l4-4M2 12h20M2 12l4-4M2 12l4 4M22 12l-4-4M22 12l-4 4" />
    </svg>
);

const API_BASE_URL = "https://icerp.up.railway.app/api";
const SERVER_IP = "217.18.90.211";
const SERVER_PORT = "30120";

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ===== STATS =====
    const [stats, setStats] = useState({
        playersOnline: 0,
        maxPlayers: 1024,
        activeCharacters: 0,
        totalAccounts: 0,
        serverUptime: "0h",
        todayNew: 0
    });

    const [leaders, setLeaders] = useState([]);
    const [news, setNews] = useState([]);
    const [character, setCharacter] = useState({
        name: "Loading...",
        username: "Loading...",
        job: "Civilian",
        bank: 0,
        level: 1,
        xp: 0,
        maxXp: 18000,
        xpPercent: 0
    });

    // ===== GET USER FROM LOCALSTORAGE =====
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                setUser(parsed);
            } catch (e) {
                console.error("Error parsing user data:", e);
            }
        }
    }, []);

    // ===== GET TOKEN =====
    const getToken = () => {
        return localStorage.getItem("token");
    };

    // ===== CONNECT TO SERVER =====
    const connectToServer = () => {
        const connectUrl = `fivem://connect/${SERVER_IP}:${SERVER_PORT}`;
        window.open(connectUrl, "_blank");
    };

    // ===== LOAD DATA FROM API =====
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setError(null);

            try {
                const token = getToken();

                if (!token) {
                    setError("No authentication token found");
                    setLoading(false);
                    return;
                }

                const headers = {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                };

                // ========================================
                // 📌 ۱. دریافت آمار از دیتابیس
                // ========================================
                try {
                    const statsRes = await fetch(`${API_BASE_URL}/stats`, { headers });

                    if (statsRes.ok) {
                        const statsData = await statsRes.json();
                        setStats({
                            playersOnline: statsData.playersOnline || 0,
                            maxPlayers: statsData.maxPlayers || 1024,
                            activeCharacters: statsData.activeCharacters || 0,
                            totalAccounts: statsData.totalAccounts || 0,
                            serverUptime: statsData.serverUptime || "0h",
                            todayNew: statsData.todayNew || 0
                        });
                    } else {
                        console.error("Failed to fetch stats:", statsRes.status);
                        setStats({
                            playersOnline: 0,
                            maxPlayers: 1024,
                            activeCharacters: 0,
                            totalAccounts: 0,
                            serverUptime: "0h",
                            todayNew: 0
                        });
                    }
                } catch (err) {
                    console.error("Stats API error:", err);
                }

                // ========================================
                // 📌 ۲. دریافت رنکینگ بازیکنان
                // ========================================
                try {
                    const leaderboardRes = await fetch(`${API_BASE_URL}/leaderboard?limit=5`, { headers });

                    if (leaderboardRes.ok) {
                        const data = await leaderboardRes.json();
                        const sortedPlayers = data.map((p, i) => ({
                            name: p.name || p.username || `Player ${i + 1}`,
                            username: p.username || p.name || `Player ${i + 1}`,
                            xp: `${(p.xp || 0).toLocaleString()}XP`,
                            rank: i + 1
                        }));
                        setLeaders(sortedPlayers);
                    } else {
                        console.error("Failed to fetch leaderboard:", leaderboardRes.status);
                        setLeaders([]);
                    }
                } catch (err) {
                    console.error("Leaderboard API error:", err);
                    setLeaders([]);
                }

                // ========================================
                // 📌 ۳. دریافت کاراکتر کاربر
                // ========================================
                try {
                    const charRes = await fetch(`${API_BASE_URL}/user/character`, { headers });

                    if (charRes.ok) {
                        const charData = await charRes.json();
                        const xpPercent = charData.xp && charData.maxXp ?
                            (charData.xp / charData.maxXp) * 100 : 0;

                        setCharacter({
                            name: charData.name || "No Character",
                            username: charData.username || "N/A",
                            job: charData.job || "N/A",
                            bank: charData.bank || 0,
                            level: charData.level || 1,
                            xp: charData.xp || 0,
                            maxXp: charData.maxXp || 18000,
                            xpPercent: Math.min(xpPercent, 100)
                        });
                    } else {
                        console.error("Failed to fetch character:", charRes.status);
                    }
                } catch (err) {
                    console.error("Character API error:", err);
                }

                // ========================================
                // 📌 ۴. دریافت اخبار
                // ========================================
                try {
                    const newsRes = await fetch(`${API_BASE_URL}/news?limit=4`, { headers });

                    if (newsRes.ok) {
                        const data = await newsRes.json();
                        setNews(data);
                    } else {
                        console.error("Failed to fetch news:", newsRes.status);
                        setNews([]);
                    }
                } catch (err) {
                    console.error("News API error:", err);
                    setNews([]);
                }

            } catch (error) {
                console.error("Error loading data:", error);
                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        }

        loadData();

        // هر ۳۰ ثانیه یکبار آپدیت کن
        const interval = setInterval(loadData, 30000);
        return () => clearInterval(interval);
    }, []);

    // ===== GET NEWS ICON =====
    const getNewsIcon = (iconName, size = 20) => {
        switch (iconName) {
            case 'sparkles': return <Sparkles size={size} className="text-cyan-400" />;
            case 'zap': return <Zap size={size} className="text-cyan-400" />;
            case 'snowflake': return <SnowflakeIcon size={size} className="text-cyan-400" />;
            case 'disc': return <Disc size={size} className="text-cyan-400" />;
            default: return <Sparkles size={size} className="text-cyan-400" />;
        }
    };

    const statsData = [
        {
            label: "Players Online",
            value: `${stats.playersOnline}/${stats.maxPlayers}`,
            change: `+${stats.todayNew} today`,
            icon: <Users className="text-cyan-400" size={20} />
        },
        {
            label: "Active Characters",
            value: stats.activeCharacters.toLocaleString(),
            change: "+4.8%",
            icon: <User className="text-purple-400" size={20} />
        },
        {
            label: "Total Accounts",
            value: stats.totalAccounts.toLocaleString(),
            change: "",
            icon: <Users className="text-yellow-400" size={20} />
        },
        {
            label: "Server Uptime",
            value: stats.serverUptime,
            change: "",
            icon: <Activity className="text-green-400" size={20} />
        },
    ];

    const newsData = news.length > 0 ? news : [];

    const leadersData = leaders.length > 0 ? leaders : [];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-red-400 text-center">
                    <p className="text-xl font-bold">⚠️ Error</p>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* ===== HERO SECTION ===== */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 min-h-[180px]">
                {/* عکس پس‌زمینه */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/icerp.png"
                        alt="IceRP Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                </div>

                {/* محتوا */}
                <div className="relative p-8 z-10">
                    <p className="text-sm text-cyan-400 font-medium mb-2 flex items-center gap-2">
                        <Sparkles size={16} />
                        The streets never sleep. Neither do legends.
                    </p>
                    <h3 className="text-3xl font-bold text-white">Welcome Back, {user?.username?.toUpperCase() || "PLAYER"}</h3>

                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 cursor-pointer hover:bg-black/60 transition">
                            <User size={16} className="text-gray-400" />
                            <span className="text-sm text-white">My Characters</span>
                            <ChevronRight size={14} className="text-gray-400" />
                        </div>
                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 cursor-pointer hover:bg-black/60 transition">
                            <Wallet size={16} className="text-gray-400" />
                            <span className="text-sm text-white">Transactions</span>
                            <ChevronRight size={14} className="text-gray-400" />
                        </div>
                        <button
                            onClick={connectToServer}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-xl font-bold text-white hover:shadow-[0_0_30px_rgba(34,211,238,.4)] transition"
                        >
                            Connect to Server
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== QUICK ACTIONS ===== */}
            <div className="grid grid-cols-3 gap-4">
                <button className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-cyan-500/50 transition group">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 mx-auto flex items-center justify-center group-hover:scale-110 transition">
                        <Shield size={24} className="text-cyan-400" />
                    </div>
                    <p className="text-sm font-bold mt-2 text-white">Whitelist</p>
                    <p className="text-xs text-gray-400">Applications</p>
                </button>
                <button className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-cyan-500/50 transition group">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 mx-auto flex items-center justify-center group-hover:scale-110 transition">
                        <Users size={24} className="text-purple-400" />
                    </div>
                    <p className="text-sm font-bold mt-2 text-white">Community</p>
                    <p className="text-xs text-gray-400">IceRP Season 4</p>
                </button>
                <button className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-cyan-500/50 transition group">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 mx-auto flex items-center justify-center group-hover:scale-110 transition">
                        <Gift size={24} className="text-green-400" />
                    </div>
                    <p className="text-sm font-bold mt-2 text-white">Exclusive Store</p>
                    <p className="text-xs text-gray-400">Get premium cars, VIP and more.</p>
                </button>
            </div>

            {/* ===== STATS ===== */}
            <div className="grid grid-cols-4 gap-4">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">{stat.label}</span>
                            {stat.icon}
                        </div>
                        <p className="text-2xl font-bold mt-2 text-white">{stat.value}</p>
                        {stat.change && (
                            <p className={`text-xs mt-1 flex items-center gap-1 ${stat.change.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {stat.change.includes('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.change}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* ===== CHARACTER + LEADERBOARD + NEWS ===== */}
            <div className="grid grid-cols-3 gap-6">
                {/* Character Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-black text-white">
                            {character.name[0] || "?"}
                        </div>
                        <div>
                            <p className="font-bold text-white">{character.name}</p>
                            <p className="text-xs text-gray-400">Job: {character.job}</p>
                        </div>
                        <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Active
                        </span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Bank</span>
                            <span className="font-bold text-green-400">${character.bank.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Level</span>
                            <span className="font-bold text-white">{character.level}</span>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Progress</span>
                                <span>{Math.round(character.xpPercent)}% - {character.xp.toLocaleString()}/{character.maxXp.toLocaleString()}XP</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(character.xpPercent, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-4 bg-white/10 border border-white/20 rounded-xl py-2 text-sm font-bold text-white hover:bg-white/20 transition">
                        Manage Character
                    </button>
                </div>

                {/* Leaderboard */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-white">Top Players</h3>
                        <span className="text-xs text-cyan-400 flex items-center gap-1">
                            <TrendingUp size={12} />
                            This Week
                        </span>
                    </div>
                    <div className="space-y-3">
                        {leadersData.length > 0 ? (
                            leadersData.map((player) => (
                                <div key={player.rank} className="flex items-center gap-3">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${player.rank === 1 ? 'bg-yellow-500/30 text-yellow-400' :
                                            player.rank === 2 ? 'bg-gray-400/30 text-gray-300' :
                                                player.rank === 3 ? 'bg-orange-500/30 text-orange-400' :
                                                    'bg-white/10 text-gray-400'
                                        }`}>
                                        {player.rank}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                        {player.name[0] || "?"}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-white">{player.name}</p>
                                        <p className="text-xs text-gray-400">{player.username}</p>
                                    </div>
                                    <span className="text-xs text-cyan-400">{player.xp}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 py-4">
                                <p>No players yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Latest News */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-white">Latest News</h3>
                        <button className="text-xs text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1">
                            View All <ChevronRight size={14} />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {newsData.length > 0 ? (
                            newsData.slice(0, 4).map((item, index) => {
                                const IconComponent = getNewsIcon(item.icon);
                                return (
                                    <div key={index} className="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 transition">
                                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                            {IconComponent}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-white">{item.title}</p>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <Clock size={10} />
                                                {item.date}
                                            </p>
                                        </div>
                                        {index === 0 && (
                                            <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">UPDATE</span>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center text-gray-400 py-4">
                                <p>No news available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== BOTTOM SECTIONS ===== */}
            <div className="grid grid-cols-3 gap-6">
                {/* Follow Us / Discord */}
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold mb-4 text-white">Follow Us</h3>
                    <div className="space-y-3">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-indigo-400/50 transition cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <Disc size={20} className="text-indigo-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-white">Join Our Discord</p>
                                    <p className="text-xs text-gray-400">Be part of the IceRP family</p>
                                </div>
                                <button className="bg-indigo-500 px-4 py-1.5 rounded-lg text-sm font-bold text-white hover:bg-indigo-400 transition">
                                    Join Now
                                </button>
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-400/50 transition cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                    <HelpCircle size={20} className="text-cyan-400" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-white">Support Center</p>
                                    <p className="text-xs text-gray-400">We are here to help you</p>
                                </div>
                                <button className="bg-cyan-500 px-4 py-1.5 rounded-lg text-sm font-bold text-white hover:bg-cyan-400 transition">
                                    Create Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-4 flex items-center gap-1">
                        <Users size={12} />
                        100,000+ Members
                    </p>
                </div>

                {/* Quick Links */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                        <BarChart3 size={18} className="text-cyan-400" />
                        Quick Links
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { icon: <Shield size={14} />, label: "Rules" },
                            { icon: <Users size={14} />, label: "Community" },
                            { icon: <Store size={14} />, label: "Store" },
                            { icon: <Headphones size={14} />, label: "Support" },
                            { icon: <MessageSquare size={14} />, label: "Forum" },
                            { icon: <Trophy size={14} />, label: "Leaderboards" }
                        ].map((item) => (
                            <button key={item.label} className="bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 text-sm transition text-left flex items-center gap-2 text-white">
                                <span className="text-cyan-400">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Server Info */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                        <Server size={18} className="text-cyan-400" />
                        Server Info
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                            <span className="text-gray-400">Status</span>
                            <span className="text-green-400 flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Online
                            </span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                            <span className="text-gray-400">Uptime</span>
                            <span className="font-medium text-white">{stats.serverUptime}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                            <span className="text-gray-400">Players</span>
                            <span className="font-medium text-white">{stats.playersOnline}/{stats.maxPlayers}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                            <span className="text-gray-400">Version</span>
                            <span className="text-cyan-400 font-medium">v4.2.1</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}