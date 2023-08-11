"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Suscribe() {
  const [user, setUser] = useState([]);
  const [sub, setSub] = useState([]);
  useEffect(() => {
    async function fetchCheckout() {
      try {
        const res = await axios.get("/api/allUsers");
        console.log(res.data ,'hii');
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
    fetchCheckout();
    Subscribe();
  }, []);

  const Subscribe = () => {
    console.log("yes");
    const subscribeUser = user.map((check: any) => {
      console.log(user, 'prakash');
      return check?.isSubscribed == false;
    });
    console.log(subscribeUser);
  };
  return (
    <>
      {sub.map((item: any, index) => {
        return (
          <>
            <p>subcribe</p>
            <p>{item.username}</p>
          </>
        );
      })}
    </>
  );
}
