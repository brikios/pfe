import User from "../models/User.js";

//UPDATE User

export const updateUser = async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body},{new:true});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err) 
    }
}


//DELETE User
export const deleteUser = async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
         res.status(200).json("user has been deleted");
     }catch(err){
         res.status(500).json(err) 
     }
}

//GET User

export const getUser = async(req,res)=>{
    try{
        const getUser = await User.findById(req.params.id);
        res.status(200).json(getUser);
    }catch(err){
        res.status(500).json(err) 
    }
}

//GET ALL User

export const getUsers = async(req,res)=>{
    try{
        const getAllUser = await User.find();
        res.status(200).json(getAllUser);
    }catch(err){
        res.status(500).json(err) 
    }
}