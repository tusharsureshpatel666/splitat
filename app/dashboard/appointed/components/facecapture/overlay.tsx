"use client";

interface Props{

    aligned:boolean

}

export default function Overlay({

    aligned

}:Props){

    return(

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

            <div
                className={`

                w-72

                h-72

                rounded-full

                border-[7px]

                transition-all

                duration-300

                shadow-[0_0_50px_rgba(0,0,0,.5)]

                ${
                    aligned

                    ? "border-green-500"

                    :"border-red-500"

                }

                `}
            />

        </div>

    )

}