"use server";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { revalidatePath } from "next/cache";

export const addPostAction = async (text: string, file: any, user: User) => {
  try {
    const userDB: User = {
      userId: user.userId,
      userImage: user.userImage,
      userName: user.userName,
    };

    const newPost: Post = {
      user: userDB,
      text: text,
      postImage: file && file,
    };
    const res = await fetch(`${process.env.DATABASE_URL}posts`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    revalidatePath("/")
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}posts`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePostAction = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.DATABASE_URL}posts?` +
        new URLSearchParams({ postID: id }).toString(),
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    revalidatePath("/")
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editPostAction = async (
  postID: string,
  text: string,
  preview: string
) => {
  try {
    const res = await fetch(
      `${process.env.DATABASE_URL}posts?` +
        new URLSearchParams({ postID: postID }).toString(),
      {
        method: "PUT",
        body: JSON.stringify({ text, postImage: preview, isEdited: true }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    revalidatePath("/");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const likePostAction = async (userID: string, postID:string) => {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}likes`, {
      method: "POST",
      body: JSON.stringify({
        userID,
        postID
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    revalidatePath("/")
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const unlikePostAction = async (userID: string, postID:string) => {
  try {
    const res = await fetch(
      `${process.env.DATABASE_URL}likes?` +
        new URLSearchParams({ "userID": userID, "postID":postID }).toString(),
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    revalidatePath("/")
    return data;
  } catch (error) {
    console.log(error);
  }
};
