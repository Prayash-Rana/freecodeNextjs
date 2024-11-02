"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";



export default function verifyEmailPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] =useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password === confirmPassword){
      try {
        await axios.post("/api/users/resetPassword", { token,password });
  
        setVerified(true);
      toast.success("new password saved successfully");
      router.push("/login");


      } catch (error: any) {
        setError(true);
        console.log(error.response.data);
        // alert(error.response.data.error || "An error occurred");
      toast.error(error.response.data.error || "An error occured");

      }
    }
    else{
      toast.error("password & confirm password does not matched");

    }
  }

 

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);



  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl">Reset Password</h1>
      <label htmlFor="">New Password</label>
      <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} />

      <label htmlFor="">Retype new password</label>
      <input type="password" name="password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />

      
      <button onClick={handleSubmit} className="bg-green-500 px-4 py-2 mt-4">Submit</button>
      
    </div>
  );
}
