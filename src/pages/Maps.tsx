import GoogleMap from "../components/GoogleMap";
import React from "react";

export default function Map() {
  const points = [
    {
      lat: 41.5,
      lng: 41.5
    }
  ];
  return (
    <div>
      <GoogleMap points={points} />
    </div>
  );
}
