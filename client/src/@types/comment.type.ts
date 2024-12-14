



export type CommentType = {
    _id:string,
    content:string,
    creatorUserId:{
        _id:string,
        username:string,
        email:string,
        profilePicture:string,
        profileColor:string
    }
    createdAt:Date
}