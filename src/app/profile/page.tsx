"use client";
import axios from "axios";
import toast from "react-hot-toast";
import React from 'react';  // You can keep React import for hooks
import { useRouter } from "next/navigation";

// Define a type for the expected user details response
interface UserDetailsResponse {
  data: {
    _id: string;
    // Add other user properties as needed
  };
}

const Page: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message || "Logout failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleGetDetails = async () => {
    try {
      const res = await axios.get<UserDetailsResponse>("/api/users/userDetails");
      console.log(res.data);
      const userId = res.data.data._id; // Access userId from response data
      router.push(`/profile/${userId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Failed to retrieve user details");
      } else {
        toast.error("An unexpected error occurred");
      }
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
