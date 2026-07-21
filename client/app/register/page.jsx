"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {


    const router = useRouter();


    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });


    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);



    async function register() {


        setLoading(true);
        setMessage("");

        try {


            const res = await fetch(
                "https://icerp.up.railway.app/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(form)
                }
            );



            const data = await res.json();



            if (res.ok) {

                setMessage(
                    "Account created successfully ✅"
                );


                setTimeout(() => {

                    router.push("/login");

                }, 1500);


            } else {


                setMessage(
                    data.message || "Register failed"
                );


            }



        } catch (err) {


            setMessage(
                "Server connection error"
            );


        }


        setLoading(false);

    }





    return (

        <div className="
min-h-screen
bg-black
flex
items-center
justify-center
text-white
">


            <div className="
w-[400px]
bg-gray-900
border
border-gray-800
rounded-xl
p-8
">


                <h1 className="
text-3xl
font-bold
mb-6
text-center
">

                    ICERP Register 👑

                </h1>



                <input

                    className="
w-full
bg-gray-800
p-3
rounded
mb-4
outline-none
"

                    placeholder="Username"

                    onChange={(e) =>

                        setForm({
                            ...form,
                            username: e.target.value
                        })

                    }

                />



                <input

                    className="
w-full
bg-gray-800
p-3
rounded
mb-4
outline-none
"

                    placeholder="Email"

                    type="email"

                    onChange={(e) =>

                        setForm({
                            ...form,
                            email: e.target.value
                        })

                    }

                />




                <input

                    className="
w-full
bg-gray-800
p-3
rounded
mb-6
outline-none
"

                    placeholder="Password"

                    type="password"

                    onChange={(e) =>

                        setForm({
                            ...form,
                            password: e.target.value
                        })

                    }

                />




                <button

                    onClick={register}

                    disabled={loading}

                    className="
w-full
bg-yellow-500
text-black
font-bold
p-3
rounded
hover:bg-yellow-400
"

                >


                    {
                        loading
                            ?
                            "Creating..."
                            :
                            "Create Account"
                    }


                </button>



                <p className="
text-center
mt-5
text-sm
">

                    {message}

                </p>



            </div>


        </div>

    );


}