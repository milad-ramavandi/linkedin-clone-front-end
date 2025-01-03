"use client";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, {
  useRef,
  useState,
} from "react";
import PreviewImage from "../preview-image";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useSession } from "next-auth/react";
import { addPostAction } from "@/actions/post";
import FaceChevronIcon from "../icons/face-chevron-icon";

const PostForm = () => {
  const session = useSession();
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  const handleOpenFileClick: () => void = () => fileRef.current?.click();

  const handlePreviewClick:() => void = () => {
    setPreview("");
  };

  const handlePostForm:(e: React.MouseEvent<Element, MouseEvent>) => Promise<void> = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault();
    if (!text) {
      toast.error("Post input is required");
      return;
    }
    setIsLoading(true);
    const { status, message } = await addPostAction(text, preview, {
      userId: session?.data?.user?.email as string,
      userImage: session?.data?.user?.image as string,
      userName: session?.data?.user?.name as string,
    });
    if (status === 201) {
      toast.success(message);
    } else {
      toast.error(message);
    }
    setIsLoading(false);
    setPreview("");
    setText("");
    setIsOpenEmoji(false);
  };
  const handleOpenEmojiClick:() => void = () =>
    setIsOpenEmoji((prev) => !prev);
  const handleEmojiClick: (emoji: EmojiClickData) => void = (emoji: EmojiClickData) => {
    setText((prev) => `${prev}${emoji.emoji}`);
  };
  return (
    <div className="p-3 bg-white rounded-lg space-y-3">
      <form className="space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
        <div className={"flex flex-grow items-center space-x-2"}>
          <Avatar
            src={session.data?.user?.image as string}
            showFallback
            className="hidden sm:block"
            isBordered
          />
          <div className="relative flex-grow">
            <Input
              type="text"
              name="text"
              value={text}
              onValueChange={setText}
              placeholder="Start writing a post..."
              autoComplete={"off"}
              endContent={<FaceChevronIcon isToggleChevron={isOpenEmoji} onClick={handleOpenEmojiClick} />}
            />
            <div className="w-full absolute top-full left-0 z-50">
              <EmojiPicker
                open={isOpenEmoji}
                style={{
                  width: "100%",
                  marginTop: "5px",
                }}
                onEmojiClick={handleEmojiClick}
              />
            </div>
          </div>
          <input
            type="file"
            name="file"
            className="hidden"
            ref={fileRef}
            onChange={handleImageChange}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            onClick={handlePostForm}
            color={"primary"}
            variant={"ghost"}
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
      <PreviewImage
        preview={preview}
        handleOpenFileClick={handleOpenFileClick}
        handlePreviewClick={handlePreviewClick}
      />
    </div>
  );
};

export default PostForm;
