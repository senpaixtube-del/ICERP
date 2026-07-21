"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Crown, ArrowRight } from "lucide-react";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");



    // ICE CARD MOUSE LIGHT
    const cardRef = useRef<HTMLDivElement>(null);



    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {


        const rect = cardRef.current?.getBoundingClientRect();


        if (!rect) return;


        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;


        cardRef.current?.style.setProperty(
            "--x",
            `${x}px`
        );


        cardRef.current?.style.setProperty(
            "--y",
            `${y}px`
        );


    };

    // SHAKE CARD ON ERROR
    const shakeCard = () => {

        cardRef.current?.classList.add("shake");

        setTimeout(() => {

            cardRef.current?.classList.remove("shake");

        }, 500);

    };


    async function handleLogin() {

        setLoading(true);
        setMessage("");

        try {


            const res = await fetch(
                "https://icerp.up.railway.app/api/auth/login",
                {

                    method: "POST",

                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email.toLowerCase().trim(),
                        password
                    })

                }
            );



            const data = await res.json();



            if (data.token) {


                localStorage.setItem(
                    "token",
                    data.token
                );


                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );


                setMessage(
                    "Welcome to ICERP 👑"
                );



                setTimeout(() => {

                    router.push("/dashboard");

                }, 800);


            }
            else {


                setMessage(
                    data.message || "Login failed"
                );

                shakeCard();


            }



        }
        catch (error) {


            console.log(error);


            setMessage(
                "Server connection error"
            );

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




            {/* BACKGROUND */}

            <div

                className="
                absolute
                inset-0
                bg-cover
                bg-center
                bg-no-repeat
                "

                style={{
                    backgroundImage:
                        "url('/snowlogin.png')"
                }}

            />





            {/* OVERLAY */}

            <div className="overlay-blur" />







            {/* LOGIN CARD */}

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


                {/* LOGO */}

                <div
                    className="
                    login-logo
                    flex
                    justify-center
                    mb-6
                    "
                >

                    <div
                        className="
                        p-5
                        rounded-full
                        bg-cyan-400/10
                        border
                        border-cyan-300/30
                        "
                    >

                        <Crown
                            size={55}
                            className="
                            text-cyan-300
                            drop-shadow-[0_0_20px_#22d3ee]
                            "
                        />

                    </div>

                </div>



                <div className="ice-content">


                    <h1 className="
                        text-4xl
                        font-black
                        text-center
                        ">

                        ICERP Login ❄️

                    </h1>



                    <p className="
                        text-center
                        text-cyan-100/70
                        mt-3
                        mb-8
                        ">

                        Welcome back to the system

                    </p>





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


                        <Mail className="text-cyan-300" />


                        <input

                            className="
                                ice-input
                                !bg-transparent
                                !border-0
                                !mb-0
                                !h-14
                                "

                            placeholder="Email"

                            value={email}

                            onChange={
                                e => setEmail(e.target.value)
                            }

                        />


                    </div>





                    <div className="
                        flex
                        items-center
                        gap-3
                        bg-black/30
                        border
                        border-white/10
                        rounded-xl
                        px-4
                        ">


                        <Lock className="text-cyan-300" />


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

                            value={password}

                            onChange={
                                e => setPassword(e.target.value)
                            }

                        />


                    </div>





                    <button

                        onClick={handleLogin}

                        disabled={loading}

                        className="ice-button mt-8"

                    >

                        {
                            loading
                                ?
                                <div className="loader"></div>
                                :
                                <>
                                    LOGIN
                                    <ArrowRight className="inline ml-2" />
                                </>
                        }


                    </button>




                    {
                        message &&

                        <p className="ice-message mt-5">

                            {message}

                        </p>

                    }



                    <p className="
                        text-center
                        mt-6
                        text-gray-300
                        ">

                        No account?


                        <Link
                            href="/register"
                            className="
                                ml-2
                                text-cyan-300
                                "
                        >

                            Register

                        </Link>


                    </p>



                </div>


            </div>



        </main >

    );

}