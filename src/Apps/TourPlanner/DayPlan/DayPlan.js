import Tabs, { PlainTab } from "../../../Shared/Tabs/Tabs";
import Gmap from "../../../Shared/Gmap/Gmap";
import React from "react";
import { Card } from "../../../Shared";
import { Marker, Popup } from "react-leaflet";
import TourForm from "./TourForm";
import HotelForm from "./HotelForm";
import ContractPersonForm from "./ContactForm";
import DestinationMap from "./DestinationMap";
export default function DayPlan({ uuid }) {
  const tabMeta = (tabData) => {
    //console.log(tabData);
  };
  return (
    <div className="day-card">
      <Tabs getTabMeta={tabMeta} skipSteps={false}>
        <TourForm header="Tour Details" index={0} uuid={uuid} />
        <ContractPersonForm header="Contact Person" index={1} uuid={uuid} />
        <HotelForm header="Hotel Details" index={2} uuid={uuid} />
        <DestinationMap header="Map" index={3} uuid={uuid} />
      </Tabs>
    </div>
  );
}
