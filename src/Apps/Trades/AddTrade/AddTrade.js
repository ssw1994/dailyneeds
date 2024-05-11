import React, { useEffect } from "react";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { FormControl } from "../../../Hooks/FormControl";
import { ModalBox } from "../../../Shared/ModalBox/ModalBox";
import Card from "../../../Shared/Card/Card";
import CardFooter from "../../../Shared/Card/CardFooter";
import CardBody from "../../../Shared/Card/CardBody";
import moment from "moment";
import { useDispatch } from "react-redux";
import { saveDayTrade } from "../../../Store";
function AddTrade({ dialogRef, fromDate, toDate }) {
  const dispatch = useDispatch();
  const [tradeForm, updateTradeForm] = useFormGroup(
    new FormGroup({
      amount: new FormControl("amount", "", true),
      dateOfTrade: new FormControl("dateOfTrade", "", true),
      description: new FormControl("description", ""),
    })
  );
  useEffect(() => {
    dialogRef?.current?.showModal();
    return () => {
      dialogRef?.current?.close();
    };
  }, []);

  const getCtrl = (name) => {
    return tradeForm?.getCtrl(name);
  };

  const updateForm = (e, control) => {
    updateTradeForm(control, e?.target?.value);
  };

  const saveTrade = () => {
    if (!tradeForm.valid) return;
    let payload = tradeForm?.getValue();
    payload = {
      ...payload,
      amount: parseInt(payload.amount),
    };
    dispatch(saveDayTrade(payload));
  };

  return (
    <div>
      <div className="header">Add Trade</div>
      <div>
        <Card>
          <CardBody>
            <UIFormGroup>
              <UIFormControl control={getCtrl("amount")}>
                <input
                  type="number"
                  value={getCtrl("amount")?.value}
                  placeholder="Enter Amount"
                  onChange={(e) => updateForm(e, "amount")}
                />
              </UIFormControl>
              <UIFormControl control={getCtrl("dateOfTrade")}>
                <input
                  type="date"
                  value={getCtrl("dateOfTrade")?.value}
                  placeholder="Select Date"
                  max={moment(toDate).format("YYYY-MM-DD")}
                  min={moment(fromDate).format("YYYY-MM-DD")}
                  onChange={(e) => updateForm(e, "dateOfTrade")}
                />
              </UIFormControl>
              <UIFormControl control={getCtrl("description")}>
                <textarea
                  type="number"
                  value={getCtrl("description")?.value}
                  placeholder="Description"
                  onChange={(e) => updateForm(e, "description")}
                />
              </UIFormControl>
            </UIFormGroup>
          </CardBody>
          <CardFooter>
            <div className="actions">
              <button onClick={() => dialogRef?.current?.close()}>
                Cancel
              </button>
              <button onClick={saveTrade}>Save</button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default ModalBox(AddTrade);
