"use client";
import { addCommentAction } from "@/actions/comment";
import { Post } from "@/types/post";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { MouseEventHandler, useState } from "react";
import { toast } from "react-toastify";
import FaceIcon from "../face-smile";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MouseDownEvent } from "emoji-picker-react/dist/config/config";
import { useMutation, useQueryClient } from "react-query";

const CommentForm = ({ post }: { post: Post }) => {
  const [textComment, setTextComment] = useState<string>("");
  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false);
  const user = useUser();
  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationKey:'add-comment',
    mutationFn:() => toast.promise(addCommentAction(post, textComment), {
      pending: "Add comment is pending",
      success: "Add comment successfully",
      error: "Failed to add comment",
    }),
    onSuccess : () => queryClient.invalidateQueries('get-posts')
  })
  const handleCommentForm: MouseEventHandler = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault();
    if (!textComment) {
      toast.error("Comment input is required");
      return;
    }

    mutate()
    setTextComment("");
    setIsOpenEmoji(false)
  };
  const handleOpenEmojiClick: MouseEventHandler = () =>
    setIsOpenEmoji((prev) => !prev);
  const handleEmojiClick: MouseDownEvent = (emoji: EmojiClickData) => {
    setTextComment((prev) => `${prev}${emoji.emoji}`);
  };
  return (
    <>
      <div className="flex space-x-2">
        <Avatar src={user.user?.imageUrl} showFallback />
        <form className="flex-grow">
          <Input
            value={textComment}
            onValueChange={setTextComment}
            placeholder="Add a comment..."
            endContent={<FaceIcon onClick={handleOpenEmojiClick} />}
          />
          <Button type="submit" className="hidden" onClick={handleCommentForm}>
            Submit
          </Button>
        </form>
      </div>
      <EmojiPicker
        open={isOpenEmoji}
        style={{
          width: "75%",
          height:'300px',
          margin: "10px auto",
          backgroundColor: "#f1f5f9",
        }}
        onEmojiClick={handleEmojiClick}
      />
    </>
  );
};

export default CommentForm;
