"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const handleEmailSend = async () => {
    try {
      if (email !== "") {
        await axios.post("/api/users/forgetPassword", { email });
        setEmailSent(true);
      }
    } catch (error: unknown) {
      const errorMessage = (error as any).response?.data?.error || "An error occurred";
      console.log(errorMessage);
      toast.error(errorMessage);
      setEmail("");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {emailSent ? (
        <p>Check your Email</p>
      ) : (
        <>
          <h1 className="text-3xl">Forgot Password</h1>
          <h2>Send me an Email</h2>

          <input
            className="border-2 border-gray-300"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleEmailSend}
            className="bg-orange-500 px-4 py-2 mt-4"
          >
            Send
          </button>
        </>
      )}
    </div>
  );
}
