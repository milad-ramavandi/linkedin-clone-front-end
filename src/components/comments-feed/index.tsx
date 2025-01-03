"use client";
import CommentFeed from "../comment-feed";
import { Comment } from "@/types/comment";

const CommentsFeed = ({ comments }: { comments:Comment[] }) => {
    return (
      <div className={"space-y-4 h-52 pt-4 pb-10 overflow-auto scrollbar-hide"}>
        {comments
          ?.slice(0)
          .reverse()
          .map((item: Comment) => (
            <CommentFeed key={item.id} {...item} />
          ))}
      </div>
    );
};

export default CommentsFeed;
