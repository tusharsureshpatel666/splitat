"use client"
import StoreDesc from '@/app/dashboard/components/StoreDesc'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MapShowerAlso } from '../components/MapShpw'



const Storepage = () => {
  const params = useParams()
  const id = params.id
  const [store, setStore] = useState({})
  useEffect(() => {
     const res = async() => {
      const data1 = await axios.post("/api/getstoreanybyid", {id})
      console.log(data1.data)
      setStore(data1.data)
      
     }
     res()
    
  }, [id])
  return (
    <div className="flex flex-col w-full gap-2 px-6 py-5">
      {/* <div className="max-w-6xl w-full">
        {store?.latitude && store?.longitude && (
          <MapShowerAlso
            lat={Number(store.latitude)}
            log={Number(store.longitude)}
          />
        )}
      </div> */}
      {/* <StoreListAlso
        lat={Number(store.latitude)}
        log={Number(store.longitude)}
      /> */}

      <h1 className="text-xl md:text-2xl">Store Analytics</h1>

      <div className="w-full">
      
       
      
      </div>
    </div>
  );
}

export default Storepage