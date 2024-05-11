import { useEffect, useMemo, useState } from "react";
import AddTagModal from "./AddTags";
import { useDispatch, useSelector } from "react-redux";
import {
  isTagSavedSuccessfully,
  resetTagAddition,
  selectTag,
} from "../../Store";
const Chip = ({ tag, removable, onSelection, removeCallBack }) => {
  const { tagName, selected } = tag;
  return (
    <div className={`chip ${selected ? "selected" : ""}`} onClick={onSelection}>
      {tagName}
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeCallBack(tag);
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </div>
  );
};
export const ChipList = ({
  getSelectedChips,
  chips,
  removable,
  addNew,
  selectTable,
  addCallBack,
  removeCallBack,
  searchable,
}) => {
  const tagsSaved = useSelector(isTagSavedSuccessfully);
  const [search, updateSearch] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (tagsSaved) {
      dispatch(resetTagAddition());
      setOpen(false);
    }
  }, [tagsSaved]);

  const searchTemplate = (
    <div className="search">
      <input
        onChange={(e) => updateSearch(e.target.value)}
        value={search}
        placeholder="Search Tags"
        style={{ width: "98%" }}
      />
    </div>
  );

  const onSelection = (tag) => {
    if (!selectTable) return;
    dispatch(selectTag(tag));
  };

  const selectedTagsCount = useMemo(() => {
    return chips?.filter((itm) => itm.selected)?.length;
  }, [chips]);

  const removed = (tag) => {
    removeCallBack(tag);
  };

  const applyFilter = (tag) => {
    if (!search) return true;
    if (search) {
      return tag?.tagName?.toLowerCase()?.includes(search.toLowerCase());
    }
    return true;
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const saveTags = (tags) => {
    addCallBack(tags);
  };

  return (
    <div className="chiplist" style={{ height: "100%" }}>
      {searchable && searchTemplate}
      <fieldset style={{ height: "80%" }}>
        <legend>
          Select Tags {selectedTagsCount} / {chips?.length}
        </legend>
        <div style={{ height: "100%" }}>
          <div className="chips flex-row-left-items">
            {chips?.filter(applyFilter)?.map((tag, index) => {
              return (
                <Chip
                  tag={tag}
                  key={index}
                  removable={removable}
                  removeCallBack={removed}
                  onSelection={() => onSelection(tag)}
                />
              );
            })}
          </div>

          {addNew && <button onClick={() => setOpen(true)}>Add New Tag</button>}
          <div>{open}</div>
          {open && (
            <AddTagModal closeDialog={closeDialog} addCallBack={saveTags} />
          )}
        </div>
      </fieldset>
    </div>
  );
};
