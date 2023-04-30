import jwt  from "jsonwebtoken";
import { createError } from "./errorHandler.js";


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
     if(!token)     return next(createError(401,"you're not authenticated !"))
     
jwt.verify(token,process.env.JWT_SEC,(error,user)=>{
    if(error)
    return next(createError(405,"Token not valid !"))
    req.user = user 
    next()
})
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id ==req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(407,"you don't have the access"))
        }
    })
}


export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(407,"you're not an admin'"))
        }
    })
}
