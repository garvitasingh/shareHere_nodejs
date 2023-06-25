import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    members:[{
        type:mongoose.Types.ObjectId,
        ref:"User",
    }]
}
)

export default mongoose.model("Group",groupSchema);