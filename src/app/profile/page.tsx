"use client";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message || "Logout failed");
    }


  };

  const handleGetDetails = async () => {
    try {
      const res = await axios.get("/api/users/userDetails");
      console.log(res.data);
      const userId = res.data.data._id;
      setData(userId);
      router.push(`/profile/${userId}`);
    } catch (error: any) {
      console.log(error.message);
      toast.error("Failed to retrieve user details");
    }
  };

  return (
    <div>
      
      <p>Profile Page</p>
      <button onClick={handleGetDetails} className="bg-purple-400 px-4 py-1 rounded-md">
        User Details
      </button>
      <br />
      <button onClick={handleLogout} className="bg-blue-400 my-2 px-4 py-1 rounded-md">
        Logout
      </button>
    </div>
  );
};

export default Page;
