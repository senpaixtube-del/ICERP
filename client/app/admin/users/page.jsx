"use client";

import { useEffect, useState } from "react";


const API = process.env.NEXT_PUBLIC_API_URL;


export default function UsersPage(){


    const [users,setUsers] = useState([]);

    const [loading,setLoading] = useState(true);



    async function loadUsers(){


        try{


            const token = localStorage.getItem("token");


            const res = await fetch(
                `${API}/api/admin/users`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );


            const data = await res.json();


            setUsers(data);


        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }


    }




    useEffect(()=>{

        loadUsers();

    },[]);





    async function changeRole(id,role){


        const token = localStorage.getItem("token");



        await fetch(
            `${API}/api/admin/users/${id}/role`,
            {

                method:"PUT",

                headers:{

                    "Content-Type":"application/json",

                    Authorization:`Bearer ${token}`

                },


                body:JSON.stringify({
                    role
                })

            }
        );



        loadUsers();


    }





    async function deleteUser(id){


        const token = localStorage.getItem("token");



        await fetch(
            `${API}/api/admin/users/${id}`,
            {

                method:"DELETE",

                headers:{
                    Authorization:`Bearer ${token}`
                }

            }
        );



        loadUsers();


    }





    if(loading){

        return (
            <div className="text-white">
                Loading...
            </div>
        );

    }





    return (

        <div className="text-white">


            <h1 className="
            text-4xl
            font-bold
            mb-8
            ">
                User Management 👑
            </h1>



            <div className="
            bg-gray-900
            rounded-xl
            border
            border-gray-800
            overflow-hidden
            ">


                <table className="w-full">


                    <thead className="bg-gray-800">

                        <tr>

                            <th className="p-4 text-left">
                                Username
                            </th>

                            <th className="p-4 text-left">
                                Email
                            </th>

                            <th className="p-4 text-left">
                                Role
                            </th>

                            <th className="p-4">
                                Actions
                            </th>

                        </tr>

                    </thead>



                    <tbody>


                    {users.map(user=>(


                        <tr
                        key={user.id}
                        className="
                        border-t
                        border-gray-800
                        "
                        >


                            <td className="p-4">
                                {user.username}
                            </td>


                            <td className="p-4">
                                {user.email}
                            </td>



                            <td className="p-4">


                                <select

                                value={user.role}

                                onChange={(e)=>
                                    changeRole(
                                        user.id,
                                        e.target.value
                                    )
                                }

                                className="
                                bg-black
                                border
                                border-gray-700
                                rounded
                                p-2
                                "

                                >

                                    <option value="user">
                                        user
                                    </option>

                                    <option value="manager">
                                        manager
                                    </option>

                                    <option value="owner">
                                        owner
                                    </option>

                                    <option value="founder">
                                        founder
                                    </option>


                                </select>


                            </td>



                            <td className="p-4 text-center">


                                <button

                                onClick={()=>
                                    deleteUser(user.id)
                                }

                                className="
                                bg-red-600
                                px-4
                                py-2
                                rounded
                                hover:bg-red-700
                                "

                                >

                                    Delete

                                </button>


                            </td>


                        </tr>


                    ))}


                    </tbody>


                </table>


            </div>


        </div>

    );


}