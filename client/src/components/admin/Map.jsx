import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ handleMapClick }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={{ lat: 0, lng: 0 }}
        zoom={2}
        onClick={handleMapClick} // Call the function passed from ParentComponent
      ></GoogleMap>
    </LoadScript>
  );
};

export default Map;
