"use client";

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    
    if (authToken) {
      const role = Cookies.get('role');
      console.log("Role:", role);  // Debugging: Check the role value

      if (role === '1') {  // Ensure role is compared as a string
        router.push("/dashboard/staff");
      } else if (role === '2') {
        router.push('/dashboard/admin');
      } else {
        router.push('/login');  // Fallback if role is invalid
      }
    } else {
      router.push("/login");  // Redirect if no authToken
    }
  }, [router]);  // Add router as a dependency

  return (
    <div>Loading...</div>  // Show a loading message while redirecting
  );
}
