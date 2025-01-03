"use client";
import { Button, Card, Image } from "@nextui-org/react";
import React from "react";
import ImageIcon from "../icons/image-icon";
import XMarkIcon from "../icons/x-mark-icon";

const PreviewImage = ({
  preview,
  handleOpenFileClick,
  handlePreviewClick,
}: {
  preview: string;
  handleOpenFileClick: () => void;
  handlePreviewClick: () => void;
}) => {
  return (
    <div className="space-y-2">
      {preview && (
        <Card className="sm:w-3/4 mx-auto h-[300px] sm:h-[400px]">
          <Image
            removeWrapper
            className="w-full h-full object-cover"
            src={preview}
            alt="preview"
          />
        </Card>
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
            startContent={<XMarkIcon className="hidden sm:block" />}
          >
            Remove image
          </Button>
        )}
      </div>
    </div>
  );
};

export default PreviewImage;
