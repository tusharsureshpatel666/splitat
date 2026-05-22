"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import StoreListAlso from '../../components/StoreListAlso'
import Compition from '../../components/Compition'

const Compage = () => {
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
    <div className="md:px-5 px-2 py-5 w-full">
      <Compition
        lat={Number(store.latitude)}
        lng={Number(store.longitude)}
        bussinessType={store.businessType}
      />
    </div>
  );
}

export default Compage