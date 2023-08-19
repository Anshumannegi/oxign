"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  isSubscribed: boolean;
}

export default function PrivateRoute({ children }: any) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/users/me");
        setUser(res.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user, "check user admin");
      if (user?.isAdmin) {
        console.log(user?.isAdmin, "yes");
        router.push("/admin");
      } else {
        console.log(user?.isAdmin, "No");
        router.push("/");
      }
    }
  }, [user]);


  return user?.isAdmin ? <>{children}</> : null;

  // return null;

  {
    /* {user ? {children} : router.push('/')} */
  }
  {
    /* {children} */
  }
}
