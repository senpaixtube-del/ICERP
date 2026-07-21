"use client";

import { useEffect, useRef } from "react";


export default function Reveal({ children, className = "" }) {


    const ref = useRef();


    useEffect(() => {


        const observer = new IntersectionObserver(

            ([entry]) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            },

            {
                threshold: 0.15
            }

        );


        if (ref.current) {

            observer.observe(ref.current);

        }


        return () => {

            if (ref.current) {

                observer.unobserve(ref.current);

            }

        };


    }, []);



    return (

        <div
            ref={ref}
            className={`section ${className}`}
        >

            {children}

        </div>

    );

}