import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { blogs, loadBlogs } from "../../../Store";
import Card from "../../../Shared/Card/Card";
import BlogCard from "./BlogCard";
export default function Blogs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogList = useSelector(blogs);
  console.log(blogList);
  const initiateBlogCreation = () => {
    navigate("/blogs/create");
  };

  useEffect(() => {
    dispatch(loadBlogs());
  }, []);
  return (
    <div
      className="h-100"
      style={{ padding: "15px", width: "calc(100% - 35px)" }}
    >
      {blogList && blogList?.length > 0 ? (
        <div className="flex-row-left-items">
          {blogList.map((blog, index) => {
            return <BlogCard key={index} {...blog} />;
          })}
        </div>
      ) : (
        <div>No Blogs Found</div>
      )}
      <button className="create-blog-btn" onClick={initiateBlogCreation}>
        Create Blog
      </button>
    </div>
  );
}
