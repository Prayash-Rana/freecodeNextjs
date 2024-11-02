"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function forgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [emailSend, setEmailSend] = useState(false);

  const handleEmailSend = async () => {
    try {
      if (email !== "") {
        await axios.post("/api/users/forgetPassword", { email });

        setEmailSend(true);
      }
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data.error);
      setEmail("")
    }
  };

 

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {emailSend ? (
        <p>Check your Email</p>
      ) : (
        <>
          <h1 className="text-3xl">Forgetting Password</h1>
          <h2>Send me an Email</h2>

          <input
            className="border-2 border-gre"
            type="email"
            name="email"
            value={email}
            id=""
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleEmailSend}
            className="bg-orange-500 px-4 py-2 mt-4"
          >
            send
          </button>
        </>
      )}
    </div>
  );
}
