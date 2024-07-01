import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../Shared";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getMyTours, myTours } from "../../../Store";
const Tour = ({ tourDetails }) => {
  const { name, _id } = tourDetails;
  const navigate = useNavigate();

  const viewTour = () => {
    navigate("view/" + _id);
  };

  return (
    <div className="flex-column-center-items" onClick={viewTour}>
      <i class="fa-regular fa-folder"></i>
      <span className="folder-name">{name}</span>
    </div>
  );
};

export default function Tours() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tours = useSelector(myTours);
  useEffect(() => {
    dispatch(getMyTours());
  }, []);

  const gotoAddTour = () => {
    navigate("add");
  };
  return (
    <div className="tours">
      <Card>
        <div className="flex-row-left-items">
          {tours?.map((t, i) => {
            return <Tour tourDetails={t} key={i} />;
          })}

          <i class="fa-solid fa-folder-plus" onClick={gotoAddTour}></i>
        </div>
      </Card>
    </div>
  );
}
