import React from "react";
import { Radar } from "react-chartjs-2";

export default function map() {
  // displayName: "RadarExample";
  const data = {
    labels: [
      "Motivation taking responsibility",
      "Managing money staff",
      "Social networks relationships",
      "Self care living skills staff",
      "Score drug alcohol misuse",
      "Physical health staff",
      "Emotional mental health staff",
      "Meaningful use time staff",
      "Managing tenancy accommodation staff",
      "Offending staff"
    ],
    datasets: [
      {
        label: "",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,99,132,1)",
        data: [28, 48, 40, 19, 96, 27, 100, 34, 56, 69]
      }
    ]
  };
  return (
    <div>
      <h2>Radar Example</h2>
      <Radar data={data} />
    </div>
  );
}
