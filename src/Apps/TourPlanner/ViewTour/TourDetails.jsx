import { memo, useContext } from "react";
import { ViewTourContext } from "./ViewTour";
import { CardBody, Card } from "../../../Shared";
import moment from "moment";
import CardHeader from "../../../Shared/Card/CardHeader";
import Tabs, { PlainTab } from "../../../Shared/Tabs/Tabs";
import Gmap from "../../../Shared/Gmap/Gmap";
import DestinationMap from "../DayPlan/DestinationMap";
const DayPlanCard = memo(({ dayPlan }) => {
  const { destination, fromDate, toDate, hotelDetails, contactDetails } =
    dayPlan;
  return (
    <Card>
      <CardHeader>{`${destination} (${moment(fromDate).format(
        "DD/MM/YYYY"
      )} - ${moment(toDate).format("DD/MM/YYYY")})`}</CardHeader>
      <CardBody>
        <Tabs skipSteps={true}>
          <PlainTab header="Details">
            <fieldset>
              <legend>Hotel Details</legend>
              <section>
                <div className="key-value-entity">
                  <label>Name</label>
                  <span>{hotelDetails?.name}</span>
                </div>
                <div className="key-value-entity">
                  <label>Number</label>
                  <span>{hotelDetails?.number}</span>
                </div>
                <div className="key-value-entity">
                  <label>Email</label>
                  <span>{hotelDetails?.email}</span>
                </div>
                <div className="key-value-entity">
                  <label>Address</label>
                  <span>{hotelDetails?.address}</span>
                </div>
              </section>
            </fieldset>
            <fieldset>
              <legend>Contact Details</legend>
              <section>
                <div className="key-value-entity">
                  <label>Name</label>
                  <span>{contactDetails?.name}</span>
                </div>
                <div className="key-value-entity">
                  <label>Number</label>
                  <span>{contactDetails?.mobile}</span>
                </div>
                <div className="key-value-entity">
                  <label>Email</label>
                  <span>{contactDetails?.email}</span>
                </div>
                <div className="key-value-entity">
                  <label>Address</label>
                  <span>{contactDetails?.address}</span>
                </div>
              </section>
            </fieldset>
          </PlainTab>
          <PlainTab header="Expenses"></PlainTab>
          <PlainTab header="Images"></PlainTab>
          <PlainTab header="Location">
            <DestinationMap />
          </PlainTab>
        </Tabs>
      </CardBody>
    </Card>
  );
});

export default function TourDetails() {
  const tourDetails = useContext(ViewTourContext);
  if (!tourDetails) return null;
  const { name, fromDate, toDate, dayPlans } = tourDetails;
  return (
    <div className="tour-basic-details">
      <section className="day-plans">
        {dayPlans?.map((dayPlan) => (
          <div>
            <DayPlanCard key={dayPlan.destination} dayPlan={dayPlan} />
          </div>
        ))}
      </section>
    </div>
  );
}
