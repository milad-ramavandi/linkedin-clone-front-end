"use client";

import useGetPosts from "@/hooks/posts";
import { Comment } from "@/types/comment";
import { Post } from "@/types/post";

import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React from "react";

const UserInformation = () => {
  const session = useSession();
  const { data } = useGetPosts();
  const userPosts: Post[] = data?.filter(
    (item: Post) => item.user.fullName === session.data?.user?.name
  );
  const userComments: Comment[] = data
    ?.flatMap((item: Post) =>
      item.comments?.filter(
        (item) => item.user.fullName === session.data?.user?.name
      )
    )
    .filter((item: Comment) => item !== undefined);
  
  return (
    <div
      className={
        "flex flex-col justify-center items-center bg-white rounded-lg border py-4"
      }
    >
      <Avatar
        src={session.data?.user?.image as string}
        showFallback
        size={"lg"}
      />

      <p className={"font-semibold"}>{session.data?.user?.name}</p>
      <p className={'text-sm text-gray-400 w-3/4 truncate lg:w-full text-center'}>{session.data?.user?.email}</p>

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
