"use client"
import { useParams } from "next/navigation";


const FindstepFirst = () => {
  const params = useParams();
  const id = params.id;
  

 
  


  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl md:text-2xl lg:text-2xl">
        Choose Store Share Type
      </h1>
      

    </div>
  );
};

export default FindstepFirst;
