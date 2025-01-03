import { IReaction } from "../reaction";
import { User } from "../user";

export interface Comment {
   id:string,
   user:User,
   text:string;
   postID:string,
   createdAt?: Date
   reactions?:IReaction[]
}