"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../component/Loader";


interface User {
    username: string;
    email: string;
    _id: number;
  }

const MyAppointments = () => {
   
  
    const [UserDetail, setUserDetail] = useState<User | null>(null); 
    const [allAppointment, setAllAppointment] = useState([]);
    const [serialNo, setSerialNo] = useState(0);
    const [checkData, setCheckData] = useState(0);
    const [loader, setLoader] = useState(true);
    
    useEffect(()=>{
        getUserDetails();
        getAllAppointments();
    },[])

    const getUserDetails = async() =>{  
       const UserDetailsResponse = await axios.get("/api/users/me");
       setUserDetail(UserDetailsResponse.data.data);
    //    console.log(UserDetailsResponse,"User");
     }

     const getAllAppointments = async() => {
         setLoader(true);
        const allAppointmentResponse = await axios.get("/api/getAllAppointments");
        setLoader(false);
        setAllAppointment(allAppointmentResponse.data);
        // console.log(allAppointmentResponse,"appointment");
     }

     if(loader === true){
      return <Loader/>
     }
         
     else{
    return(

        <div className="flex flex-col overflow-x-auto w-full h-[100vh]">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Serial Number
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Patient Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Test Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Test Destination
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>

                 {allAppointment.map((appointment: any) => {
                    if(appointment?.patientId === UserDetail?._id){
                        // setSerialNo(serialNo+1);
                        setCheckData(1);
                        
                      return (
                        // dark:border-neutral-500
                        <tr
                          key={appointment._id}
                          className="border-b border-slate-300"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {serialNo}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.patientName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.date.slice(0,10).replace(/-/g,'/')}
                           
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.date.slice(10,24)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.address}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.phoneNumber}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testDestination}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment.testPrice}
                          </td> 
                        </tr>
                      );          
                    }           
                  })}

                  {
                    checkData === 0 ? "No Data Found": ""
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
    }
    
}


export default MyAppointments;