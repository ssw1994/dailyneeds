import Tabs, { PlainTab } from "../../../Shared/Tabs/Tabs";
import { Card, CardBody } from "../../../Shared";
import { createContext, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMyTours, viewTourDetails } from "../../../Store";
import TourDetails from "./TourDetails";
import CardHeader from "../../../Shared/Card/CardHeader";
import moment from "moment";

export const ViewTourContext = createContext(null);

export default function ViewTour() {
  const params = useParams();
  const dispatch = useDispatch();
  const tourDetails = useSelector(viewTourDetails);
  useEffect(() => {
    dispatch(getMyTours({ _id: params.id }));
  }, []);

  console.log(tourDetails);

  const { name, fromDate, toDate } = tourDetails || {};

  return (
    <ViewTourContext.Provider value={tourDetails}>
      <div className="tour-details flex-row-center-items">
        <Card style={{ borderRadius: "0" }}>
          <CardHeader>{`${name} (${moment(fromDate).format(
            "DD-MM-YYYY"
          )} - ${moment(toDate).format("DD-MM-YYYY")})`}</CardHeader>
          <CardBody>
            <Tabs skipSteps={true}>
              <PlainTab header="Tour Details">
                <TourDetails />
              </PlainTab>
              <PlainTab header="Expenses">Expenses</PlainTab>
              <PlainTab header="Images">Images</PlainTab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </ViewTourContext.Provider>
  );
}
