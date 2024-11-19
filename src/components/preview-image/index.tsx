'use client'
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React, { MouseEventHandler } from "react";
import ImageIcon from "../image-icon";
import XMarkIcon from "../x-mark-icon";

const PreviewImage = ({ file ,  handleOpenFileClick, handlePreviewClick}: { file: any, handleOpenFileClick:MouseEventHandler, handlePreviewClick:MouseEventHandler }) => {
  return (
    <div className="space-y-2">
      {file && (
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <Image
            src={file}
            alt="preview"
            fill
            className={"object-contain object-center sm:object-top"}
          />
        </div>
      )}
      <div className={"flex justify-end space-x-2"}>
        <Button
          type="button"
          onClick={handleOpenFileClick}
          color={file ? "warning" : "primary"}
          startContent={<ImageIcon />}
        >
          {file ? "Change" : "Add"} image
        </Button>
        {file && (
          <Button
            type={"button"}
            color={"danger"}
            onClick={handlePreviewClick}
            startContent={<XMarkIcon />}
          >
            Remove image
          </Button>
        )}
      </div>
    </div>
  );
};

export default PreviewImage;
