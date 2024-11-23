"use client";
import React from "react";
import PostFeed from "../post-feed";
import { Post } from "@/types/post";
import useGetPosts from "@/hooks/posts";
import { Avatar, AvatarGroup } from "@nextui-org/react";

const PostsFeed = () => {
  const { data } = useGetPosts();
  return (
    <div className="space-y-4 pb-20 h-screen overflow-auto scrollbar-hide">
      {data
        ?.slice(0)
        .reverse()
        .map((item: Post) => {
          return (
            <div key={item.id} className={'space-y-[2px]'}>
              {item.reposts && item.reposts.length > 0 && (
                <div className="flex items-center space-x-1 bg-blue-100 rounded-md p-1">
                  {item.reposts.map((item) => (
                    <AvatarGroup key={item} size={"sm"}>
                      <Avatar src={item} showFallback />
                    </AvatarGroup>
                  ))}
                  <p className="text-gray-500 text-xs">reposted this</p>
                </div>
              )}
              <PostFeed key={item.id} {...item} />
            </div>
          );
        })}
    </div>
  );
};

export default PostsFeed;
