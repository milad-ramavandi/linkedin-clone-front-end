import { Comment } from "../comment";   
import { User } from "../user";

export interface Post {
  _id?:string
  user: User;
  text: string;
  postImage?: any;
  createdAt?: Date;
  isEdited?:boolean;
  comments?:Comment[];
  likes?:string[]
}


