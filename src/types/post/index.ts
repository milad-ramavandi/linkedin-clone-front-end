import { Comment } from "../comment";
import { User } from "../user";

export interface Post {
  id:string
  user: User;
  text: string;
  postImage?: any;
  comments?: Comment[];
  likes?: string[];
  createdAt: Date;
  isEdited?: boolean;
  reposts?:string[]
}


