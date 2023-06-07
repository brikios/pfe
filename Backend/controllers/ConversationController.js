import Conversation from "../models/Conversation.js";



export const newConversation = async (req, res, next) => {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
  
    try {
      // Check if conversation already exists with the same members
      const existingConversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] }
      });
  
      if (existingConversation) {
        // Conversation already exists, redirect to messages page
        return res.redirect('/messages');
      }
  
      // Conversation does not exist, create a new one
      const newConv = new Conversation({
        members: [senderId, receiverId],
      });
  
      const savedConversation = await newConv.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      next(err);
    }
  };
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
            members : {$in :[req.params.userId] }
        })
        res.status(200).json(conversation)
    }catch(err){
        next(err)
    }
}