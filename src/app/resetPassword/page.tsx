"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();

  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await axios.post("/api/users/resetPassword", { token, password });
        setVerified(true);
        toast.success("New password saved successfully");
        router.push("/login");
      } catch (error: any) {
        setError(true);
        console.log(error.response.data);
        toast.error(error.response.data.error || "An error occurred");
      }
    } else {
      toast.error("Password & confirm password do not match");
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl">Reset Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label htmlFor="password">New Password</label>
        <input 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <label htmlFor="confirmPassword">Retype New Password</label>
        <input 
          type="password" 
          name="confirmPassword" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />

        <button type="submit" className="bg-green-500 px-4 py-2 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default VerifyEmailPage;
