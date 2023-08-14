/* eslint-disable react-hooks/exhaustive-deps */
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
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loader, setLoader] = useState(true);

    
    useEffect(()=>{
        getUserDetails();
        getAllAppointments();
    },[])

    useEffect(() => {
      getFilteredAppoinements();
    }, [filteredAppointments])
    

    const getUserDetails = async() =>{  
       const UserDetailsResponse = await axios.get("/api/users/me");
       setUserDetail(UserDetailsResponse?.data?.data);
    //    console.log(UserDetailsResponse,"User");
     }

     const getAllAppointments = async() => {
         setLoader(true);
        const allAppointmentResponse = await axios.get("/api/getAllAppointments");
        setLoader(false);
        setAllAppointment(allAppointmentResponse?.data);
        // console.log(allAppointmentResponse,"appointment");
     }

     const getFilteredAppoinements = async() => {
      setFilteredAppointments(allAppointment?.filter((appointment:any) => (appointment?.patientId === UserDetail?._id)));
    }

     
  function convertToIndianTimeAndBeautify(utcDateString: any) {
    const utcDate = new Date(utcDateString);
    const options: Intl.DateTimeFormatOptions =  {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return utcDate.toLocaleString('en-IN', options);
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
                      Date & Time
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
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>

                 {/* {allAppointment?.map((appointment: any) => {
                    if(appointment?.patientId === UserDetail?._id){
                        
                      return (
                        <tr
                          key={appointment?._id}
                          className="border-b border-slate-300"
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {serialNo}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment?.patientName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {convertToIndianTimeAndBeautify(appointment?.date)}
                           
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment?.testName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment?.address}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment?.phoneNumber}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment?.testDestination}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {appointment?.testPrice}
                          </td> 
                        </tr>
                      );          
                    }           
                  })} */}


{filteredAppointments?.length === 0 ? (
  <tr>
    <td className="text-center py-4">
      No data found
    </td>
  </tr>
) : (
  filteredAppointments?.map((appointment: any, index) => (
    <tr key={appointment?._id} className="border-b border-slate-300">
      <td className="whitespace-nowrap px-6 py-4 font-medium">
        {index + 1}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {appointment?.patientName}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {convertToIndianTimeAndBeautify(appointment?.date)}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {appointment?.testName}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {appointment?.address}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {appointment?.phoneNumber}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {appointment?.testDestination}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        {appointment?.testPrice}
      </td>

      {
           appointment.date <
           new Date().toJSON().slice(0, 24).replace(/-/g, "-") ? (
         <td className="whitespace-nowrap px-6 py-4 font-medium">
         Missed
         </td> 
           ) : (appointment.isCompleted ? (
            <td className="whitespace-nowrap px-6 py-4 font-medium">
            Completed
            </td> 
           ): (
            <td className="whitespace-nowrap px-6 py-4 font-medium">
            Pending
            </td> 
           ))
      }
    </tr>
  ))
)}



                  {/* {
                    checkData === 0 ? "No Data Found": ""
                  } */}
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