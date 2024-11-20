"use server";

import { Comment } from "@/types/comment";
import { Post } from "@/types/post";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";

export const addCommentAction = async (post: Post, textComment: string) => {
  try {
    const user = await currentUser();
    const commentServer: Comment = {
      id: uuidv4(),
      user: {
        userId: user?.id as string,
        userImage: user?.imageUrl as string,
        fullName: user?.fullName as string,
      },
      text: textComment,
      createdAt: new Date(),
    };
    await fetch(`${process.env.NEXT_URL}/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...post,
        comments:
          post.comments === undefined
            ? [commentServer]
            : [...post.comments, commentServer],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(`Server error: ${error}`)
  }
};
