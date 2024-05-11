import React, { useEffect } from "react";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { UIFormControl, UIFormGroup } from "../../../Shared/Form";
import Card from "../../../Shared/Card/Card";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnRedo,
  BtnUndo,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { FormControl } from "../../../Hooks/FormControl";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isBloggedSaved, saveBlog } from "../../../Store";
export default function CreateBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const saveSuccess = useSelector(isBloggedSaved);
  const [blogForm, updateForm] = useFormGroup(
    new FormGroup({
      title: new FormControl("title", "", true, null, 3),
      description: new FormControl("description", "", true, null, 10),
      contents: new FormControl("contents", "", true),
      tags: new FormControl("tags", [], false),
    })
  );

  useEffect(() => {
    if (saveSuccess) viewBlogs();
  }, [saveSuccess]);

  const getCtrl = (control) => {
    return blogForm.getCtrl(control);
  };

  const updateBlogForm = function (e, control) {
    updateForm(control, e?.target?.value);
  };

  const saveBlogDetails = () => {
    const value = blogForm.getValue();
    dispatch(saveBlog(value));
  };

  const viewBlogs = () => {
    navigate("/blogs");
  };
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="flex-row-center-items"
    >
      <div style={{ width: "70%", height: "100%" }}>
        <Card>
          <UIFormGroup>
            <UIFormControl control={getCtrl("title")}>
              <input
                value={getCtrl("title")?.value}
                onChange={(e) => updateBlogForm(e, "title")}
              />
            </UIFormControl>
            <UIFormControl control={getCtrl("description")}>
              <textarea
                value={getCtrl("description")?.value}
                onChange={(e) => updateBlogForm(e, "description")}
              ></textarea>
            </UIFormControl>
            <UIFormControl control={getCtrl("contents")}>
              <EditorProvider>
                <Editor
                  value={getCtrl("contents")?.value}
                  onChange={(e) => updateBlogForm(e, "contents")}
                  containerProps={{
                    style: {
                      resize: "vertical",
                      maxWidth: "90%",
                      height: "300px",
                    },
                  }}
                >
                  <Toolbar>
                    <BtnBold />
                    <BtnItalic />
                    <BtnBulletList />
                    <BtnClearFormatting />
                    <BtnLink />
                    <BtnRedo />
                    <BtnUndo />
                  </Toolbar>
                </Editor>
              </EditorProvider>
            </UIFormControl>
            <div className="flex-row-center-items">
              <button onClick={viewBlogs}>Cancel</button>
              <button disabled={!blogForm.valid} onClick={saveBlogDetails}>
                Save
              </button>
            </div>
          </UIFormGroup>
        </Card>
      </div>
    </div>
  );
}
