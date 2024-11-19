"use client";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { addPostAction } from "@/actions/post";
import { useRouter } from "next/navigation";
import PreviewImage from "../preview-image";
import { toast } from "react-toastify";
import FaceIcon from "../face-smile";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { MouseDownEvent } from "emoji-picker-react/dist/config/config";


const PostForm = () => {
  const { user } = useUser();
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<any>(null);
  const [text, setText] = useState<string>("");
  const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false)
  const router = useRouter();

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
  const handleOpenFileClick: MouseEventHandler = () => fileRef.current?.click();

  const handlePreviewClick: MouseEventHandler = () => {
    setFile(null);
  };

  const handlePostForm: MouseEventHandler = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    e.preventDefault();
    if(!text) {
      toast.error('Post input is required')
      return
    }
    setFile(null);
    setText("");
    setIsOpenEmoji(false)
    toast.promise(addPostAction(text, file), {
      pending:'Add post pending',
      success:'Add post successfully',
      error:'Failed to add post'
    })
    router.refresh();
  };
  const handleOpenEmojiClick:MouseEventHandler = () => setIsOpenEmoji(prev =>!prev)
  const handleEmojiClick:MouseDownEvent = (emoji:EmojiClickData) => {
    setText(prev => `${prev}${emoji.emoji}`)
  }
  return (
    <div className="p-3 bg-white rounded-lg space-y-3">
      <form>
        <div className={"flex items-center space-x-2"}>
          <Avatar src={user?.imageUrl} showFallback />
          <Input
            type="text"
            name="text"
            value={text}
            onValueChange={setText}
            placeholder="Start writing a post..."
            autoComplete={"off"}
            endContent={<FaceIcon onClick={handleOpenEmojiClick}/>}
          />
          <input
            type="file"
            name="file"
            className="hidden"
            ref={fileRef}
            onChange={handleImageChange}
          />
        </div>
        <div className="hidden">
          <Button type="submit" onClick={handlePostForm}>
            Submit
          </Button>
        </div>
      </form>
      <EmojiPicker open={isOpenEmoji} style={{
        width:"75%",
        margin:"10px auto",
        backgroundColor:'#f1f5f9'
      }}
      onEmojiClick={handleEmojiClick}
      />
      <PreviewImage
        file={file}
        handleOpenFileClick={handleOpenFileClick}
        handlePreviewClick={handlePreviewClick}
      />
    </div>
  );
};

export default PostForm;
