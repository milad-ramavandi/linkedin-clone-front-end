"use client"
import { Post } from "@/types/post";
import { Avatar, Button, Card, Image } from "@nextui-org/react";
import TimeAgo from "react-timeago";
import React from "react";
import PostOptions from "../post-options";
import { useSession } from "next-auth/react";
import DropdownPost from "../drop-down-post";

const PostFeed = (props: Post) => {
  const session = useSession()
  return (
    <div className="bg-white rounded-md border p-4 space-y-3">
      <div
        className={`flex items-center ${
          props.isEdited
            ? "justify-between"
            : 'justify-end'
        }`}
      >
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

        {session.data?.user?.name === props.user.userName && <DropdownPost {...props} />}
      </div>

      <div className="flex items-center space-x-2">
        <Avatar src={props.user.userImage} showFallback isBordered/>
        <div className="text-xs text-gray-400">
          <p>{props.user.userName}</p>
          <TimeAgo date={props.createdAt as Date} suppressHydrationWarning />
        </div>
      </div>

      <p>{props.text}</p>
      {props.postImage && (
        // <div className="relative w-full h-[300px] sm:h-[400px]">
        //   <Image
        //     src={props.postImage}
        //     alt={props.text}
        //     fill
        //     className="object-contain"
        //   />
        // </div>
        <Card className="sm:w-3/4 mx-auto h-[300px] sm:h-[400px]">
          <Image
            removeWrapper
            className="w-full h-full object-cover"
            src={props?.postImage}
            alt="preview"
          />
        </Card>
      )}
      <PostOptions post={props} />
    </div>
  );
};

export default PostFeed;
