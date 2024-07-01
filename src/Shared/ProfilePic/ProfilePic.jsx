import { createRef, useEffect, useState } from "react";
import http from "../../Services";
import { UploadButton } from "../FileUploader/FileUploader";
export default function ProfilePic({
  uploadToServer,
  showOnly,
  uploadedFiles,
  thumbnail,
  url,
}) {
  const [src, updateSrc] = useState("");
  const uploadedFls = (files) => {
    if (uploadToServer) {
      const formData = new FormData();
      for (let file of files) {
        formData.append("files", file);
      }
      http
        .uploadFile(formData)
        .then((response) => {
          console.log(response);
          const images = response?.data;
          uploadedFiles(images ?? []);

          updateSrc(images[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (url) {
      updateSrc(url);
    }
  }, [url]);

  if (thumbnail && url) {
    return (
      <div className="thumbnail">
        <img src={url} alt="Your profile pic" />
      </div>
    );
  }

  if (thumbnail && !url) {
    return null;
  }

  return (
    <div className="flex-column-center-items">
      <img className="profile-pic" alt="Your profile pic" src={src}></img>
      {!showOnly && <UploadButton uploadedFiles={uploadedFls} />}
    </div>
  );
}
