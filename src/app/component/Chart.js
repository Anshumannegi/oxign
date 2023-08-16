"use client";

import { useState, useEffect } from "react";
import { Chart } from "chart.js";
import axios from "axios";

function ChartComponent() {
  const [allAppointments, setAllAppointments] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [missed, setMissed] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const allAppointmentsResponse = await axios.get(
        "/api/getAllAppointments"
      );
      const appointments = allAppointmentsResponse.data;
      console.log(appointments);
      setAllAppointments(appointments);
      calculatePercentage(appointments);
      chartWork();
    }
    fetchData();
  }, [completed, missed, pending]);

  const calculatePercentage = (appointments) => {
    let completedCount = 0;
    let missedCount = 0;
    let pendingCount = 0;
    console.log("calculate");

    appointments.map((appointment) => {
      if (appointment.isCompleted) {
        completedCount++;
      } else if (
        appointment.date < new Date().toJSON().slice(0, 24).replace(/-/g, "-")
      ) {
        missedCount++;
      } else {
        pendingCount++;
      }
    });

    setCompleted(completedCount);
    // console.log(completedCount);
    // console.log(completed);
    setMissed(missedCount);
    // console.log(missedCount);
    // console.log(missed);
    setPending(pendingCount);
    // console.log(pendingCount);
    // console.log(pending);
  };

  const chartWork = () => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Pending", "Missed"],
        datasets: [
          {
            data: [completed, pending, missed],
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
            backgroundColor: [
              "rgb(75, 192, 192 )",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
      },
    });
  };

  return (
    <>
      {/* Doughnut chart */}
      <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">
        Doughnut Chart
      </h1>
      <div className="w-[full] h-3/4 flex justify-center mb-20">
        <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto  shadow-xl pb-2">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
}

export default ChartComponent;
