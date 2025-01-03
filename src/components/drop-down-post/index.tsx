"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import React, {
  useRef
} from "react";
import EditIcon from "../edit-icon";
import DeleteIcon from "../delete-icon";
import { Post } from "@/types/post";
import { toast } from "react-toastify";
import { deletePostAction } from "@/actions/post";
import EditPostModal from "../edit-post-modal";

const DropdownPost = (props: Post) => {
  const toastID = useRef<any>(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const handleDeletePost: () => Promise<void> = async () => {
    toastID.current = toast.loading("Delete post is pending...");
    const { status, message } = await deletePostAction(props._id as string);
    toast.update(toastID.current, {
      render:message,
      type:`${status === 200 ? "success" : "error"}`,
      isLoading:false,
      autoClose:3000,
      closeButton:true
    })
  };

  const handleOpenModalClick: () => void = () => onOpen();
  
  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 hover:bg-gray-200 cursor-pointer rounded-full p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            key="edit"
            startContent={<EditIcon />}
            onClick={handleOpenModalClick}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            startContent={<DeleteIcon />}
            onClick={handleDeletePost}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <EditPostModal post={props} isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}/>
    </>
  );
};

export default DropdownPost;
