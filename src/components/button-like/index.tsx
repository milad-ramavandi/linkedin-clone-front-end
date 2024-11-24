"use client";
import { Post } from "@/types/post";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import LikeIcon from "../like-icon";
import { toast } from "react-toastify";

const ButtonLike = ({ post }: { post: Post }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes] = useState<string[]>(
    post.likes === undefined ? [] : post.likes
  );
  const session = useSession();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: [`${isLiked ? "Unlike" : "like"}-post`],
    mutationFn: () => {
      const promise = async () => {
        const likes = post.likes === undefined ? [] : post.likes;
        const newLikes = !isLiked
          ? [...likes, session.data?.user?.name]
          : likes.filter((item) => item !== session.data?.user?.name);
        await fetch(`${process.env.AUTH_NEXT_URL}posts/${post.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...post,
            likes: newLikes,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      };
      return toast.promise(promise, {
        pending: `${isLiked ? "unlike" : "like"} is pending...`,
        success: `${isLiked ? "unlike" : "like"} post successfully`,
        error: `Faild to ${isLiked ? "unlike" : "like"} post`,
      });
    },
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });
  useEffect(() => {
    if (likes?.includes(session.data?.user?.name as string)) {
      setIsLiked(true);
    }
  }, [session.data?.user]);
  const handleLikeOrUnlikePostClick: MouseEventHandler = () => {
    mutate()
    setIsLiked((prev) => !prev);
  };
  return (
    <Button
      type="button"
      startContent={<LikeIcon liked={isLiked} />}
      variant={"ghost"}
      onClick={handleLikeOrUnlikePostClick}
    >
      Like
    </Button>
  );
};

export default ButtonLike;
