"use client";
import { Post } from "@/types/post";
import { Button } from "@nextui-org/react";
import React, { MouseEventHandler, useState } from "react";
import ShareIcon from "../share-icon";
import CommentIcon from "../comment-icon";
import CommentForm from "../comment-form";
import CommentsFeed from "../comments-feed";
import ShareOptions from "../share-options";
import ButtonLike from "../button-like";
import ButtonRepost from "../button-repost";

const PostOptions = ({ post }: { post: Post }) => {
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);

  const handleBoxCommentClick: MouseEventHandler = () =>
    setIsCommentOpen((prev) => !prev);

  const handleShareOptionsClick: MouseEventHandler = () =>
    setIsShareOpen((prev) => !prev);

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
            >
              {post.comments.length} comments
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-2 lg:grid-cols-2 xl:grid-cols-4 border-t pt-1">
        <ButtonLike post={post} />
        <Button
          type="button"
          startContent={<CommentIcon isCommentOpen={isCommentOpen} />}
          variant={"ghost"}
          onClick={handleBoxCommentClick}
        >
          Comment
        </Button>

        <ButtonRepost post={post} />
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
