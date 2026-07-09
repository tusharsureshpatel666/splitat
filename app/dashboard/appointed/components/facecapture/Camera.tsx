"use client";

import Webcam from "react-webcam";

interface Props {
    webcamRef:any;
}

export default function Camera({
    webcamRef
}:Props){

    return(

        <Webcam

            ref={webcamRef}

            mirrored

            audio={false}

            screenshotFormat="image/jpeg"

            className="absolute inset-0 w-full h-full object-cover"

            videoConstraints={{
                facingMode:"user"
            }}

        />

    )

}