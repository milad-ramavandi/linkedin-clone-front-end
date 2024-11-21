"use client";
import { Post } from "@/types/post";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { MouseEventHandler, useState } from "react";
import { toast } from "react-toastify";
import FaceIcon from "../face-smile";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MouseDownEvent } from "emoji-picker-react/dist/config/config";
import { useMutation, useQueryClient } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { Comment } from "@/types/comment";

const CommentForm = ({ post }: { post: Post }) => {
  const [textComment, setTextComment] = useState<string>("");
  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false);
  const user = useUser();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["add-comment"],
    mutationFn: () => {
      const promise = async () => {
        const commentDB: Comment = {
          id: uuidv4(),
          user: {
            userId: user.user?.id as string,
            userImage: user.user?.imageUrl as string,
            fullName: user.user?.fullName as string,
          },
          text: textComment,
          createdAt: new Date(),
        };
        await fetch(`http://localhost:8000/posts/${post.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...post,
            comments:
              post.comments === undefined
                ? [commentDB]
                : [...post.comments, commentDB],
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      };
      return toast.promise(promise, {
        pending: "Add comment is pending...",
        success: "Add comment successfully",
        error: "Failed to add comment",
      });
    },
    onSuccess : () => queryClient.invalidateQueries('posts')
  });
  const handleCommentForm: MouseEventHandler = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault();
    if (!textComment) {
      toast.error("Comment input is required");
      return;
    }

    mutate();
    setTextComment("");
    setIsOpenEmoji(false);
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
          height: "300px",
          margin: "10px auto",
          backgroundColor: "#f1f5f9",
        }}
        onEmojiClick={handleEmojiClick}
      />
    </>
  );
};

export default CommentForm;
