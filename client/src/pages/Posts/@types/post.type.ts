



export type PostType = {
    _id:string,
    title:string,
    content:string,
    creatorUserId:{
        _id:string,
        username:string,
        email:string,
    }
}