import mongoose, {model, Schema} from "mongoose";


interface IFollow extends Document {
    _id:mongoose.Types.ObjectId
    followerId: mongoose.Types.ObjectId,
    followedId: mongoose.Types.ObjectId,
    createdAt: Date;
    status?: 'pending' | 'accepted' | 'rejected';
    active:boolean,
}



const followSchema = new Schema<IFollow>({

    followerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followedId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    active:{
        type:Boolean,
        default:true
    }


}, {
    timestamps:true
})


const Follow = model<IFollow>("Follow", followSchema);
export default Follow;