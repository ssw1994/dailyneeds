import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import useFormGroup from "../../../Hooks/FormGroup";
import { FormControl } from "../../../Hooks/FormControl";
import { FormGroup } from "../../../Hooks/FormGroup";
import CardBody from "../../../Shared/Card/CardBody";
import Card from "../../../Shared/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrades, saveDayTrade, trade, tradeSaved } from "../../../Store";
import ListView from "../ListView/ListView";

export const TradeFormBox = ({ date, toggleEditMode }) => {
  const dispatch = useDispatch();
  const isTradeSavedSuccessfully = useSelector((state) =>
    tradeSaved(state, moment(date).toISOString ?? null)
  );
  const [tradeForm, updateTradeForm] = useFormGroup(
    new FormGroup({
      amount: new FormControl("amount", "", true),
      dateOfTrade: new FormControl("dateOfTrade", date?.toDate() ?? "", true),
    })
  );

  useEffect(() => {
    if (isTradeSavedSuccessfully) {
      toggleEditMode(false);
    }
  }, [isTradeSavedSuccessfully]);

  const updateFormFun = function (e, control) {
    updateTradeForm(control, e?.target?.value);
  };
  const getCtrl = (name) => {
    return tradeForm?.getCtrl(name) ?? "";
  };

  const saveTrade = (e) => {
    e.preventDefault();
    let payload = tradeForm.getValue();
    payload = {
      ...payload,
      amount: parseInt(payload.amount),
    };
    if (!tradeForm?.valid) {
      e?.preventDefault();
      return;
    }
    dispatch(saveDayTrade(payload));
  };

  const canceTrade = () => {
    toggleEditMode(false);
  };

  return (
    <div className="add-trade-form">
      <Card>
        <UIFormGroup submitAction={saveTrade}>
          <CardBody>
            <button
              onClick={canceTrade}
              title="Cancel"
              className="cancel-btn"
              type="button"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <UIFormControl control={getCtrl("amount")}>
              <input
                value={getCtrl("amount")?.value}
                onChange={(e) => updateFormFun(e, "amount")}
                type="number"
              />
            </UIFormControl>
            <div className="flex-row-center-items">
              <small style={{ fontSize: "10px", textAlign: "center" }}>
                {date.format("DD-MM-YYYY")}
              </small>
            </div>
          </CardBody>
        </UIFormGroup>
      </Card>
    </div>
  );
};

export const DateBox = ({
  date,
  weekDay,
  isDisabled,
  showFullDate,
  isAddNewTrade,
  cb,
  style,
}) => {
  const [isEditMode, toggleEditMode] = useState(false);
  const tradeDetails = useSelector((state) =>
    trade(state, moment(date).format("YYYY-MM-DD") ?? null)
  );
  useEffect(() => {
    toggleEditMode(false);
  }, [date]);

  if (isAddNewTrade) {
    return (
      <div className="date-box-container">
        <button className="date-box disable-hover add-trade-button">
          <i
            class="fa-solid fa-plus"
            onClick={() => {
              if (cb && typeof cb === "function") cb();
            }}
          ></i>
          Add
        </button>
      </div>
    );
  }

  if (weekDay) {
    return (
      <div className="date-box-container">
        <button className="date-box disable-hover">{weekDay}</button>
      </div>
    );
  }

  const tradeTemplate = tradeDetails ? (
    <>
      {tradeDetails.amount > 0 ? (
        <i
          className="fa-regular fa-face-smile"
          title={tradeDetails?.amount}
        ></i>
      ) : (
        <i
          className="fa-regular fa-face-sad-cry"
          title={tradeDetails?.amount}
        ></i>
      )}
    </>
  ) : null;
  const colorClass = tradeDetails
    ? tradeDetails.amount > 0
      ? "profitable-trade"
      : "loss-trade"
    : null;
  return (
    <div className="date-box-container">
      <button
        className={`date-box ${
          isDisabled ? "disable-hover" : ""
        } ${colorClass}`}
        disabled={isDisabled}
        onClick={(e) => toggleEditMode(true)}
      >
        {/* {tradeTemplate} */}
        <strong>{tradeDetails && tradeDetails.amount?.toString()}</strong>
        <br />
        {showFullDate ? date.format("DD-MMM-YYYY") : date.format("D")}
      </button>
      {isEditMode ? (
        <TradeFormBox date={date} toggleEditMode={toggleEditMode} />
      ) : null}
    </div>
  );
};

export const DayHeader = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return (
    <div className="flex-row-left-items days" style={{ width: "100%" }}>
      {days.map((day) => (
        <DateBox weekDay={day} key={day} />
      ))}
    </div>
  );
};

export const MonthBox = ({ year, month }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const selectedMonth = moment().set("month", month).set("year", year);
    const fromDate = moment(selectedMonth).startOf("month").toDate();
    const toDate = moment(selectedMonth).endOf("month").toDate();
    console.log(fromDate, toDate);
    dispatch(fetchTrades({ fromDate, toDate }));
  }, [year, month]);
  const dates = useMemo(() => {
    const cmonth = moment(new Date()).set("month", month).set("year", year);
    console.log(cmonth.startOf("month").format());
    const monthStartDate = moment(cmonth.startOf("month"));
    const monthEndDate = moment(cmonth.endOf("month"));
    let date = monthStartDate;
    const lastMonthsDates = [];
    for (let i = 0; i < 7; i++) {
      if (date.weekday() === i) {
        break;
      } else {
        lastMonthsDates.push(
          moment(cmonth).subtract(1, "month").endOf("month").subtract(i, "day")
        );
      }
    }
    const ds = [...lastMonthsDates.sort((a, b) => (a.isBefore(b) ? -1 : 1))];
    while (date.isSameOrBefore(monthEndDate)) {
      ds.push(date);
      date = moment(date).add(1, "day");
    }
    return ds;
  }, [year, month]);

  return (
    <div className="calender">
      <DayHeader />
      {dates?.map((date, i) => {
        return (
          <DateBox key={i} date={date} isDisabled={date.month() !== month} />
        );
      })}
    </div>
  );
};

export default function CalenderView() {
  const [date, updateDate] = useState(moment());

  const nextMonth = () => {
    const newDate = moment(date).add(1, "month");
    updateDate(newDate);
  };
  const previousMonth = () => {
    const newDate = moment(date).subtract(1, "month");
    updateDate(newDate);
  };
  const nextYear = () => {
    const newDate = moment(date).add(1, "year");
    updateDate(newDate);
  };
  const previousYear = () => {
    const newDate = moment(date).subtract(1, "year");
    updateDate(newDate);
  };

  const months = Array.apply(0, Array(12)).map((_, i) => {
    return {
      name: moment().month(i).format("MMM"),
      id: moment().month(i).month(),
    };
  });

  const years = Array.from(
    new Set(
      [].fillArray(12).reduce((acc, i) => {
        const currentDate = new Date();
        acc.push(moment(currentDate).add(i, "year").year());
        acc.push(moment(currentDate).subtract(i, "year").year());
        return acc;
      }, [])
    )
  ).sort();
  console.log(years, months);

  const setYear = (e) => {
    const newDate = moment(date).set("year", e?.target?.value);
    updateDate(newDate);
  };

  const setMonth = (e) => {
    const newDate = moment(date).set("month", e?.target?.value);
    updateDate(newDate);
  };

  const differentYearMonthTemplate = (
    <div className="flex-row-left-items">
      <div className="inline">
        <select onChange={setYear} placeholder="Year" value={date.year()}>
          {years.map((year) => {
            return (
              <option value={year} key={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <div className="inline">
        <select onChange={setMonth} placeholder="Month" value={date.month()}>
          {months.map(({ id, name }) => {
            return (
              <option value={id} key={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );

  const [onlyTrades, setOnlyTrades] = useState(false);

  return (
    <div className="calender-view">
      {date.format("DD-MM-YYYY")}
      <div className="header">
        <button onClick={previousYear}>
          <i className="fa-solid fa-angles-left"></i>
        </button>
        <button onClick={previousMonth}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        {differentYearMonthTemplate}
        <button onClick={nextMonth}>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
        <button onClick={nextYear}>
          <i className="fa-solid fa-angles-right"></i>
        </button>
        <div className="flex-row-left-items inline">
          {onlyTrades ? (
            <i
              class="fa-solid fa-toggle-on"
              onClick={() => setOnlyTrades(!onlyTrades)}
              title="Show Calender"
            ></i>
          ) : (
            <i
              class="fa-solid fa-toggle-off"
              onClick={() => setOnlyTrades(!onlyTrades)}
              title="Show Only Trades"
            ></i>
          )}
        </div>
      </div>
      <div>
        {onlyTrades ? (
          <ListView month={date.month()} year={date.year()} />
        ) : (
          <MonthBox month={date.month()} year={date.year()} />
        )}
      </div>
    </div>
  );
}
