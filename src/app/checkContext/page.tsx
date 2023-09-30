"use client";

import React from 'react'
import { useContext,useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const CheckContext = () => {
    const { checkUser } = useContext(UserContext);
    console.log(checkUser,"this is user abcd");
   
  return (
    <div>CHeckUser-{checkUser?.username}</div>
  )
}

export default CheckContext