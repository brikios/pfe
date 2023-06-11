//import cron from 'node-cron'
import Property from '../models/Property.js';
import Contract from '../models/Contract.js';
import { calculateTotalPrice } from '../utils/ContractUtils.js';
import Cookies from 'js-cookie';

//import { verif } from '../middlewares/verifyToken.js';


export const addContract = async (req, res, next) => {
    const property = await Property.findById(req.body.propertyId);
    
    
    const userInfs=decodeURI(Cookies.get('user')).split('"')
    const userId = userInfs[13];
    console.log(req.user.email)
    if (!property) {
      return res.status(404).send({ error: 'Property not found' });
    }
    
    if (property.currentOwner == req.user.id) {
      return res.status(403).send({ error: 'You do not have permission to book this property' });
    }
    console.log(req.user.id)
    
    const contract = new Contract({
      ...req.body,
      owner: property.currentOwner,
      client: req.user.id,
      price: calculateTotalPrice(req.body.startDate, req.body.endDate, property.price)
    });
  
    await contract.save();
    res.status(201).send(contract);
  };
  export const updateContract = async(req,res)=>{
    try{
        
        const updatedProperty = await Contract.findByIdAndUpdate(req.params.id, { $set: req.body},{new:true});
        
        res.status(200).json(updatedProperty);
    }catch(err){
        res.status(500).json(err) 
    }
}




export const getDatesContract = async(req,res,next)=>{
  try{
    const getDatesContracts = await Contract.find({propertyId:req.params.id})
    res.status(200).json(getDatesContracts)
  }catch(err){
    next(err)
  }
}



  export const countContractsByOwner = async(req,res,next)=>{
    
    try{
        const CountContract = await Contract.countDocuments({owner:req.params.id})
        res.status(200).json({sumContract:CountContract});
    }catch(err){
        next(err)
    }
}

export const getContracts = async(req,res)=>{
  try{
      const getAllContract = await Contract.find();
      res.status(200).json(getAllContract);
  }catch(err){
      res.status(500).json(err) 
  }
}

export const getContractByOwner = async (req,res,next)=>{
  try{
    const ContractOwner = await Contract.find({owner:req.params.id}).populate('client').populate('owner').populate('propertyId')
    res.status(200).json(ContractOwner)
  }catch(err){
    next(err)
  }
}

export const getContractByClient = async (req,res,next)=>{
  try{
    const ContractClient = await Contract.find({client:req.params.id}).populate('owner').populate('client').populate('propertyId')
    res.status(200).json(ContractClient)
  }catch(err){
    next(err)
  }
}

async function updateExpiredContracts(next) {
  try {
    await Contract.updateMany(
      { endDate: { $lte: new Date() }, status: { $eq: 'accepted' } },
      { $set: { status: 'expired' } }
    );
  } catch (error) {
    next(error)
  }
}
setTimeout(updateExpiredContracts, 60000);
