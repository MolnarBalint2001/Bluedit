



export type PostType = {
    _id:string,
    title:string,
    content:string,
    createdAt:Date,
    likes:number,
    superlikes:number,
    creatorUserId:{
        _id:string,
        username:string,
        email:string,
        profileColor?:string
    }
}