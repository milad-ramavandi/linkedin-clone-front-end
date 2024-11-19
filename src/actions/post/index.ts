"use server";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";

export const addPostAction = async (text: string, file: any) => {
  try {
    const user = await currentUser();
    const userServer: User = {
      userId: user?.id as string,
      userImage: user?.imageUrl as string,
      fullName: user?.fullName as string,
    };

    const body: Post = {
      id: uuidv4(),
      user: userServer,
      text: text,
      postImage: file && file,
      createdAt: new Date(),
    };
    await fetch(`${process.env.URL}/posts`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
};

export const deletePostAction = async (id: string) => {
  try {
    await fetch(`${process.env.URL}/posts/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
};

export const editPostAction = async (post: Post, text: string, file: any) => {
  try {
    await fetch(`${process.env.URL}/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...post, text, postImage: file, isEdited: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
};

export const likeOrUnlikePostAction = async (post: Post, isLiked: boolean) => {
  try {
    const user = await currentUser();
    const likes = post.likes === undefined ? [] : post.likes;
    const newLikes = !isLiked
      ? [...likes, user?.id]
      : likes.filter((item) => item !== user?.id);
    await fetch(`${process.env.URL}/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...post,
        likes: newLikes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
};

export const rePostAction = async (post: Post, isRepost:boolean) => {
  try {
    const user = await currentUser();
    const reposts = post.reposts === undefined ? [] : post.reposts
    const newReposts = !isRepost ? [...reposts, user?.imageUrl] : reposts.filter(item => item !== user?.imageUrl)
    await fetch(`${process.env.URL}/posts/${post.id}`, {
      method:"PUT",
      body: JSON.stringify({
          ...post,
          reposts:newReposts
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
};
