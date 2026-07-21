"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { jwtDecode } from "jwt-decode";


export default function AdminMenu() {

    const [allowed, setAllowed] = useState(false);


    useEffect(() => {

        const token = localStorage.getItem("token");


        if (!token) return;


        try {

            const user = jwtDecode(token);


            const roles = [
                "founder",
                "owner",
                "manager"
            ];


            if (roles.includes(user.role)) {
                setAllowed(true);
            }


        } catch (e) {

            console.log(e);

        }


    }, []);



    if (!allowed) {
        return null;
    }



    return (

        <Link
            href="/admin"
            className="
            flex
            items-center
            gap-3
            text-yellow-400
            hover:text-yellow-300
            "
        >

            <Shield size={20} />

            Admin Panel

        </Link>

    );

}