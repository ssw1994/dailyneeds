import { useDispatch } from "react-redux";
import Card from "../../../Shared/Card/Card";
import { likeBlog } from "../../../Store";
import { useNavigate } from "react-router";
import CardHeader from "../../../Shared/Card/CardHeader";
import CardBody from "../../../Shared/Card/CardBody";
import CardFooter from "../../../Shared/Card/CardFooter";

export default function BlogCard({
  title,
  description,
  contents,
  likeCount,
  _id,
  isLikedByCurrentUser,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const limit = (str, len) => {
    if (typeof str === "string") {
      return `${str.substring(0, len)}...`;
    }
  };

  const blogLiked = (event) => {
    event && event?.stopPropagation();
    dispatch(likeBlog({ blogId: _id }));
  };

  const viewBlog = () => {
    navigate(`/blogs/view/${_id}`);
  };
  return (
    <div className="blog-card" onClick={viewBlog}>
      <Card>
        <CardHeader>
          <h2>{title}</h2>
        </CardHeader>
        <CardBody>
          <span>{limit(description, 25)}</span>
          <div dangerouslySetInnerHTML={{ __html: limit(contents, 50) }}></div>
        </CardBody>
        <CardFooter>
          <div className="actions">
            <button
              onClick={blogLiked}
              disabled={isLikedByCurrentUser}
              className="no-color"
            >
              <i
                class="fa-regular fa-heart"
                style={{
                  color: isLikedByCurrentUser ? "pink" : "gray",
                }}
              ></i>
              &nbsp;
              <span className="badge">{likeCount}</span>
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
