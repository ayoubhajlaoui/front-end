import { PostModel } from "./shared/post-model";

export interface NotificationModel{
    id:number;
    vue:boolean;
    message:string;
    postId:number;
    subredditId:number;
    imageUrl: string

}  