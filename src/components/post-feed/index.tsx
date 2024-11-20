"use client";
import { Post } from "@/types/post";
import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import TimeAgo from "react-timeago";
import React from "react";
import EllipsisVertical from "../ellipsis-vertical";
import Image from "next/image";
import PostOptions from "../post-options";
import { useUser } from "@clerk/nextjs";

const PostFeed = (props: Post) => {
  const user = useUser();
  return (
    <div className="bg-white rounded-md border p-4 space-y-3">
      {props.reposts && props.reposts.length > 0 && (
        <div
          className={`flex items-center ${
            user.user?.id === props.user.userId
              ? "justify-between"
              : "justify-end"
          }`}
        >
          <div className="flex items-center space-x-1">
            {props.reposts.map((item) => (
              <AvatarGroup key={item} size={"sm"}>
                <Avatar src={item} showFallback />
              </AvatarGroup>
            ))}
            <p className="text-gray-400 text-xs">reposted this</p>
          </div>
          {user.user?.id === props.user.userId && (
            <EllipsisVertical {...props} />
          )}
        </div>
      )}
      {props.isEdited && (
        <Button
          color={"default"}
          size={"sm"}
          radius="full"
          variant={"faded"}
          isDisabled
        >
          Edited
        </Button>
      )}
      <div className={"flex justify-between items-center"}>
        <div className="flex items-center space-x-2">
          <Avatar src={props.user.userImage} showFallback />
          <div className="text-xs text-gray-400">
            <p>{props.user.fullName}</p>
            <TimeAgo date={props.createdAt} suppressHydrationWarning />
          </div>
        </div>
        {props.reposts && props.reposts.length > 0
          ? null
          : user.user?.id === props.user.userId && (
              <EllipsisVertical {...props} />
            )}
      </div>
      <p>{props.text}</p>
      {props.postImage && (
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <Image
            src={props.postImage}
            alt={props.text}
            fill
            className="object-contain"
          />
        </div>
      )}
      <PostOptions post={props} />
    </div>
  );
};

export default PostFeed;
