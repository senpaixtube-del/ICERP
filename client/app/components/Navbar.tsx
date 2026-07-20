import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full bg-[#05070D] border-b border-cyan-500/20 px-8 py-5 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="text-3xl font-bold text-cyan-400">
                ❄️ ICERP
            </Link>


            {/* Menu */}
            <div className="flex gap-6 text-gray-300">

                <Link
                    href="/"
                    className="hover:text-cyan-400 transition"
                >
                    Home
                </Link>


                <Link
                    href="/rules"
                    className="hover:text-cyan-400 transition"
                >
                    Rules
                </Link>


                <Link
                    href="/tickets"
                    className="hover:text-cyan-400 transition"
                >
                    Ticket
                </Link>


                <Link
                    href="/store"
                    className="hover:text-cyan-400 transition"
                >
                    Store
                </Link>


            </div>


            {/* Account */}
            <div className="flex gap-3">

                <Link
                    href="/login"
                    className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
                >
                    Login
                </Link>


                <Link
                    href="/register"
                    className="px-5 py-2 rounded-xl bg-cyan-400 text-black hover:bg-cyan-300 transition"
                >
                    Register
                </Link>


            </div>


        </nav>
    );
}