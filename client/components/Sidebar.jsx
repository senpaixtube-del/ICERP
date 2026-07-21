"use client";


import Link from "next/link";
import { useEffect, useState } from "react";

import {
    LayoutDashboard,
    Users,
    Ticket,
    Settings
} from "lucide-react";


import { getUser } from "@/lib/auth";



export default function Sidebar() {


    const [user, setUser] = useState(null);



    useEffect(() => {

        setUser(getUser());

    }, []);



    const isAdmin =
        user &&
        [
            "founder",
            "owner",
            "manager"
        ].includes(user.role);




    return (

        <aside className="
w-64
min-h-screen
bg-gray-950
border-r
border-gray-800
p-6
text-white
">


            <h1 className="
text-2xl
font-bold
mb-8
">
                ICERP 👑
            </h1>



            <nav className="space-y-3">


                <Menu
                    href="/dashboard"
                    icon={<LayoutDashboard size={20} />}
                    text="Dashboard"
                />



                <Menu
                    href="/dashboard/tickets"
                    icon={<Ticket size={20} />}
                    text="Tickets"
                />




                {
                    isAdmin && (

                        <Menu
                            href="/admin/users"
                            icon={<Users size={20} />}
                            text="User Management"
                        />

                    )

                }




                <Menu
                    href="/dashboard/settings"
                    icon={<Settings size={20} />}
                    text="Settings"
                />



            </nav>


        </aside>


    );


}




function Menu({
    href,
    icon,
    text
}) {


    return (

        <Link

            href={href}

            className="
flex
items-center
gap-3
p-3
rounded-lg
text-gray-300
hover:bg-gray-800
hover:text-white
transition
"

        >


            {icon}

            {text}


        </Link>

    );


}