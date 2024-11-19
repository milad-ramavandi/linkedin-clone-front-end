"use server";

import { IContact } from "@/types/contact";
import { currentUser } from "@clerk/nextjs/server";

export const handleFollowOrUnfollowAction = async (
  contact: IContact,
  followed: boolean
) => {
  try {
    const user = await currentUser();
    const followers = contact.followers === undefined ? [] : contact.followers;
    const newFollowers = !followed
      ? [...followers, user?.id]
      : followers.filter((item) => item !== user?.id);
    await fetch(`http://localhost:8000/contacts/${contact.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...contact, followers: newFollowers }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  } catch (error) {
    console.log(`Server error: ${error}`)
  }
};
