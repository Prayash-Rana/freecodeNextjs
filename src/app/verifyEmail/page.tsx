"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyEmailPage: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error) {
      setError(true);
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data); // Only accesses response if error is an AxiosError
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]); // Ensure token is in the dependency array

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl">Verify Email</h1>
      <h2 className="bg-orange-500 p-2 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2>Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2>Error occurred</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailPage;
