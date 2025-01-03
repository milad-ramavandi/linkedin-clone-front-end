"use client";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useSession } from "next-auth/react";
import { addCommentAction } from "@/actions/comment";
import FaceChevronIcon from "../face-chevron-icon";

const CommentForm = ({ postID }: { postID: string }) => {
  const [textComment, setTextComment] = useState<string>("");
  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const session = useSession();
  const handleCommentForm : (e:React.MouseEvent<Element, MouseEvent>) => Promise<void> = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault();
    if (!textComment) {
      toast.error("Comment input is required");
      return;
    }
    setIsLoading(true)
    const { status, message } = await addCommentAction(
      {
        userId: session?.data?.user?.email as string,
        userImage: session?.data?.user?.image as string,
        userName: session?.data?.user?.name as string,
      },
      postID,
      textComment
    );
    if (status === 201) {
      toast.success(message)
    } else {
      toast.error(message)
    }
    setIsLoading(false);
    setTextComment("");
    setIsOpenEmoji(false);
  };
  const handleOpenEmojiClick: () => void = () =>
    setIsOpenEmoji((prev) => !prev);
  const handleEmojiClick: (emoji:EmojiClickData) => void = (emoji: EmojiClickData) => {
    setTextComment((prev) => `${prev}${emoji.emoji}`);
  };
  return (
    <>
      <div className="flex space-x-2">
        <Avatar
          src={session.data?.user?.image as string}
          showFallback
          className="hidden sm:block"
          isBordered
        />
        <form className="space-y-2 sm:space-y-0 sm:flex flex-grow space-x-2">
          <div className="relative flex-grow">
            <Input
              value={textComment}
              onValueChange={setTextComment}
              placeholder="Add a comment..."
              endContent={<FaceChevronIcon isToggleChevron={isOpenEmoji} onClick={handleOpenEmojiClick} />}
            />
            <div className={"w-full absolute left-0 top-full z-50"}>
              <EmojiPicker
                open={isOpenEmoji}
                style={{
                  width: "100%",
                  marginTop: "5px",
                }}
                onEmojiClick={handleEmojiClick}
                searchDisabled
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              onClick={handleCommentForm}
              color={"primary"}
              variant={"ghost"}
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentForm;
