"use client";

import React from 'react'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const CheckContext = () => {
    const { checkUser } = useContext(UserContext);
    // const {checkUser, setCheckUser} = useContext(UserContext);
    console.log(checkUser,"this is user abcd");
  return (
    <div>CHeckUser</div>
  )
}

export default CheckContext