export interface PostModel {
    id: number;
    fileName:string
    postName: string;
    url: string;
    description: string;
    voteCount: number;
    userName: string;
    subredditName: string;
    commentCount: number;
    duration: string;
    upVote: boolean;
    downVote: boolean;
}