import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    f_name:{
        type:String,
        required:true
    },
    l_name:{
        type:String
    },
    profile:{
        type:String
    },
    mobile:{
        type:String,
        required:true,
        unique : true
    },
    password:{
        type:String,
        required:true,
        minLength : 6
    },
    role:{
        type:String,
        required:true
    },
    roll_number:{
        type:String,
    },
    branch:{
        type:String
    },
    year:{
        type:String
    },
    specification:{
        type:String,
    }
});

export default mongoose.model("User",userSchema);
