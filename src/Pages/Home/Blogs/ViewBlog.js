import { React, useEffect } from "react";
import { useParams } from "react-router";
import Card from "../../../Shared/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  blogDetails,
  blogDetailsError,
  blogDetailsSuccess,
  fetchBlogDetails,
  loadingBlogDetails,
} from "../../../Store";
import Spinner from "../../../Shared/Spinner/Spinner";
import CardHeader from "../../../Shared/Card/CardHeader";
import CardBody from "../../../Shared/Card/CardBody";
import AddComments from "../../../Shared/Comment/AddComments";
import CardFooter from "../../../Shared/Card/CardFooter";
import ViewComments from "../../../Shared/Comment/ViewComments";
export default function ViewBlog() {
  const params = useParams();
  const dispatch = useDispatch();
  const details = useSelector(blogDetails);
  const errorInFetchingBlogDetails = useSelector(blogDetailsError);
  const succssBlogDetails = useSelector(blogDetailsSuccess);
  const loadingDetails = useSelector(loadingBlogDetails);
  useEffect(() => {
    if (params.blogId) {
      const payload = {
        blogId: params?.blogId,
      };
      dispatch(fetchBlogDetails(payload));
    }
  }, [params.blogId]);

  if (errorInFetchingBlogDetails) {
    return (
      <div>
        <h1>Error in fetching Blog Details</h1>
      </div>
    );
  }

  const {
    title,
    description,
    contents,
    comments,
    likes,
    createdAt,
    createdBy,
    updatedAt,
    imgs,
  } = details ? details : {};
  return (
    <Spinner loading={loadingDetails}>
      <div className="page flex-row-center-items">
        <Card style={{ width: "70%" }}>
          <CardHeader>
            <h3>{title}</h3>
          </CardHeader>
          <CardBody>
            <span>{description}</span>
            <div dangerouslySetInnerHTML={{ __html: contents }}></div>
          </CardBody>
          <CardFooter>
            <AddComments blogId={params.blogId} />
            <ViewComments blogId={params.blogId} />
          </CardFooter>
        </Card>
      </div>
    </Spinner>
  );
}
