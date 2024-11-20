'use client'

import useGetPosts from "@/hooks/posts";
import { Comment } from "@/types/comment";
import { Post } from "@/types/post";
import { useUser } from "@clerk/nextjs";
import { Avatar } from "@nextui-org/react";
import React from "react";

const UserInformation = async () => {
  const user = useUser()
  const {data} = useGetPosts()
  const userPosts:Post[] = data?.filter((item:Post) => item.user.userId === user.user?.id);
  const userComments:Comment[] = data
    ?.flatMap((item:Post) =>
      item.comments?.filter((item) => item.user.userId === user.user?.id)
    )
    .filter((item:Comment) => item !== undefined);

  return (
    <div
      className={
        "flex flex-col justify-center items-center bg-white rounded-lg border py-4"
      }
    >
      <Avatar src={user.user?.imageUrl} showFallback size={"lg"} />

      <p className={"font-semibold"}>{user?.user?.fullName}</p>

      <hr className={"w-full text-gray-200 my-5"} />
      <div className={"w-full flex justify-between text-xs px-4"}>
        <p className={"font-semibold text-gray-400"}>Posts</p>
        <p className={"text-blue-400"}>{userPosts?.length}</p>
      </div>
      <div className={"w-full flex justify-between text-xs px-4"}>
        <p className={"font-semibold text-gray-400"}>Comments</p>
        <p className={"text-blue-400"}>{userComments?.length}</p>
      </div>
    </div>
  );
};

export default UserInformation;
