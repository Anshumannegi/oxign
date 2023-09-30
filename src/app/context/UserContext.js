"use client"

import axios from 'axios';



import React, { createContext, useState, useEffect } from 'react';
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [checkUser, setCheckUser] = useState(null);

    const callUser = async () => {
        try {
            // Fetch user data from your API
            const res = await axios.get("/api/users/me");
            console.log(res.data.data,"sj")
             setCheckUser(res.data.data);

             
          } catch (error) {
            // Handle errors here
            console.error("Error fetching user data:", error);
          }    
    }
    useEffect(() => {
      callUser();
  }, []);
  
   

    return (
        <UserContext.Provider value={{checkUser,callUser}}>
          {children}
        </UserContext.Provider>
    )
}
