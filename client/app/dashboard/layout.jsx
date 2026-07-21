import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";


export default function DashboardLayout({ children }) {


    return (

        <div className="flex min-h-screen bg-black">


            <Sidebar />


            <div className="flex-1">

                <Navbar />


                <main className="p-8 text-white">

                    {children}

                </main>


            </div>


        </div>

    );

}