"use client";

import {
  addReactionCommentAction,
  deleteCommentAction,
  deleteReactionCommentAction,
  editCommentAction,
  editReactionCommentAction,
} from "@/actions/comment";
import { Comment } from "@/types/comment";
import { IReaction } from "@/types/reaction";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import TimeAgo from "react-timeago";
import DeleteIcon from "../delete-icon";
import { toast } from "react-toastify";
import EditIcon from "../edit-icon";
import FaceChevronIcon from "../face-chevron-icon";
import AvatarGroupReactions from "../avatar-group-reactions";
import XMarkIcon from "../x-mark-icon";

const CommentFeedModal = ({
  isOpen,
  onClose,
  onOpenChange,
  comment,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  comment: Comment;
}) => {
  const [isReaction, setIsReaction] = useState<boolean>(false);
  const [codeReactedUser, setCodeReactedUser] = useState<string>("");
  const [isShowTextArea, setIsShowTextArea] = useState<boolean>(false);
  const [isOpenBoxEmoji, setIsOpenBoxEmoji] = useState<boolean>(false);
  const session = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingDeleteButton, setIsLoadingDeleteButton] =
    useState<boolean>(false);
  const [isLoadingEditButton, setIsLoadingEditButton] =
    useState<boolean>(false);
  const [text, setText] = useState<string>(comment?.text);

  const handleEmoji: (e: EmojiClickData) => Promise<void> = async (
    e: EmojiClickData
  ) => {
    if (!isReaction) {
      setIsLoading(true);
      const { status } = await addReactionCommentAction(
        comment.postID,
        comment.id,
        session?.data?.user?.email as string,
        session?.data?.user?.image as string,
        e.unified
      );
      if (status === 201) {
        setIsReaction(true);
        onClose();
      }
      setIsLoading(false);
      return;
    } else {
      setIsLoading(true);
      const { status } =
        codeReactedUser === e.unified
          ? await deleteReactionCommentAction(
              comment?.postID,
              comment?.id,
              session?.data?.user?.email as string
            )
          : await editReactionCommentAction(
              comment?.postID,
              comment?.id,
              session?.data?.user?.email as string,
              e.unified
            );
      if (status === 200) {
        setIsReaction(codeReactedUser === e.unified ? false : true);
        onClose();
      }
      setIsLoading(false);
    }
  };
  const deleteComment: () => Promise<void> = async () => {
    setIsLoadingDeleteButton(true);
    const { status, message } = await deleteCommentAction(
      comment?.id as string,
      comment.postID
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
  const showTextarea: () => void = () => {
    setIsShowTextArea(true);
  };
  const handleShowBoxEmoji: () => void = () => {
    setIsOpenBoxEmoji((prev) => !prev);
  };
  const editComment: () => Promise<void> = async () => {
    setIsLoadingEditButton(true);
    const { status, message } = await editCommentAction(
      comment?.postID,
      comment?.id,
      text
    );
    if (status === 200) {
      toast.success(message);
      onClose();
    } else {
      toast.error(message);
      onClose();
    }
    setIsLoadingEditButton(false);
    setIsShowTextArea(false);
  };
  const addEmojiToText: (e: EmojiClickData) => void = (e: EmojiClickData) =>
    setText((prev) => `${prev}${e.emoji}`);

  const hideTextarea: () => void = () => setIsShowTextArea(false);

  useEffect(() => {
    comment?.reactions?.map((item: IReaction) => {
      if (item.userID === session?.data?.user?.email) {
        setIsReaction(true);
        setCodeReactedUser(item.codeReaction);
      }
    });
  }, [comment?.reactions, session?.data?.user]);
  return (
    <Modal
      classNames={{
        wrapper: "bg-black",
        base: "overflow-visible bg-black",
        body: "!gap-1",
        header: "flex flex-col space-y-2",
        closeButton: "hidden",
      }}
      isOpen={isOpen}
      size={"2xl"}
      onOpenChange={onOpenChange}
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader>
          {isLoading && (
            <div className="w-full flex justify-center">
              <Spinner
                label="Loading..."
                size="lg"
                color={"white"}
                classNames={{
                  label: "text-white",
                }}
              />
            </div>
          )}
          <div className="w-full flex items-center space-x-2 justify-end">
            {session?.data?.user?.email === comment?.user?.userId && (
              <>
                <Button
                  color={"danger"}
                  isIconOnly
                  size="lg"
                  onClick={deleteComment}
                  isLoading={isLoadingDeleteButton}
                  isDisabled={isLoadingDeleteButton}
                >
                  <DeleteIcon className="size-7" />
                </Button>
                <Button
                  isIconOnly
                  size="lg"
                  color={"warning"}
                  onClick={showTextarea}
                >
                  <EditIcon className="size-6" />
                </Button>
              </>
            )}
            <Button isIconOnly size="lg" onClick={onClose}>
              <XMarkIcon />
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="w-full flex justify-end">
            <EmojiPicker
              reactionsDefaultOpen={true}
              allowExpandReactions={false}
              onReactionClick={handleEmoji}
              style={{
                overflow: "auto",
              }}
            />
          </div>
          <div className="bg-gray-100 px-4 py-2 space-y-2 rounded-md w-full">
            <div className="flex justify-between items-center">
              <Avatar
                src={comment?.user?.userImage}
                showFallback
                className="min-w-10 min-h-10"
                isBordered
              />
              <div className="text-xs text-gray-400 flex justify-end">
                <TimeAgo date={comment?.createdAt as Date} />
              </div>
            </div>

            <p className={"font-semibold text-medium truncate text-left"}>
              {comment?.user?.userName}
            </p>

            {isShowTextArea ? (
              <div className={"relative space-y-2"}>
                <Textarea
                  value={text}
                  onValueChange={setText}
                  variant={"bordered"}
                  color={"primary"}
                  endContent={
                    <FaceChevronIcon
                      isToggleChevron={isOpenBoxEmoji}
                      onClick={handleShowBoxEmoji}
                    />
                  }
                />
                <div className="flex justify-end space-x-2">
                  <Button color="danger" variant="light" onClick={hideTextarea}>
                    Cancel
                  </Button>
                  <Button
                    color={"primary"}
                    variant={"ghost"}
                    onClick={editComment}
                    isDisabled={
                      text === "" ||
                      text === comment.text ||
                      isLoadingEditButton
                    }
                    isLoading={isLoadingEditButton}
                  >
                    Edit
                  </Button>
                </div>
                <div className={"w-full absolute top-7 left-0 z-50"}>
                  <EmojiPicker
                    open={isOpenBoxEmoji}
                    searchDisabled
                    onEmojiClick={addEmojiToText}
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            ) : (
              <p>{comment?.text}</p>
            )}
            {!isShowTextArea && (
              <AvatarGroupReactions
                reactions={comment?.reactions as IReaction[]}
              />
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentFeedModal;
