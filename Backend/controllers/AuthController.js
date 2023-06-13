import User from "../models/User.js";
import Admin from "../models/Admin.js";

import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { createError } from "../middlewares/errorHandler.js";
import { sendConfirmationEmail } from "./EmailController.js";

//REGISTRE USER
const generateConfirmationCode=()=>{
    return Math.random().toString(36).slice(2);
}
export const registreUser = async (req,res,next)=>{
    try{
        const isExisting = await User.findOne({email: req.body.email})
        if(isExisting){
            return next(createError(410,"المستخدم موجود"))
        }
        const confirmationCode = generateConfirmationCode();

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser=new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName, 
            email:req.body.email,
            password:hash,
            phone:req.body.phone,
            confirmationCode
        })
        
        await newUser.save()
        await sendConfirmationEmail(req.body.email,confirmationCode)
        res.status(200).json("new user added,check email for confirmation")
    }catch(error){
        next(error);
    }
}

//CONFIRMATION USER 
export const confirmUser = async(req,res,next)=>{
    try{
        const {email,confirmationCode} = req.body;
        const user = await User.findOne({email,confirmationCode});
        if(!user){
            return res.status(500).json({error:"there is no user"})
        }

        user.isConfirmed=true
        await user.save()
        const token = jwt.sign(
            {
              id: user._id,
              name: user.name,
              email: user.email,
            },
            process.env.JWT_SEC
          );
        res.status(200).json({message : "account confirmed success",token,user})
    }catch(err){
        next(err)
    }
    
}
//LOGIN USER
export const loginUser = async (req,res,next)=>{
    try{
        const user = await User.findOne({
            email: req.body.email,
        })
    
        if (!user) {
            res.status(500).json({message: 'there is no user'} )
        }

        const isPasswordValid = await bcrypt.compare(
            req.body.password,
            user.password
        )
        
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    id:user._id,
                    name: user.name,
                    email: user.email,
                },
                process.env.JWT_SEC
            )
            res.cookie("access_token", token);
            return res.json({ status: 'ok', token: token,user:user})
        } else {
            return res.json({ status: 'error', token: false })
        }
        }catch(error){
        return res.json({message: 'البريد الإلكتروني أو كلمة السر غير صحيح'});
    }
}

export const refreshToken = async (req, res, next) => {
    try {
      const { userId } = req.body;

      const user = await User.findById(userId);
  
      if (!user) {
        return next(createError(404, 'User not found'));
      }
  
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SEC
      );
  
      res.json({ token, user });
    } catch (error) {
      next(error);
    }
  };
export const logout = (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logout successful' });
  };





export const loginAdmin = async (req,res,next)=>{
    try{
        const admin = await Admin.findOne({
            userName: req.body.userName,
        })
    
        if (!admin) {
            return { status: 'error', error: 'Invalid login' }
        }
    
        const isPasswordValid = req.body.password == admin.password
    
        
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                    id:admin._id,
                    userName: admin.userName,
                },
                process.env.JWT_SEC
            )
            res.cookie("access_admin_token", token);
            return res.json({ status: 'ok', token: token,admin:admin})
        } else {
            return res.json({ status: 'error', token: false })
        }
    }catch(error){
        throw error;
    }
}

export const logoutAdmin = (req, res) => {
    res.clearCookie('access_admin_token');
    res.status(200).json({ message: 'Logout successful' });
  };