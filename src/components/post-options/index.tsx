"use client";
import { Post } from "@/types/post";
import { Button } from "@nextui-org/react";
import React, { MouseEventHandler, useState } from "react";
import ShareIcon from "../icons/share-icon";
import CommentIcon from "../icons/comment-icon";
import CommentForm from "../comment-form";
import CommentsFeed from "../comments-feed";
import ButtonLike from "../button-like";
import ArrowPath from "../icons/arrow-path";
import { Comment } from "@/types/comment";

const PostOptions = ({ post }: { post: Post }) => {
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const handleBoxCommentClick: MouseEventHandler = () => {
    setIsCommentOpen((prev) => !prev);
  };
  return (
    <div>
      <div className={`flex ${post?.likes && post?.likes?.length > 0 ? "justify-between" : "justify-end" } mb-1`}>
        { post?.likes && post?.likes?.length > 0 ? <div className="text-xs text-gray-500 hover:underline">{post?.likes?.length} Likes</div> : null}
        { post?.comments && post?.comments?.length > 0 ? <div className="text-xs text-gray-500 hover:underline">{post?.comments?.length} Comments</div> : null}

      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4 border-t pt-1">
        <ButtonLike post={post} />
        <Button
          type="button"
          startContent={<CommentIcon isCommentOpen={isCommentOpen} />}
          variant={"ghost"}
          onClick={handleBoxCommentClick}
        >
          Comment
        </Button>

        <Button type="button" startContent={<ArrowPath />} variant={"ghost"}>
          Repost
        </Button>
        <Button type="button" startContent={<ShareIcon />} variant={"ghost"}>
          Send
        </Button>
      </div>
      {isCommentOpen && (
        <div className={"space-y-4 mt-4"}>
          <CommentForm postID={post?._id as string} />
          {post?.comments && post?.comments?.length > 0 && <CommentsFeed comments={post?.comments as Comment[]} />}
        </div>
      )}
    </div>
  );
};

export default PostOptions;
