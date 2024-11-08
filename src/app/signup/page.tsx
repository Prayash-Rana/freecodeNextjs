"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface User {
  email: string;
  password: string;
  username: string;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const [buttonShow, setButtonShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>({ email: "", password: "", username: "" });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      if (response.status === 201) {
        console.log("Signup success", response?.data?.message);
        toast.success("Signup successful!");

        setUser({ email: "", password: "", username: "" }); // Reset form
        router.push("/login");
      }
      
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          toast.error("User already exists");
        } else {
          toast.error(error.response.data.message || "Something went wrong!");
        }
      } else {
        toast.error("An unexpected error occurred!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const allFieldsFilled =
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0;
    setButtonShow(allFieldsFilled);
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-2xl text-green-500 font-bold mb-4">
        {loading ? "Processing..." : "Sign Up"}
      </h1>
      <div className="flex flex-col mb-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="border-2 border-black p-2"
          name="username"
          placeholder="Enter username"
          value={user.username}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="border-2 border-black p-2"
          name="email"
          placeholder="Enter email"
          value={user.email}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="flex flex-col mb-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="border-2 border-black p-2"
          name="password"
          placeholder="Enter password"
          value={user.password}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <button
        className={`bg-green-400 px-4 py-1 my-2 rounded-lg ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSubmit}
        disabled={!buttonShow || loading}
      >
        {buttonShow
          ? loading
            ? "Signing up..."
            : "Sign Up"
          : "Fill All Fields"}
      </button>
      <Link href="/login" className="text-blue-400 underline mt-2">
        Already have an account? Login
      </Link>
    </div>
  );
};

export default SignUpPage;
