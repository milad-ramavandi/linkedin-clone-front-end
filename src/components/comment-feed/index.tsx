"use client";
import { User } from "@/types/user";
import { Avatar } from "@nextui-org/react";
import React from "react";
import TimeAgo from "react-timeago";

const CommentFeed = ({
  user,
  text,
  createdAt,
}: {
  user: User;
  text: string;
  createdAt: Date;
}) => {
  return (
    <div className="flex space-x-1 md:w-3/4">
      <Avatar src={user.userImage} showFallback />
      <div className="bg-gray-100 px-4 py-2 rounded-md w-full">
        <div className="flex justify-between items-center">
          <p className={"font-semibold text-medium"}>{user.fullName}</p>
          <div className="text-xs text-gray-400">
            <TimeAgo date={createdAt} />
          </div>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default CommentFeed;
