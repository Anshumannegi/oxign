"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from '../context/UserContext';


interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  isSubscribed: boolean;
}

export default function PrivateRoute({ children }: any) {
  const router = useRouter();
  // const [user, setUser] = useState<User | null>(null);
  const { checkUser } = useContext(UserContext);


  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get("/api/users/me");
  //       setUser(res.data.data);
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {

  const pathName = window.location.pathname;

    if (checkUser) {
      console.log(checkUser, "check user admin");
      if (checkUser?.isAdmin) {
        console.log(checkUser?.isAdmin, "yes");
        if(pathName == '/admin'){
        router.push("/admin");
        }
        else if(pathName == '/allAppointments'){
        router.push("/allAppointments");
        }
        else if(pathName == '/addAppointment'){
        router.push("/addAppointment");
        }
        else if(pathName == '/allTestForAdmin'){
        router.push("/allTestForAdmin");
        }
        else if(pathName == '/addLab'){
        router.push("/addLab");
        }
        else if(pathName == '/subscribe'){
        router.push("/subscribe");
        }
      } else {
        console.log(checkUser?.isAdmin, "No");
        router.push("/");
      }
    }
  }, [checkUser]);


  return checkUser?.isAdmin ? <>{children}</> : null;

  // return null;

  {
    /* {user ? {children} : router.push('/')} */
  }
  {
    /* {children} */
  }
}
