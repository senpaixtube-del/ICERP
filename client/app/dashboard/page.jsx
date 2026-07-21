"use client";


import {
    Users,
    Ticket,
    DollarSign,
    ShieldCheck,
    Activity
} from "lucide-react";


export default function Dashboard() {


    return (

        <div className="text-white">


            <h1 className="
            text-4xl
            font-bold
            mb-8
            ">
                Welcome to ICERP 👑
            </h1>



            <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            ">


                <Card
                    title="Users"
                    value="124"
                    icon={<Users />}
                />


                <Card
                    title="Tickets"
                    value="36"
                    icon={<Ticket />}
                />


                <Card
                    title="Revenue"
                    value="$8,420"
                    icon={<DollarSign />}
                />


            </div>



            <div className="
            mt-8
            bg-gray-900
            border
            border-gray-800
            rounded-xl
            p-6
            ">


                <div className="
                flex
                items-center
                gap-3
                mb-4
                ">

                    <ShieldCheck className="text-green-400" />

                    <h2 className="
                    text-xl
                    font-bold
                    ">
                        System Status
                    </h2>

                </div>



                <div className="
                flex
                items-center
                gap-2
                text-green-400
                ">

                    <Activity size={18} />

                    All systems operational

                </div>


            </div>


        </div>

    );

}




function Card({
    title,
    value,
    icon
}) {


    return (

        <div className="
        bg-gray-900
        border
        border-gray-800
        rounded-xl
        p-6
        hover:border-gray-600
        transition
        ">


            <div className="
            flex
            justify-between
            items-center
            ">


                <p className="
                text-gray-400
                ">
                    {title}
                </p>


                <div className="
                text-gray-300
                ">
                    {icon}
                </div>


            </div>



            <h2 className="
            text-3xl
            font-bold
            mt-4
            ">

                {value}

            </h2>



        </div>

    );

}