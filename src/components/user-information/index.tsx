import { Post } from "@/types/post";
import { currentUser } from "@clerk/nextjs/server";
import { Avatar } from "@nextui-org/react";
import React from "react";

const UserInformation = async () => {
  const user = await currentUser();
  const res = await fetch('http://localhost:8000/posts');
  const posts:Post[] = await res.json()
  const userPosts = posts?.filter((item) => item.user.userId === user?.id);
  const userComments = posts
    ?.flatMap((item) =>
      item.comments?.filter((item) => item.user.userId === user?.id)
    )
    .filter((item) => item !== undefined);

  return (
    <div
      className={
        "flex flex-col justify-center items-center bg-white rounded-lg border py-4"
      }
    >
      <Avatar src={user?.imageUrl} showFallback size={"lg"} />

      <p className={"font-semibold"}>{user?.fullName}</p>

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
