export class CreatePostPayload {
    postName: string ;
    subredditName?: string;
    url?: string;
    description: string;
    targetNames:string;
    fileName: string;
}