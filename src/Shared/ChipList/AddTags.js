import React, { useEffect, useState } from "react";
import { ModalBox } from "../ModalBox/ModalBox";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import useFormGroup, { FormGroup } from "../../Hooks/FormGroup";
import { FormControl } from "../../Hooks/FormControl";
import { UIFormControl, UIFormGroup } from "../Form";
function AddTag({ dialogRef, closeDialog, addCallBack }) {
  const [addedTags, updateTags] = useState([]);
  const [tagForm, updateTagForm] = useFormGroup(
    new FormGroup({
      tagName: new FormControl("tagName", "", true),
      categories: new FormControl("categories", [], true),
      categoryName: new FormControl("categoryName", "", true),
    })
  );
  useEffect(() => {
    dialogRef?.current?.showModal();
    return () => {
      dialogRef?.current?.close();
    };
  }, []);

  const getCtrl = (control) => {
    return tagForm?.getCtrl(control);
  };
  const updateForm = (e, control) => {
    updateTagForm(control, e?.target?.value);
  };

  const addMore = (event = null, skipReset = false) => {
    const values = tagForm.getValue();
    const tags = addedTags;
    tags.push({
      tagName: values?.tagName,
      category: values?.categoryName?.split(","),
    });
    updateTags(tags);
    if (!skipReset) {
      tagForm.reset();
      updateTagForm();
    }
  };
  const addAndSubmit = () => {
    addMore(null, true);
    if (addCallBack && typeof addCallBack === "function") {
      addCallBack(addedTags);
      setTimeout(() => {
        updateTags([]);
      }, 0);
    }
  };
  return (
    <Card className="add-tag">
      <CardBody>
        <UIFormGroup>
          <UIFormControl control={getCtrl("tagName")}>
            <input
              value={getCtrl("tagName")?.value}
              onChange={(e) => updateForm(e, "tagName")}
              placeholder="Enter Tag Name"
            />
          </UIFormControl>
          <UIFormControl control={getCtrl("categoryName")}>
            <input
              value={getCtrl("categoryName")?.value}
              onChange={(e) => updateForm(e, "categoryName")}
              placeholder="Enter Category Name"
            />
          </UIFormControl>
        </UIFormGroup>
      </CardBody>
      <CardFooter>
        <div className="actions">
          <button onClick={closeDialog}>Cancel</button>
          <button onClick={addAndSubmit}>Add & Submit</button>
          <button onClick={addMore}>Add More</button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ModalBox(AddTag);
