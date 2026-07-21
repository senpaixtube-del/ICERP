"use client";

export default function Background() {

    return (

        <div
            className="
        fixed
        inset-0
        z-0
        bg-cover
        bg-center
        bg-no-repeat
        "
            style={{
                backgroundImage: "url('/snow-bg.jpg')"
            }}
        >

            <div
                className="
            absolute
            inset-0
            bg-black/40
            "
            />

        </div>

    );

}