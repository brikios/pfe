import Message from "../models/Message.js";

export const addMessage=async(req,res,next)=>{
    const newMessage = new Message(req.body)
    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    }catch(err){
        next(err)
    }
}

export const getMessage=async(req,res,next)=>{
    try{
        const messages = await Message.find({
            conversationId:req.params.id,
        })
        res.status(200).json(messages)
    }catch(err){ 
        next(err)
    }
}

