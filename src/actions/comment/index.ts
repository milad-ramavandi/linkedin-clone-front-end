"use server";
import { User } from "@/types/user";
import { revalidatePath } from "next/cache";

export const addCommentAction = async (
  user: User,
  postID: string,
  textComment: string
) => {
  try {
    const commentDB = {
      user,
      postID,
      text: textComment,
    };
    const res = await fetch(`${process.env.DATABASE_URL}comments`, {
      method: "POST",
      body: JSON.stringify(commentDB),
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

export const editCommentAction = async (
  postID: string,
  commentID: string,
  text: string
) => {
  try {
    const res = await fetch(
      `${process.env.DATABASE_URL}comments?` +
        new URLSearchParams({
          "commentID": commentID,
          "postID": postID,
        }).toString(),
      {
        method: "PUT",
        body:JSON.stringify({text}),
        headers:{
          "content-type":"application/json"
        }
      }
    );
    const data = await res.json();
    revalidatePath("/")
    return data
  } catch (error) {
    console.log(error)
  }
};

export const deleteCommentAction = async (
  commentID: string,
  postID: string
) => {
  try {
    const res = await fetch(
      `${process.env.DATABASE_URL}comments?` +
        new URLSearchParams({
          commentID: commentID,
          postID: postID,
        }).toString(),
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

export const addReactionCommentAction = async (
  postID: string,
  commentID: string,
  userID: string,
  userImage: string,
  codeReaction: string
) => {
  try {
    const reactionDB = {
      postID,
      commentID,
      userID,
      userImage,
      codeReaction,
    };
    const res = await fetch(`${process.env.DATABASE_URL}reactions`, {
      method: "POST",
      body: JSON.stringify(reactionDB),
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

export const deleteReactionCommentAction = async (
  postID: string,
  commentID: string,
  userID: string
) => {
  try {
    const res = await fetch(
      `${process.env.DATABASE_URL}reactions?` +
        new URLSearchParams({
          postID: postID,
          commentID: commentID,
          userID: userID,
        }).toString(),
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

export const editReactionCommentAction = async (
  postID: string,
  commentID: string,
  userID: string,
  codeReaction: string
) => {
  try {
    const res = await fetch(
      `${process.env.DATABASE_URL}reactions?` +
        new URLSearchParams({
          postID: postID,
          commentID: commentID,
          userID: userID,
        }).toString(),
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ codeReaction }),
      }
    );
    const data = await res.json();
    revalidatePath("/")
    return data;
  } catch (error) {
    console.log(error);
  }
};
