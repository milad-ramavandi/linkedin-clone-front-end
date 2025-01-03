'use client'
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import ImageIcon from "../image-icon";
import XMarkIcon from "../x-mark-icon";

const PreviewImage = ({ preview ,  handleOpenFileClick, handlePreviewClick}: { preview: string , handleOpenFileClick:() => void, handlePreviewClick: () => void }) => {
  return (
    <div className="space-y-2">
      {preview && (
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <Image
            src={preview}
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
          color={preview ? "warning" : "primary"}
          startContent={<ImageIcon />}
        >
          {preview ? "Change" : "Add"} image
        </Button>
        {preview && (
          <Button
            type={"button"}
            color={"danger"}
            onClick={handlePreviewClick}
            startContent={<XMarkIcon className="hidden sm:block"/>}
          >
            Remove image
          </Button>
        )}
      </div>
    </div>
  );
};

export default PreviewImage;
