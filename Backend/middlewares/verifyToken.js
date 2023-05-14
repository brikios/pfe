import jwt  from "jsonwebtoken";
import { createError } from "./errorHandler.js";



export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
     if(!token) return next(createError(401,"you're not authenticated !"))
     
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


export const verifyTokenContract = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const tokenDec = authHeader && authHeader.split(' ')[1];
    if (!tokenDec) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(tokenDec, process.env.JWT_SEC);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
};

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SEC);
      req.user = decoded.user;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ message: 'Invalid token' });
    }
  };