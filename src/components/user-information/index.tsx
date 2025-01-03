import { getAllContacts } from "@/actions/contact";
import { getAllPosts } from "@/actions/post";
import { auth } from "@/auth";
import { Comment } from "@/types/comment";
import { IContact } from "@/types/contact";
import { Post } from "@/types/post";
import { Avatar } from "@nextui-org/react";

const UserInformation = async () => {
  const session = await auth();
  const { data: posts } = await getAllPosts();
  const { data: contacts } = await getAllContacts();
  const userPosts = posts?.filter(
    (item: Post) => item.user.userId === session?.user?.email
  );
  const userComments: Comment[] = posts
    ?.flatMap((item: Post) =>
      item.comments?.filter((item) => item.user.userId === session?.user?.email)
    )
    .filter((item: Comment | undefined) => item !== undefined);
  const userFollowing = contacts
    ?.flatMap((item: IContact) =>
      item.followers?.filter((item) => item === session?.user?.email)
    )
    .filter((item: string | undefined) => item !== undefined);
  return (
    <div
      className={
        "flex flex-col space-y-1 justify-center items-center bg-white rounded-lg border py-4"
      }
    >
      <Avatar
        src={session?.user?.image as string}
        showFallback
        size={"lg"}
        isBordered
      />

      <p className={"font-semibold"}>{session?.user?.name}</p>
      <p
        className={"text-sm text-gray-400 w-3/4 truncate lg:w-full text-center"}
      >
        {session?.user?.email}
      </p>
      <hr className={"w-full text-gray-200 my-5"} />
      <div className={"w-full flex justify-between text-xs px-4"}>
        <p className={"font-semibold text-gray-400"}>Posts</p>
        <p className={"text-blue-400"}>{userPosts?.length}</p>
      </div>
      <div className={"w-full flex justify-between text-xs px-4"}>
        <p className={"font-semibold text-gray-400"}>Comments</p>
        <p className={"text-blue-400"}>{userComments?.length}</p>
      </div>
      <div className={"w-full flex justify-between text-xs px-4"}>
        <p className={"font-semibold text-gray-400"}>Following</p>
        <p className={"text-blue-400"}>{userFollowing?.length}</p>
      </div>
    </div>
  );
};

export default UserInformation;
