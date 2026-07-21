"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Navbar() {


    const [user, setUser] = useState(null);

    const router = useRouter();



    useEffect(() => {

        const token = localStorage.getItem("token");


        if (token) {

            try {

                const decoded = jwtDecode(token);

                setUser(decoded);

            }
            catch (error) {

                console.log(error);

            }

        }


    }, []);




    async function logout() {


        try {

            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
                {
                    method: "POST",
                    credentials: "include"
                }
            );


        } catch (error) {

            console.log(error);

        }



        localStorage.removeItem("token");

        router.push("/login");


    }




    return (

        <header className="
            h-20
            border-b
            border-gray-800
            bg-black
            flex
            items-center
            justify-between
            px-8
            text-white
        ">


            <h2 className="
                text-xl
                font-bold
            ">
                ICERP Dashboard 👑
            </h2>




            <div className="
                flex
                items-center
                gap-5
            ">


                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <User size={22} />


                    <div>

                        <p className="font-bold">

                            {user?.id
                                ? `User #${user.id}`
                                : "Guest"
                            }

                        </p>


                        <p className="
                            text-sm
                            text-gray-400
                        ">

                            {user?.role || "user"}

                        </p>

                    </div>


                </div>



                <button
                    onClick={logout}
                    className="
                    flex
                    items-center
                    gap-2
                    bg-red-600
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-red-700
                    "
                >

                    <LogOut size={18} />

                    Logout

                </button>



            </div>


        </header>

    );

}