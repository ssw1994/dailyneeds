import React, { createRef, forwardRef, useState } from "react";

export const UploadButton = forwardRef(({ ref, style, uploadedFiles }) => {
  const inputRef = createRef();

  const openFileUpload = () => {
    inputRef?.current?.click();
  };

  const fileSelected = (e) => {
    console.log(e);
    uploadedFiles && uploadedFiles(e.target.files);
  };

  return (
    <>
      <input type="file" hidden ref={inputRef} onChange={fileSelected} />
      <button ref={ref} onClick={openFileUpload}>
        Upload
      </button>
    </>
  );
});

export default function FileUploader({ getFiles, children }) {
  const [highLight, setHighLight] = useState(false);
  const files = (data) => {
    if (getFiles && typeof getFiles === "function") {
      getFiles(data);
    }
  };

  const handleFileDragOver = (e) => {
    e?.preventDefault();
    setHighLight(true);
  };

  const handleDragLeave = () => {
    setHighLight(false);
  };
  const handleFileDrop = (e) => {
    e?.preventDefault();
    setHighLight(false);
    const imgs = Array.from(e?.dataTransfer.files);
    files(imgs);
  };

  return (
    <div className="file-uploader">
      <div
        className={`upload-area flex-row-center-items ${
          highLight && "highlight"
        }`}
        onDragOver={handleFileDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
      >
        {children}
        Drag and Drop Files Here
      </div>
      <span>OR</span>
      <br />
      <UploadButton uploadedFiles={files} />
    </div>
  );
}
