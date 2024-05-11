import React, { useEffect, useState } from "react";
import { ChipList } from "../../../Shared/ChipList/ChipList";
import Card from "../../../Shared/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { addTags, allTags, getAllTags, removeTag } from "../../../Store";
export default function TagSettings() {
  const tags = useSelector(allTags);
  const dispatch = useDispatch();
  const addCallBack = (tags) => {
    dispatch(addTags(tags));
  };
  const removeCallBack = (tag) => {
    dispatch(removeTag({ id: tag._id }));
  };

  useEffect(() => {});

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  return (
    <div
      className="flex-row-center-items app-tags"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Card style={{ width: "50%" }}>
        <ChipList
          chips={tags}
          addNew={true}
          removable={true}
          addCallBack={addCallBack}
          removeCallBack={removeCallBack}
          selectTable={false}
          searchable={true}
        />
      </Card>
    </div>
  );
}
