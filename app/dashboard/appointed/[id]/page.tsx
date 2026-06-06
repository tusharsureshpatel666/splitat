"use client"
import React from 'react'
import AppointmentStep from '../components/AppointmentStep'
import { useParams } from 'next/navigation'

const Appopage = () => {
    const id =  useParams()
    console.log(id)

    
  return (
    <div className='w-full'>
       <AppointmentStep id={id.id}/>
    </div>
  )
}

export default Appopage