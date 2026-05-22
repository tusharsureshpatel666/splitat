"use client"
import React, { useEffect, useState } from 'react'
import StoreListAlso from '../../components/StoreListAlso';
import { useParams } from 'next/navigation';
import axios from 'axios';

const Audiencepage = () => {
    const params = useParams();
    const id = params.id;
    const [store, setStore] = useState({});
    useEffect(() => {
      const res = async () => {
        const data1 = await axios.post("/api/getstoreanybyid", { id });
        console.log(data1.data);
        setStore(data1.data);
      };
      res();
    }, [id]);
  return (
    <div className="md:px-5 px-2 py-5 w-full">
   

      <StoreListAlso
        lat={Number(store.latitude)}
        log={Number(store.longitude)}
      />
    </div>
  );
}

export default Audiencepage;