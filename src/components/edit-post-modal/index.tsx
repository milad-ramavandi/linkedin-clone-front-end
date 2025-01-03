"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import React, {
  useRef,
  useState,
} from "react";
import PreviewImage from "../preview-image";
import { editPostAction } from "@/actions/post";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Post } from "@/types/post";
import FaceChevronIcon from "../face-chevron-icon";

const EditPostModal = ({
  post,
  isOpen,
  onClose,
  onOpenChange,
}: {
  post:Post;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}) => {
  const [text, setText] = useState<string>(post?.text);
  const [preview, setPreview] = useState<string>(post?.postImage);
  const fileRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false);
  const handleOpenFileClick: () => void = () => fileRef.current?.click();
  const handlePreviewClick: () => void = () => setPreview("");
  const handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files?.[0]);
    }
    reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
      setPreview(readerEvent.target?.result as string);
    };
  };
  const handleCloseModalCLick:() => void = () => {
    onClose();
  };
  const handleEditPostClick: () => Promise<void> = async () => {
    setIsLoading(true);
    const { status, message } = await editPostAction(post._id as string, text, preview);
    if (status === 200) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    setIsLoading(false);
    onClose();
  };
  const handleOpenEmoji = () => setIsOpenEmoji((prev) => !prev);
  const handleEmojiClick: (emoji:EmojiClickData) => void = (emoji: EmojiClickData) => {
    setText((prev) => `${prev}${emoji.emoji}`);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"4xl"} isDismissable={false} hideCloseButton>
      <ModalContent>
        <ModalHeader>Edit post</ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-4 sm:flex sm:flex-row sm:space-x-6 sm:space-y-0">
            <div className="relative flex-grow">
              <Textarea
                variant="bordered"
                disableAnimation
                disableAutosize
                classNames={{
                  input: "sm:min-h-[200px]",
                }}
                value={text}
                onValueChange={setText}
                endContent={<FaceChevronIcon isToggleChevron={isOpenEmoji} onClick={handleOpenEmoji} />}
              />
              <div className={"w-full absolute left-0 top-16 z-50"}>
                <EmojiPicker
                  style={{
                    width: "100%",
                  }}
                  searchDisabled
                  open={isOpenEmoji}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            </div>

            <input
              type="file"
              className="hidden"
              ref={fileRef}
              onChange={handleImageChange}
            />

            <PreviewImage
              preview={preview}
              handleOpenFileClick={handleOpenFileClick}
              handlePreviewClick={handlePreviewClick}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onClick={handleCloseModalCLick}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleEditPostClick}
            isDisabled={!text || (text === post.text) || isLoading}
            isLoading={isLoading}
          >
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
