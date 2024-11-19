"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import EditIcon from "../edit-icon";
import DeleteIcon from "../delete-icon";
import { deletePostAction, editPostAction } from "@/actions/post";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";
import PreviewImage from "../preview-image";
import { toast } from "react-toastify";

const EllipsisVertical = (props: Post) => {
  const [text, setText] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const router = useRouter();

  const handleDeletePost: MouseEventHandler = async () => {
    toast.promise(deletePostAction(props.id), {
      pending:'Delete post pending',
      success:'Delete post successfully',
      error:'Failed to delete post'
    })
    router.refresh();
  };
  const handleOpenModalClick: MouseEventHandler = () => onOpen();
  const handleOpenFileClick: MouseEventHandler = () => fileRef.current?.click();
  const handlePreviewClick: MouseEventHandler = () => setFile(null);
  const handleImageChange: ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files?.[0]);
    }
    reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
      setFile(readerEvent.target?.result);
    };
  };
  const handleEditPostClick: MouseEventHandler = async () => {
    toast.promise(editPostAction(props, text, file), {
      pending:'Edit post pending',
      success:'Edit post successfully',
      error:'Failed to edit post'
    })
    onClose();
    setText("");
    setFile(null);
    router.refresh();
  };
  const handleCloseModalCLick: MouseEventHandler = () => {
    setText("");
    setFile(null);
    onClose();
  };
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
            className="size-6"
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"4xl"}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Edit post</ModalHeader>
          <ModalBody>
            <div className="flex flex-col space-y-6 sm:flex sm:flex-row sm:space-x-6 sm:space-y-0">
              <Textarea
                label="Description"
                variant="bordered"
                placeholder="Enter your description"
                disableAnimation
                disableAutosize
                classNames={{
                  input: "resize-y sm:min-h-[200px]",
                }}
                value={text}
                onValueChange={setText}
              />

              <input
                type="file"
                className="hidden"
                ref={fileRef}
                onChange={handleImageChange}
              />

              <PreviewImage
                file={file}
                handleOpenFileClick={handleOpenFileClick}
                handlePreviewClick={handlePreviewClick}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onClick={handleCloseModalCLick}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={handleEditPostClick}>
              Apply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EllipsisVertical;
