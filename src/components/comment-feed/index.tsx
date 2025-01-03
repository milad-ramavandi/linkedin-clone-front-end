"use client";
import { Comment } from "@/types/comment";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@nextui-org/react";
import React, { MouseEventHandler, useState } from "react";
import TimeAgo from "react-timeago";
import CommentFeedModal from "../comment-feed-modal";
import { IReaction } from "@/types/reaction";
import AvatarGroupReactions from "../avatar-group-reactions";
import { useSession } from "next-auth/react";
import DeleteIcon from "../icons/delete-icon";
import EditIcon from "../icons/edit-icon";
import { deleteCommentAction } from "@/actions/comment";
import { toast } from "react-toastify";

const CommentFeed = (props: Comment) => {
  const session = useSession();
  const [isLoadingDeleteButton, setIsLoadingDeleteButton] =
  useState<boolean>(false);
   
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const handleOpenModal: MouseEventHandler = () => {
    onOpen();
  };
  const deleteComment: () => Promise<void> = async () => {
      setIsLoadingDeleteButton(true);
      const { status, message } = await deleteCommentAction(
        props?.id as string,
        props.postID
      );
      if (status === 200) {
        toast.success(message);
        onClose();
      } else {
        toast.error(message);
        onClose();
      }
      setIsLoadingDeleteButton(false);
    };
  return (
    <>
      <Card className="w-[95%] md:w-3/4 ml-1 md:ml-2">
        <CardBody>
          <div className="flex justify-between items-center mb-3">
            <Avatar src={props?.user?.userImage} showFallback isBordered />
            <div className="text-xs text-gray-400 flex justify-end">
              <TimeAgo date={props?.createdAt as Date} />
            </div>
          </div>
          <p className={"font-semibold text-medium truncate text-left"}>
            {props?.user?.userName}
          </p>

          <p>{props?.text}</p>
          <AvatarGroupReactions reactions={props?.reactions as IReaction[]} />
        </CardBody>
        <hr/>
        <CardFooter>
          {session?.data?.user?.email === props?.user?.userId && (
            <div className="flex items-center space-x-2">
              <Button
                color={"danger"}
                isIconOnly
                onClick={deleteComment}
                isLoading={isLoadingDeleteButton}
                isDisabled={isLoadingDeleteButton}
                title="Delete comment"
              >
                <DeleteIcon />
              </Button>
              <Button
                isIconOnly
                color={"warning"}
                onClick={handleOpenModal}
                title="Edit comment"
              >
                <EditIcon />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>

      <CommentFeedModal
        comment={props}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default CommentFeed;
