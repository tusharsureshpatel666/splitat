"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import FootfallListAlso from '../../components/footfalllist';
import axios from 'axios';

const FootFallpage = () => {
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
    <div className="md:px-5 w-full md:py-5">
        <h1 className='text-2xl lg:text-2xl px-5 py-5'>Store FootFall</h1>
      <FootfallListAlso
        lat={Number(store.latitude)}
        log={Number(store.longitude)}
      />
    </div>
  );
}

export default FootFallpage