import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrades, tradeList } from "../../../Store";
import * as moment from "moment";
import { DateBox } from "../CalenderView/CalenderView";
import AddTrade from "../AddTrade/AddTrade";
export default function ListView({ month, year }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const trades = useSelector(tradeList);
  //useEffect(() => {
  const date = moment().set("month", month).set("year", year);
  const monthStartDate = moment(date).startOf("month").toDate();
  const monthEndDate = moment(date).endOf("month").toDate();
  useEffect(() => {
    dispatch(fetchTrades({ fromDate: monthStartDate, toDate: monthEndDate }));
  }, [month, year]);
  //}, [month, year]);

  const addNewTrade = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <div
      className="flex-row-center-items list-view"
      style={{ width: "100%", flexWrap: "wrap" }}
    >
      {trades.map((trade, index) => {
        return (
          <DateBox date={trade.dateOfTrade} key={index} showFullDate={true} />
        );
      })}
      <DateBox isAddNewTrade={true} cb={addNewTrade} />
      {open && (
        <div>
          <AddTrade
            closeDialog={closeDialog}
            fromDate={monthStartDate}
            toDate={monthEndDate}
          />
        </div>
      )}
    </div>
  );
}
