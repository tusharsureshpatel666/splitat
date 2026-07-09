"use client";

interface Props{

    count:number | null

}

export default function Countdown({

    count

}:Props){

    if(count===null) return null;

    return(

        <div className="absolute inset-0 flex items-center justify-center">

            <div className="text-white text-8xl font-bold drop-shadow-xl">

                {count}

            </div>

        </div>

    )

}