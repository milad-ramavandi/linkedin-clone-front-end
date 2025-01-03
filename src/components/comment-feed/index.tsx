"use client";
import { Comment } from "@/types/comment";
import { Avatar, useDisclosure } from "@nextui-org/react";
import React, { MouseEventHandler } from "react";
import TimeAgo from "react-timeago";
import CommentFeedModal from "../comment-feed-modal";
import { IReaction } from "@/types/reaction";
import AvatarGroupReactions from "../avatar-group-reactions";

const CommentFeed = (props: Comment) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const handleOpenModal: MouseEventHandler = () => {
    onOpen();
  };
  return (
    <>
      <div
        className="bg-gray-100 px-4 py-2 space-y-2 rounded-md w-full md:w-3/4 cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="flex justify-between items-center">
          <Avatar src={props?.user?.userImage} showFallback isBordered />
          <div className="text-xs text-gray-400 flex justify-end">
            <TimeAgo date={props?.createdAt as Date} />
          </div>
        </div>

        <p className={"font-semibold text-medium truncate text-left"}>
          {props?.user?.userName}
        </p>

        <p>{props?.text}</p>
        <AvatarGroupReactions reactions={props?.reactions as IReaction[]}/>
      </div>

      <CommentFeedModal
        comment={props}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default CommentFeed;
