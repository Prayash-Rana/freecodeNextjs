"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyuserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });

      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyuserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl">Verify Email</h1>
      <h2 className="bg-orange-500 p-2 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2>Email Verified</h2>
          <Link href="/login">login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error occured</h2>
        </div>
      )}
    </div>
  );
}
