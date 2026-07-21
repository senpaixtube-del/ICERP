import Link from "next/link";
import {
    Shield,
    Users,
    Ticket,
    CreditCard,
    Gamepad2,
    Crown,
    ArrowRight,
    CheckCircle,
    Server,
    Zap
} from "lucide-react";


export default function Home() {


    return (

        <main className="min-h-screen bg-black text-white">


            {/* HERO */}

            <section className="
      relative
      overflow-hidden
      py-24
      px-6
      ">


                <div className="
        absolute
        inset-0
        bg-gradient-to-br
        from-yellow-500/20
        via-transparent
        to-black
        " />


                <div className="
        relative
        max-w-6xl
        mx-auto
        text-center
        ">


                    <div className="
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
          ">

                        <Crown className="text-yellow-400" />

                        ICERP RolePlay System

                    </div>



                    <h1 className="
          text-6xl
          font-black
          tracking-tight
          ">

                        Welcome To

                        <span className="
            block
            text-yellow-400
            mt-3
            ">
                            ICERP 👑
                        </span>

                    </h1>



                    <p className="
          mt-8
          text-gray-400
          text-xl
          max-w-3xl
          mx-auto
          ">

                        Professional RolePlay Management Platform.
                        Manage users, tickets, payments and staff
                        from one powerful dashboard.

                    </p>



                    <div className="
          flex
          justify-center
          gap-5
          mt-10
          ">


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
            border-gray-700
            px-8
            py-4
            rounded-xl
            font-bold
            hover:bg-gray-900
            transition
            "
                        >

                            Login

                        </Link>


                    </div>


                </div>


            </section>





            {/* FEATURES */}


            <section className="
      max-w-6xl
      mx-auto
      px-6
      py-20
      ">


                <h2 className="
        text-4xl
        font-bold
        text-center
        mb-12
        ">

                    ICERP Features

                </h2>




                <div className="
        grid
        md:grid-cols-3
        gap-6
        ">


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






            {/* STATS */}


            <section className="
      border-t
      border-gray-900
      py-16
      ">


                <div className="
        max-w-5xl
        mx-auto
        grid
        md:grid-cols-3
        gap-8
        text-center
        ">


                    <Stat
                        number="10K+"
                        text="Users"
                    />


                    <Stat
                        number="99%"
                        text="Uptime"
                    />


                    <Stat
                        number="24/7"
                        text="Support"
                    />


                </div>


            </section>






            {/* FOOTER */}


            <footer className="
      border-t
      border-gray-900
      py-8
      text-center
      text-gray-500
      ">

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

        <div className="
bg-gray-900
border
border-gray-800
rounded-2xl
p-6
hover:border-yellow-500/50
transition
">


            <div className="
text-yellow-400
mb-4
">

                {icon}

            </div>



            <h3 className="
text-xl
font-bold
mb-2
">

                {title}

            </h3>



            <p className="
text-gray-400
">

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

            <h3 className="
text-5xl
font-black
text-yellow-400
">

                {number}

            </h3>


            <p className="
text-gray-400
mt-2
">

                {text}

            </p>


        </div>

    );


}