import User from "../models/User.js";
import jwt from 'jsonwebtoken';
//UPDATE User

export const updateUser = async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body},{new:true});
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err) 
    }
}

export const updateUserAdsToken= async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);

            if (!user) {
            return res.status(404).json({ error: 'User not found' });
            }
            const newAdsToken = req.body.adsTokens;

        const updatedUserAdsToken = await User.findByIdAndUpdate(req.params.id,{ $set :{adsTokens:user.adsTokens+newAdsToken}},{new:true})
       
        res.status(200).json(updatedUserAdsToken)
    }catch(err){
        next(err)
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

/*
export const getConnectUser = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
}

export const getConnectUser =async (req,res) => {
    try {
        const {_id,email} = await User.findById("645a4f9accc067c89250211f");
        res.json({_id,email});
      console.log(email)
    } catch(err) {
      res.json(err);
    }
  };*/