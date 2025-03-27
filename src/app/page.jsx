'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedInUser");
    if (!isLoggedIn) {
      router.push("/auth/login");
    } else {
      router.push("/dashboard")
    }
  }, []);

  return null;
}
