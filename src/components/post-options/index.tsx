"use client";
import { Post } from "@/types/post";
import { Button } from "@nextui-org/react";
import React, { MouseEventHandler, useEffect, useState } from "react";
import LikeIcon from "../like-icon";
import ArrowPath from "../arrow-path";
import ShareIcon from "../share-icon";
import {
  likeOrUnlikePostAction,
  rePostAction,
} from "@/actions/post";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import CommentIcon from "../comment-icon";
import CommentForm from "../comment-form";
import CommentsFeed from "../comments-feed";
import { toast } from "react-toastify";
import ShareOptions from "../share-options";

const PostOptions = ({ post }: { post: Post }) => {
  const router = useRouter();
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isRepost, setIsRepost] = useState<boolean>(false);
  const [likes] = useState<string[]>(post.likes === undefined ? [] : post.likes);
  const [reposts] = useState<string[]>(post.reposts === undefined ? [] : post.reposts);
  const user = useUser();


  const handleLikeOrUnlikePostClick: MouseEventHandler = () => {
    toast.promise(likeOrUnlikePostAction(post, isLiked), {
      pending: `${isLiked ? "unlike" : "like"} is pending`,
      success: `${isLiked ? "unlike" : "like"} post successfully`,
      error: `Faild to ${isLiked ? "unlike" : "like"} post`,
    });
    setIsLiked((prev) => !prev);
    router.refresh()
  };
  const handleBoxCommentClick: MouseEventHandler = () =>
    setIsCommentOpen((prev) => !prev);

  const handleShareOptionsClick: MouseEventHandler = () =>
    setIsShareOpen((prev) => !prev);

  const handleRepostClick: MouseEventHandler = () => {
    toast.promise(rePostAction(post, isRepost), {
      pending: `${isRepost ? 'UnReposting' : 'Reposting'} is pending`,
      success: `${isRepost ? 'UnReposting' : 'Reposting'} is successfully`,
      error: `Failed to ${isRepost ? 'UnReposting' : 'Reposting'}`,
    });
    setIsRepost(prev => !prev)
    router.refresh()
  };

  useEffect(() => {
    if (likes?.includes(user.user?.id as string)) {
      setIsLiked(true);
    }

  }, [post, user]);
  useEffect(() => {
    if (reposts.includes(user.user?.imageUrl as string)) {
      setIsRepost(true)
    }
  }, [post, user]);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <div>
          {post.likes && post.likes.length > 0 && (
            <p className="text-xs cursor-pointer text-gray-500 hover:underline">
              {post.likes.length} Likes
            </p>
          )}
        </div>
        <div>
          {post.comments && post.comments.length > 0 && (
            <p
              className="text-xs cursor-pointer text-gray-500 hover:underline"
              onClick={handleBoxCommentClick}
            >
              {post.comments.length} comments
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-4 border-t pt-1">
        <Button
          type="button"
          startContent={<LikeIcon liked={isLiked} />}
          variant={"ghost"}
          onClick={handleLikeOrUnlikePostClick}
        >
          Like
        </Button>

        <Button
          type="button"
          startContent={<CommentIcon isCommentOpen={isCommentOpen} />}
          variant={"ghost"}
          onClick={handleBoxCommentClick}
        >
          Comment
        </Button>

        <Button
          type="button"
          startContent={<ArrowPath/>}
          variant={"ghost"}
          onClick={handleRepostClick}
        >
          Repost
        </Button>

        <Button
          type="button"
          startContent={<ShareIcon isShareOpen={isShareOpen} />}
          variant={"ghost"}
          onClick={handleShareOptionsClick}
        >
          Send
        </Button>
      </div>
      {isCommentOpen && (
        <div className={"space-y-4 mt-4"}>
          <CommentForm post={post} />
          <CommentsFeed post={post} />
        </div>
      )}
      {isShareOpen && (
        <>
          <hr className="mt-4 animate-increaseWidth" />
          <ShareOptions />
        </>
      )}
    </div>
  );
};

export default PostOptions;
