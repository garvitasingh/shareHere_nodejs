import Group from "../models/group";
import User from "../models/user";

export const getAllGroups = async(req,res)=>{
    try{
        // const groups = await Group.find().populate("users").populate("members","f_name,l_name,profile");
        // const groups = await Group().populate("members");
        const groups = await Group.find().populate({
            path:"admin",
            select:"f_name l_name profie"
        }).populate({
            path: "members",
            select: "f_name l_name profile",
          });
        return res.status(200).json({groups});
    }catch(err){
        return res.status(500).json(err);
    }
}

export const getGroupById = async(req,res)=>{
    try{
        const group = await Group.findById(req.params._id).populate(
            {
                path:"admin",
                select:"f_name l_name profile"
            }
        ).populate(
            {
                path:"members",
                select:"f_name l_name profile"
            }
        );
        return res.status(200).json(group);
    }catch(err){
        return res.status(500).json(err);
    }
}

export const addGroup = async(req,res)=>{
    const {title,description,image,branch,year} = req.body;
    const userId = req.user.userId;
    const baseUrl = 'localhost:6000/';
    const newimage = baseUrl+req.file.path;
    if(title == null || description == null || branch == null || year ==null){
        return res.status(400).json({message:"Enter all required fields"})
    }
    const newGroup = new Group({
        title,
        description,
        image:newimage,
        branch,
        year,
        admin:userId,
        members:[]
    })
    try{
        const group = await newGroup.save();
    }catch(err){
        return res.status(500).json(err)
    }
    return res.status(201).json(newGroup);
}

export const joinGroup = async(req,res)=>{
    const userId = req.user.userId;
    try{
        const group = await Group.findById(req.params.id);
        console.log(group.members.includes(req.params.id));
       console.log(userId);
        if(group.members.includes(userId) || req.params.id == userId){
            return res.status(400).json({message:"already joined"})
        }
        else{
            group.members.push(userId);
            (await group.save());
        }
        return res.status(200).json(group);
    }catch(err){
        return res.status(500).json(err);
    }
}

export const myGroups = async(req,res)=>{
    try{
        const userId = req.user.userId;
        const group = await Group.find(
            {admin:userId}
        )
        return res.status(200).json(group);
    }catch(err){
        return res.status(500).json(err);
    }
}

export const joinedGroups = async(req,res)=>{
    try{
        const userId = req.user.userId;
        const group = await Group.find(
            {
                members:userId
            }
        );
        return res.status(200).json(group);
    }catch(err){
        return res.status(500).json(err);
    }
}