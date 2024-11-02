"use client"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [data,setData] = useState("nothing");

  const handleLogout = async()=> {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successfully");
      router.push("/login")
    } catch (error: any) {
        console.log(error.message);
        toast.error(error.message)    
    }
  }

  const handleGetDetails = async() => {
    try {
      const res = await axios.get("/api/users/userDetails");
      console.log(res.data);
      const userId = res.data.data._id;
      setData(userId);
      router.push(`/profile/${userId}`);
    } catch (error:any) {
      console.log(error.message)
      
    }
  }
  return (
    <div>
      <p>Profile Page </p>
     

      

      <button onClick={handleGetDetails} className="bg-purple-400 px-4 py-1 rounded-md">user details</button>
      <br />
      <button onClick={handleLogout} className='bg-blue-400 my-2 px-4 py-1 rounded-md'>logout</button>
    </div>
  )
}

export default page
