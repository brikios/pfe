import Conversation from "../models/Conversation.js";


export const newConversation=async(req,res,next)=>{
    const newConv = new Conversation({
        members:[req.body.senderId,req.body.receiverId],
    })

    try{
        const savedConversation=await newConv.save()
        res.status(200).json(savedConversation);
    }catch(err){
        next(err)
    }
}
export const newConv=async(req,res,next)=>{
    const newC=new Conversation({
        members :[req.user.id,req.params.id],
    })
    try{
        const saveConv= await newC.save();
        res.status(200).json(saveConv)
    }catch(err)
    {
        next(err)
    }
}
export const getConversationByUserId=async(req,res,next)=>{
    try{
        const conversation = await Conversation.find({
            members : {$in :[req.params.userId]}
        })
        res.status(200).json(conversation)
    }catch(err){
        next(err)
    }
}