import mongoose, {model, Schema} from "mongoose";





export interface IUser extends Document{
    _id:string,
    email:string,
    username:string,
    password:string,
    created:Date,
    active:boolean,
    profilePicture?:string,
}

const userSchema = new Schema<IUser>({

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
    },

    profilePicture:{
        type:String,
        required:false
    }

});


const User = model<IUser>("User", userSchema);


export default User;