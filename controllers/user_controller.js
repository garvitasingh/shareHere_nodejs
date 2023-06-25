import User from "../models/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Path from "mongoose";
const secret_key = 'garvitasShareHere';

export const getAllUser = async(req,res)=>{
    let users;
    try{
        users = await User.find();
    }catch(err){
        return res.status(500).json(err);
    }
    if(!users){
        return res.status(404).json({message:"No user found"});
    }
    return res.status(200).json({users});
}

export const signUp = async(req,res)=>{
    const {f_name,l_name,profile,mobile,password,role,branch,year,specification} = req.body;
    let existingUser;
    let token;
    let baseUrl;
    let newimage = null;
    if(profile !=null){
        baseUrl = 'https://sharehere.onrender.com/';
        newimage = baseUrl+req.file.path;   
    }
    if(f_name == null || role == null || mobile == null||password ==null){
        return res.status(400).json({message:"Enter all required fields"});
    }
    try{
        existingUser = await User.findOne({mobile});
    }catch(err){
        return res.status(500).json(err);
    }
    if(existingUser){
        return res.status(400).json({message:"User already exist"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = new User({
        f_name,
        l_name,
        profile:newimage,
        mobile,
        password:hashedPassword,
        role,
        branch,
        year,
        specification
    });
    try{
        const user = await newUser.save();
        console.log(secret_key);
        token = jwt.sign({userId:user._id},secret_key);
        console.log(token);
        return res.status(201).json({data:newUser,token});
    }catch(err){
        return res.status(500).json(err)
    }
} 

export const login = async(req,res)=>{
    const {mobile, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({mobile});
    }catch(err){
        return res.status(500).json(err)
    }
    if(!existingUser){
        return res.status(404).json({message:"Couldn't find user by this mobile number"})
    }

    const isPassCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPassCorrect){
        return res.status(400).json({message:"Incorrect password"})
    }
    const token = jwt.sign({ userId: existingUser._id }, 'secret_key');

    return res.status(200).json({ token, existingUser })
}

export const getStudents = async(req,res)=>{
    try{
        const students = await User.find(
            {role:"student"}
        );
        return res.status(200).json(students);
    }catch(err){
       return res.status(500).json(err);
    }
}

export const getTeachers = async(req,res)=>{
    try{
        const teachers = await User.find(
            {role:"teacher"}
        );
        return res.status(200).json(teachers);
    }catch(err){
       return res.status(500).json(err);
    }
}

export const getStaffs = async(req,res)=>{
    try{
        const staffs = await User.find(
            {role:"staff"}
        );
        return res.status(200).json(staffs);
    }catch(err){
       return res.status(500).json(err);
    }
}

export const update = async(req,res)=>{
    const {f_name,l_name,profile,password,role,branch,year,specification} = req.body;
    // const baseUrl = 'localhost:6000/';
    // const newimage = baseUrl+req.file.path;
    try{
        const userId = req.user.userId;
        // console.log(userId);
        const user = await User.updateOne(
            {_id:userId},
            {
                $set:{
                    f_name,
                    l_name,
                    profile,
                    password,
                    role,
                    branch,
                    year,
                    specification
                }
            }
        );
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

export const deleteUser = async(req,res)=>{
    try{
    const userId = req.user.userId;
    const user = await User.deleteOne({_id:userId});
    res.status(200).json({message:"deleted"});
    }catch(err){
        console.log(err);
        res.status(500).json({err});
    }
}