import { createRef, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { SearchControl } from "react-leaflet-search";
const InvalidateMapSize = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);

  return null;
};

export default function Gmap({ children }) {
  return (
    <MapContainer
      center={[18.5204, 73.8567]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {children}
      <InvalidateMapSize />
      {/* <SearchControl /> */}
    </MapContainer>
  );
}
