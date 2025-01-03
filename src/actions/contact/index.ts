"use server";

import { revalidatePath } from "next/cache";


export const getAllContacts = async () => {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}contacts`)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}


export const handleFollowOrUnfollowAction = async (
  userID:string,
  contactID:string
) => {
  try {
    const res = await fetch(`${process.env.DATABASE_URL}contacts?` + new URLSearchParams({"contactID":contactID}), {
      method: "PUT",
      body: JSON.stringify({userID}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    revalidatePath("/");
    return data
  } catch (error) {
    console.log(`Server error: ${error}`);
  }
  
};
