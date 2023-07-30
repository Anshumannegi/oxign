"use client";


import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import Link from 'next/link'

export default function  FeaturedProduct() {

    const [labTests, setLabTests] = useState([]);
    const [filteredLabTests, setFilteredLabTests] = useState([]);

    useEffect(() => {
        async function fetchLabTests() {
          try {
            const response = await axios.get("/api/getAllLabtest");
            setLabTests(response.data);
            setFilteredLabTests(response.data);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching lab tests:");
          }
        }
        fetchLabTests();
      }, []);
    

    return (
          <div>           

              {filteredLabTests.map((test:any)=> (
               test.isFeatured == true ? (
            //   <Card key={test._id} resData={test}  />
           <Card key={test._id} resData={test}  labData ={labTests} />
               ) : (null)
            ))} 
          </div>
    );
}