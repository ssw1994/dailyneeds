import { useEffect, useState } from "react";
import { fetchCommentDetails, getCommentDetails } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import AddComments from "./AddComments";

export function CommentView({ blogId, parentId, comment }) {
  const [isReplyOpened, toggleReply] = useState(false);
  return (
    <div
      className="comment-card"
      style={{ border: parentId ? "none !importent" : "1px solid gray" }}
    >
      <div className="comment-title">{comment.comment}</div>
      <div className="comment-footer">
        <div className="actions">
          <small>
            Commented On :
            {moment(comment?.createdAt).format("DD-MM-YYYY HH:MM a")}
          </small>
          <i class="fa-regular fa-thumbs-up"></i>
        </div>
        <div>
          {!isReplyOpened ? (
            <strong
              style={{ cursor: "pointer" }}
              onClick={() => toggleReply(true)}
            >
              Reply &nbsp; <i class="fa-regular fa-comment-dots"></i>
            </strong>
          ) : (
            <AddComments
              parentId={comment._id}
              cb={() => toggleReply(false)}
              hideAddButton={true}
            />
          )}
        </div>
        <div>
          <ViewComments parentId={comment._id} />
        </div>
      </div>
    </div>
  );
}

export default function ViewComments({ blogId, parentId }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) =>
    getCommentDetails(state, blogId || parentId)
  );
  console.log(comments);

  useEffect(() => {
    if (parentId) {
      dispatch(fetchCommentDetails({ parentId }));
    } else if (blogId) {
      dispatch(fetchCommentDetails({ blogId }));
    }
  }, [blogId, parentId]);

  const [isExpanded, toggleExpanded] = useState(false);
  if (comments && comments.length === 0) {
    return null;
  }
  return (
    <div className="view-comments">
      <div>
        <i class="fa-regular fa-message"></i> &nbsp;
        {comments.length}&nbsp;
        {blogId ? "Comments" : parentId ? "Replies" : null}
        &nbsp;&nbsp;
        {!isExpanded && (
          <i
            class="fa-regular fa-square-caret-right"
            onClick={(e) => toggleExpanded(!isExpanded)}
          ></i>
        )}
        {isExpanded && (
          <i
            class="fa-regular fa-square-caret-down"
            onClick={(e) => toggleExpanded(!isExpanded)}
          ></i>
        )}
      </div>
      {comments && comments instanceof Array && isExpanded
        ? comments.map((comment) => (
            <CommentView
              blogId={blogId}
              parentId={parentId}
              comment={comment}
            />
          ))
        : null}
    </div>
  );
}
