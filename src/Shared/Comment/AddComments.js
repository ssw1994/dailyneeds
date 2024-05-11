import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CommentAdd,
  ResetCommentStatus,
  isCommentSavedSuccessFully,
} from "../../Store";
export default function AddComments({ blogId, parentId, cb, hideAddButton }) {
  const [add, updateAddToggle] = useState(false);
  const [inputText, updateText] = useState("");
  const isCommentSaved = isCommentSavedSuccessFully(blogId || parentId);
  const dispatch = useDispatch();
  const comment = () => {
    const payload = {
      comment: inputText,
      blogId,
      parentId,
    };
    dispatch(CommentAdd(payload));
  };

  useEffect(() => {
    if (isCommentSaved) {
      updateAddToggle(false);
      if (cb && typeof cb === "function") {
        cb();
      }
      dispatch(ResetCommentStatus());
    }
  }, [isCommentSaved]);

  useEffect(() => {
    if (hideAddButton) {
      updateAddToggle(true);
    }
  }, [hideAddButton]);

  const saveComment = (e) => {
    if (!inputText) return;
    if (e && e.key === "Enter") {
      comment();
    }
  };

  return (
    <>
      {add ? (
        <div className="comment-addition">
          <div className="flex-row-space-between ">
            <label style={{ display: hideAddButton ? "none" : "block" }}>
              Add Comment :
            </label>
            <br />
            <i
              class="fa-solid fa-xmark"
              onClick={(e) => {
                updateAddToggle(!add);
                if (cb && typeof cb === "function") {
                  cb();
                }
              }}
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          <div className="comment-box flex-row">
            <textarea
              value={inputText}
              onKeyDown={saveComment}
              onChange={(e) => updateText(e.target.value)}
            ></textarea>
            {/* <button
              className="send-comment-btn"
              onClick={(e) => comment()}
              disabled={!inputText}
            >
              <i class="fa-regular fa-paper-plane"></i>
            </button> */}
          </div>
        </div>
      ) : (
        <button onClick={() => updateAddToggle(!add)}>
          Add Comment <i class="fa-regular fa-comment"></i>
        </button>
      )}
    </>
  );
}
