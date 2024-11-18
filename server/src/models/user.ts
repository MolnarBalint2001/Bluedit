import mongoose, {model, Schema} from "mongoose";





export interface IUser {
    _id:string,
    email:string,
    username:string,
    password:string,
    created:Date,
    active:boolean
}

const userSchema = new Schema({

    email: {
        index: true,
        unique:true,
        type:String
    },
    username:{
        index: true,
        unique:true,
        type:String,
        maxLength:50,
        minLength: 4
    },
    password:{
        type:String,
    },
    created:{
        type:Date,
        default: new Date()
    },
    active:{
        type:Boolean
    }

});


const User = model<IUser>("User", userSchema);


export default User;