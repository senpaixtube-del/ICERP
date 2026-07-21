"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Shield,
    Users,
    Ticket,
    CreditCard,
    Crown,
    ArrowRight,
    Server,
    Zap
} from "lucide-react";

import Reveal from "@/components/Reveal";



export default function Home() {

    const [stats, setStats] = useState({
        users: 0,
        online: 0
    });

    useEffect(() => {

        const users =
            JSON.parse(
                localStorage.getItem("users") || "[]"
            );

        setStats({
            users: users.length,
            // فعلا تستی
            online: 0
        });

    }, []);

    return (

        <main
            className="
            min-h-screen
            text-white
            relative
            "
        >


            {/* HERO */}

            <Reveal>

                <section
                    className="
                    relative
                    overflow-hidden
                    py-24
                    px-6
                    "
                >


                    <div
                        className="
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-yellow-500/20
                        via-transparent
                        to-black/70
                        "
                    />


                    <div
                        className="
                        relative
                        max-w-6xl
                        mx-auto
                        text-center
                        "
                    >


                        <div
                            className="
                            inline-flex
                            items-center
                            gap-2
                            bg-yellow-500/10
                            border
                            border-yellow-500/30
                            px-5
                            py-2
                            rounded-full
                            mb-8
                            backdrop-blur-xl
                            "
                        >

                            <Crown className="text-yellow-400" />

                            ICERP RolePlay System

                        </div>




                        <h1
                            className="
                            text-6xl
                            font-black
                            tracking-tight
                            "
                        >

                            Welcome To


                            <span
                                className="
                                block
                                text-yellow-400
                                mt-3
                                "
                            >

                                ICERP 👑

                            </span>


                        </h1>




                        <p
                            className="
                            mt-8
                            text-gray-300
                            text-xl
                            max-w-3xl
                            mx-auto
                            "
                        >

                            Professional RolePlay Management Platform.
                            Manage users, tickets, payments and staff
                            from one powerful dashboard.

                        </p>




                        <div
                            className="
                            flex
                            justify-center
                            gap-5
                            mt-10
                            "
                        >



                            <Link
                                href="/register"
                                className="
                                bg-yellow-500
                                text-black
                                px-8
                                py-4
                                rounded-xl
                                font-bold
                                flex
                                items-center
                                gap-2
                                hover:bg-yellow-400
                                transition
                                "
                            >

                                Create Account

                                <ArrowRight size={20} />

                            </Link>




                            <Link
                                href="/login"
                                className="
                                border
                                border-white/20
                                bg-white/10
                                backdrop-blur-xl
                                px-8
                                py-4
                                rounded-xl
                                font-bold
                                hover:bg-white/20
                                transition
                                "
                            >

                                Login

                            </Link>


                        </div>



                    </div>


                </section>


            </Reveal>






            {/* FEATURES */}


            <Reveal>


                <section
                    className="
                    max-w-6xl
                    mx-auto
                    px-6
                    py-20
                    "
                >



                    <h2
                        className="
                        text-4xl
                        font-bold
                        text-center
                        mb-12
                        "
                    >

                        ICERP Features

                    </h2>





                    <div
                        className="
                        grid
                        md:grid-cols-3
                        gap-6
                        "
                    >


                        <Feature
                            icon={<Users />}
                            title="User Management"
                            text="Control users, roles and permissions."
                        />



                        <Feature
                            icon={<Ticket />}
                            title="Ticket System"
                            text="Professional support ticket management."
                        />



                        <Feature
                            icon={<CreditCard />}
                            title="Payments"
                            text="Track payments and transactions."
                        />



                        <Feature
                            icon={<Shield />}
                            title="Security"
                            text="JWT authentication and protected access."
                        />



                        <Feature
                            icon={<Server />}
                            title="Stable Backend"
                            text="Powered by secure cloud infrastructure."
                        />



                        <Feature
                            icon={<Zap />}
                            title="Fast Dashboard"
                            text="Modern admin control panel."
                        />



                    </div>


                </section>


            </Reveal>








            {/* STATS */}



            <Reveal>


                <section
                    className="
                    border-t
                    border-white/10
                    py-16
                    "
                >


                    <div
                        className="
                        max-w-5xl
                        mx-auto
                        grid
                        md:grid-cols-3
                        gap-8
                        text-center
                        "
                    >



                        <Stat
                            number={`${stats.users}+`}
                            text="Registered Users"
                        />


                        <Stat
                            number={`${stats.online}`}
                            text="Players Online"
                        />


                        <Stat
                            number="99%"
                            text="Server Uptime"
                        />



                    </div>


                </section>


            </Reveal>







            <footer
                className="
                border-t
                border-white/10
                py-8
                text-center
                text-gray-400
                "
            >

                © 2026 ICERP. All rights reserved 👑

            </footer>



        </main>

    );

}








function Feature({
    icon,
    title,
    text
}) {


    return (

        <div
            className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            rounded-2xl
            p-6
            hover:border-yellow-500/50
            transition
            "
        >


            <div
                className="
                text-yellow-400
                mb-4
                "
            >

                {icon}

            </div>




            <h3
                className="
                text-xl
                font-bold
                mb-2
                "
            >

                {title}

            </h3>




            <p
                className="
                text-gray-300
                "
            >

                {text}

            </p>



        </div>

    );

}








function Stat({
    number,
    text
}) {


    return (

        <div>


            <h3
                className="
                text-5xl
                font-black
                text-yellow-400
                "
            >

                {number}

            </h3>


            <p
                className="
                text-gray-300
                mt-2
                "
            >

                {text}

            </p>


        </div>

    );

}