import React, { useEffect, useState } from "react";
import { ChipList } from "../ChipList/ChipList";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { addTags, allTags, getAllTags, removeTag } from "../../Store";
export default function Tags({ addNew, selectedTags, removable, selectTable }) {
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

  useEffect(() => {
    if (selectedTags && typeof selectedTags === "function") {
      selectedTags(tags.filter((tag) => !!tag.selected));
    }
  }, [tags]);

  return (
    <div
      className="app-tags"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Card style={{ border: "none" }}>
        <ChipList
          chips={tags}
          addNew={addNew}
          removable={removable}
          addCallBack={addCallBack}
          removeCallBack={removeCallBack}
          selectTable={selectTable}
        />
      </Card>
    </div>
  );
}
