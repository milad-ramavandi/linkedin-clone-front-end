import React from "react";
import PostFeed from "../post-feed";
import { Post } from "@/types/post";

const PostsFeed = async () => {
  const res = await fetch(`${process.env.DATABASE_URL}posts`);
  const {data:posts} = await res.json();
  return (
    <div className="space-y-4">
      {posts
        ?.slice(0)
        .reverse()
        .map((item: Post) => {
          return <PostFeed key={item._id} {...item} />;
        })}
    </div>
  );
};

export default PostsFeed;
