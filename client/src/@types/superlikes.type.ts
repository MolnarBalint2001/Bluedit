



export type SuperlikesType = {
    _id:string,
    userId:{
        _id:string,
        username:string
        email:string,
        profileColor?:string
    }
    postId:string,
    createdAt:Date
}