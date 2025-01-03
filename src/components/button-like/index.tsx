"use client";
import { Post } from "@/types/post";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import LikeIcon from "../icons/like-icon";
import { toast } from "react-toastify";
import {
  likePostAction,
  unlikePostAction,
} from "@/actions/post";

const ButtonLike = ({ post }: { post: Post }) => {
  const toastID = useRef<any>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const session = useSession();

  const handleLikeOrUnlikePostClick: () => Promise<void> = async () => {
    toastID.current = toast.loading(
      `${isLiked ? "Unlike" : "Like"} post is pending...`
    );

    const { status, message } = isLiked
      ? await unlikePostAction(session?.data?.user?.email as string, post?._id as string)
      : await likePostAction(
          session?.data?.user?.email as string,
          post?._id as string
        );

    toast.update(toastID.current, {
      render: message,
      type: `${status === 201 || 200 ? "success" : "error"}`,
      isLoading: false,
      autoClose: 3000,
      closeButton: true,
    });
    setIsLiked(status === 201 ? true : false);
  };
  useEffect(() => {
    const isUserLikePost = post?.likes?.some(
      (item) => item === session?.data?.user?.email
    );
    if (isUserLikePost) {
      setIsLiked(true);
    }
  }, [session.data?.user]);
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
