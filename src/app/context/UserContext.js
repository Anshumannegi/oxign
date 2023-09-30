"use client"

import axios from 'axios';
// import {createContext} from "react";

// export const GlobalContext = createContext(null);

// export default function GlobalState({children}){
//     return(
//         <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
//     )
// }


// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface UserContextProps {
//   children?: ReactNode;
// }

// const UserContext = createContext<{ userCheck: any | null; setUser: any } | undefined>(undefined);

// export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
//   const [userCheck, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ userCheck, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };


import React, { createContext, useState, useEffect } from 'react';
export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [checkUser, setCheckUser] = useState(null);
    // const [checkUser, setCheckUser] = useState<User | null>(null);

    const callUser = async () => {
        try {
            // Fetch user data from your API
            const res = await axios.get("/api/users/me");
             setCheckUser(res.data.data);
          } catch (error) {
            // Handle errors here
            console.error("Error fetching user data:", error);
          }    
    }
   
    // useEffect(() => {
    //     callUser();
    //   }, []);

    return (
        <UserContext.Provider value={{checkUser,callUser}}>
          {children}
        </UserContext.Provider>
    )
}
