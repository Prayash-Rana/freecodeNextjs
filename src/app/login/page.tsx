"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    try {
      const response = await axios.post("/api/users/login", user);
  
      if (response.status === 200) {
        toast.success("Login successful!");
        setUser({ email: "", password: "" });
        router.push("/profile");
      }
    } catch (error: unknown) {
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.error
          : "An error occurred";
      console.log(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsFormValid(user.email.length > 0 && user.password.length > 0);
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-6">Log In</h1>

      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <div className="flex flex-col mb-4">
        <label htmlFor="password" className="mb-1">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          className="p-2 border rounded-md"
        />
      </div>

      <button
        className={`bg-green-500 text-white px-4 py-2 rounded-lg ${
          !isFormValid ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSubmit}
        disabled={!isFormValid || loading}
      >
        {loading ? "Logging in..." : "Log In"}
      </button>

      <Link href="/signup" className="mt-4 text-blue-500 underline">
        Sign Up
      </Link>
    </div>
  );
};

export default LoginPage;
