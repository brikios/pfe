import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { createError } from "../middlewares/errorHandler.js";
import Cookies from 'universal-cookie';

//REGISTRE USER
export const registreUser = async (req,res,next)=>{
    try{
        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting){
            return next(createError(410,"user already exists"))
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName, 
            email:req.body.email,
            password:hash,
            phone:req.body.phone 
        })
        
        await newUser.save()
        res.status(200).json("new user added")
    }catch(error){
        next(error);
    }
}

//LOGIN USER
export const loginUser = async (req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(!user) return next(createError(404,"user not found !"))
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect) return next(createError("password don't match"))
        const token = jwt.sign({
            id:user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SEC, { expiresIn: '3h' })
        const {password, isAdmin, ...otherDetails} = user._doc; 
        const userWithToken = {
            token,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin
            }
        }
        res.cookie("access_token",token,{httpOnly:true, sameSite: "strict"}).status(200).json(userWithToken)
        
    }catch(error){
        throw error;
    }
}


export const logout = (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logout successful' });
  };