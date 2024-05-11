import React, { useEffect, useState } from "react";
import useFormGroup, { FormGroup } from "../../../Hooks/FormGroup";
import { FormControl } from "../../../Hooks/FormControl";
import UIFormGroup from "../../../Shared/Form/FormGroup";
import UIFormControl from "../../../Shared/Form/FormControl";
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
import FileUploader from "../../../Shared/FileUploader/FileUploader";
import { Gallery } from "../../../Shared/Gallery/Gallery";
import Tags from "../../../Shared/Tags/Tags";
import CardBody from "../../../Shared/Card/CardBody";
import CardFooter from "../../../Shared/Card/CardFooter";
import http from "../../../Services";
import { useDispatch, useSelector } from "react-redux";
import {
  addProducts,
  isProductSaveSuccess,
  resetProductSave,
} from "../../../Store";
import { useNavigate } from "react-router";
export default function AddProduct() {
  const [uploadFiles, updateUploadedFiles] = useState([]);
  const isProductSavedSuccessFully = useSelector(isProductSaveSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isProductSavedSuccessFully) {
      console.log(isProductSavedSuccessFully);
      dispatch(resetProductSave());
      navigate("/shop");
    }
  }, [isProductSavedSuccessFully]);

  const [productForm, updateProductForm] = useFormGroup(
    new FormGroup({
      name: new FormControl("name", "", true),
      description: new FormControl("description", "", true),
      tags: new FormControl("tags", []),
      price: new FormControl("price", 1, true),
      stock: new FormControl("stock", 1, true),
      images: new FormControl("images", [], true),
      discount: new FormControl("discount", 0),
    })
  );

  const getCtrl = (control) => {
    return productForm?.getCtrl(control) ?? null;
  };

  const updateForm = (e, ctrl) => {
    updateProductForm(ctrl, e?.target?.value);
  };

  const filesForUpload = (files) => {
    console.log(files);
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    http
      .uploadFile(formData)
      .then((response) => {
        console.log(response);
        const images = response?.data?.map((img) => {
          return {
            url: img,
            alt: "image",
          };
        });
        updateUploadedFiles(images ?? []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (uploadFiles) {
      updateProductForm(
        "images",
        uploadFiles.map((img) => img.url)
      );
    }
  }, [uploadFiles]);

  const saveProducts = () => {
    const payload = productForm.getValue();
    dispatch(addProducts(payload));
  };

  const getSelectedTags = (tags) => {
    updateProductForm("tags", tags);
  };

  return (
    <div className="add-product flex-column-center-items">
      <Card style={{ width: "60%" }}>
        <CardBody>
          <UIFormGroup>
            <UIFormControl control={getCtrl("name")}>
              <input
                value={getCtrl("name")?.value}
                onChange={(e) => updateForm(e, "name")}
              />
            </UIFormControl>
            <div></div>
            <UIFormControl control={getCtrl("description")}>
              <EditorProvider>
                <Editor
                  value={getCtrl("description")?.value}
                  onChange={(e) => updateForm(e, "description")}
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

            <div className="flex-row">
              <div style={{ width: "32%" }}>
                <UIFormControl control={getCtrl("price")}>
                  <input
                    value={getCtrl("price")?.value}
                    onChange={(e) => updateForm(e, "price")}
                  />
                </UIFormControl>
              </div>
              <div style={{ width: "32%" }}>
                <UIFormControl control={getCtrl("discount")}>
                  <input
                    value={getCtrl("discount")?.value}
                    onChange={(e) => updateForm(e, "discount")}
                  />
                </UIFormControl>
              </div>
              <div style={{ width: "32%" }}>
                <UIFormControl control={getCtrl("stock")}>
                  <input
                    value={getCtrl("stock")?.value}
                    onChange={(e) => updateForm(e, "stock")}
                  />
                </UIFormControl>
              </div>
            </div>
            <div className="w-100" style={{ width: "100%" }}>
              <Tags
                addNew={false}
                selectTable={true}
                selectedTags={getSelectedTags}
              />
            </div>
            <div className="flex-row" style={{ gap: "5px" }}>
              <div style={{ width: "49%" }}>
                <label>Upload Product Images</label>
                <FileUploader getFiles={filesForUpload} />
              </div>
              <div style={{ width: "49%", height: "250px" }}>
                <label>Preview Uploaded Images</label>
                <Gallery images={uploadFiles} auto={true} />
              </div>
            </div>
          </UIFormGroup>
        </CardBody>
        <CardFooter>
          <div
            className="actions flex-row-center-items"
            style={{ marginTop: "15px" }}
          >
            <button>Cancel</button>
            <button onClick={saveProducts}>Save</button>
            <button>Preview</button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
