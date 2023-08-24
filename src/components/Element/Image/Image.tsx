import React, { FC, useState } from "react";
import { ImageElement } from "~redux/types";
import style from "./Image.module.scss";
import { ReactComponent as ImageIcon } from "~assets/svg/element-image-logo.svg";
import { Image as ImageContent } from "@arco-design/web-react";

import { uploadRequest } from "./upload";
import { useDispatch, useSelector } from "react-redux";
import { editElement } from "~redux/documentSlice";
import { RootState } from "~redux/store";

interface ImageProps {
  element: ImageElement;
  index: number;
  active: boolean;
}

export const Image: FC<ImageProps> = (props) => {
  const { element } = props;

  const dispatch = useDispatch();
  const selectedDocId = useSelector(
    (state: RootState) => state.appData.selectedDocId
  );

  return (
    <div className={style["image-container"]}>
      {element.src === "" ? (
        <div className={style["add-image-box"]}>
          <ImageIcon className={style["add-image-logo"]} />
          <div className={style["add-image-text"]}>添加图片</div>
          <input
            type="file"
            className={style["add-image-input"]}
            onChange={(e) => {
              const file = e.target?.files?.[0];
              if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const a = uploadRequest(formData).then((data) => {
                  dispatch(
                    editElement({
                      docId: selectedDocId,
                      element: { ...element, src: data.links.url },
                    })
                  );
                });
              }

              // const a =  uploadRequest(e.target.value)
            }}
          />
        </div>
      ) : (
        <ImageContent width={"80%"} src={element.src} />
      )}
    </div>
  );
};
