"use client";
import { Post } from "@/types/post";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import ArrowPath from "../arrow-path";

const ButtonRepost = ({ post }: { post: Post }) => {
  const [isRepost, setIsRepost] = useState<boolean>(false);
  const [reposts] = useState<string[]>(
    post.reposts === undefined ? [] : post.reposts
  );
  const session = useSession();
  const queryClient = useQueryClient();

  const { mutate: repostMutate } = useMutation({
    mutationKey: [`${isRepost ? "UnRepost" : "Repost"}-post`],
    mutationFn: () => {
      const promise = async () => {
        const reposts = post.reposts === undefined ? [] : post.reposts;
        const newReposts = !isRepost
          ? [...reposts, session.data?.user?.image]
          : reposts.filter((item) => item !== session.data?.user?.image);
        await fetch(`${process.env.NEXT_URL}posts/${post.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...post,
            reposts: newReposts,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      };
      return toast.promise(promise, {
        pending: `${isRepost ? "UnReposting" : "Reposting"} is pending...`,
        success: `${isRepost ? "UnReposting" : "Reposting"} is successfully`,
        error: `Failed to ${isRepost ? "UnReposting" : "Reposting"}`,
      });
    },
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });
  const handleRepostClick: MouseEventHandler = () => {
    repostMutate();
    setIsRepost((prev) => !prev);
  };
  useEffect(() => {
    if (reposts?.includes(session.data?.user?.image as string)) {
      setIsRepost(true);
    }
  }, [session.data?.user]);
  return (
    <Button
      type="button"
      startContent={<ArrowPath />}
      variant={"ghost"}
      onClick={handleRepostClick}
    >
      Repost
    </Button>
  );
};

export default ButtonRepost;
