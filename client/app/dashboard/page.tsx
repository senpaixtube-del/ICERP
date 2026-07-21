"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const router = useRouter();

    const [user, setUser] = useState<any>(null);


    useEffect(() => {

        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");


        if (!token || !savedUser) {
            router.push("/login");
            return;
        }


        setUser(JSON.parse(savedUser));


    }, [router]);



    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        router.push("/login");

    }



    if (!user) {
        return (
            <div className="min-h-screen bg-[#05070D] text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }



    return (

        <main className="min-h-screen bg-[#05070D] text-white p-8">


            <div className="max-w-4xl mx-auto">


                <div className="bg-[#0D1117] border border-cyan-500/20 rounded-2xl p-8">


                    <h1 className="text-4xl font-bold text-cyan-400 mb-4">
                        ❄️ ICERP Dashboard
                    </h1>


                    <p className="text-xl">
                        Welcome, {user.username} 👑
                    </p>


                    <div className="mt-6 bg-black rounded-xl p-5">

                        <p>
                            User ID:
                            <span className="text-cyan-400 ml-2">
                                {user.id}
                            </span>
                        </p>


                        <p>
                            Role:
                            <span className="text-cyan-400 ml-2">
                                {user.role}
                            </span>
                        </p>

                    </div>



                    <button
                        onClick={logout}
                        className="mt-6 bg-red-500 px-6 py-3 rounded-xl font-bold"
                    >
                        Logout
                    </button>


                </div>


            </div>


        </main>

    );
}