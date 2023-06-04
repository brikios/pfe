
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


  export const countContractsByOwner = async(req,res,next)=>{
    
    try{
        const CountContract = await Contract.countDocuments({owner:req.params.id})
        res.status(200).json({sumContract:CountContract});
    }catch(err){
        next(err)
    }
}

export const getContractByOwner = async (req,res,next)=>{
  try{
    const ContractOwner = await Contract.find({owner:req.params.id}).populate('client').populate('propertyId')
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