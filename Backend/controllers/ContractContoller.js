import Contract from "./../models/Contract.js";
//const { JWT_SECRET } = process.env;
import Property from "./../models/Property.js";
//import jwt  from "jsonwebtoken";
import { calculateTotalPrice } from "./../utils/ContractUtils.js";
// Create a new contract
export const createContract =async(req,res,next)=>{
  /*const token = req.cookies.access_token;
if (!token) {
  return res.status(401).send({ error: 'Access denied. No token provided.' });
}

try {
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;
} catch (ex) {
  return res.status(400).send({ error: 'Invalid token.' });
}*/
    try {
       
        const property = await Property.findById(req.body.propertyId);
        if (!property) {
          return res.status(404).send({ error: 'Property not found' });
        }
        if (property.currentOwner.toString() !== req.user._id.toString()) {
          return res.status(403).send({ error: 'You do not have permission to book this property' });
        }
    
        const contract = new Contract({
          ...req.body,
          owner: property.currentOwner,
          client: req.user._id,
          price : calculateTotalPrice(req.body.startDate, req.body.endDate, property.price)
        });
        await contract.save();
        res.status(201).send(Contract);
      } catch (error) {
        next(error);
      }
    }   



// Get all contracts by user

export const getAllContract = async (req,res,next)=>{
    try {
        const getContract = await Contract.find().populate('property').populate('client');
        res.send(getContract);
      } catch (error) {
        next(error);
      }
}


//Get a Contract by ID

export const getContractById = async (req,res,next)=>{
    try {
        const contract = await Contract.findById(req.params.id).populate('property').populate('client');
        if (!contract) {
          return res.status(404).send({ error: 'Contract not found' });
        }
        res.send(contract);
      } catch (error) {
        next(error);
      }
}


// Update a contract by ID

export const updateContract = async(req,res,next)=>{
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
          return res.status(404).send({ error: 'Contract not found' });
        }
    
        // Check if the logged-in user is the owner of the Contract being updated
        if (contract.owner.toString() !== req.user._id.toString()) {
          return res.status(403).send({ error: 'You do not have permission to update this Contract' });
        }
    
        // Update the Contract fields
        contract.startDate = req.body.startDate;
        contract.endDate = req.body.endDate;
        contract.totalPrice = calculateTotalPrice(req.body.startDate, req.body.endDate, Contract.property.price);
    
        await contract.save();
        res.send(Contract);
      } catch (error) {
        next(error);
      }
}

// Delete a contract by ID

export const deleteContract = async(req,res,next)=>{
    try {
        const contract = await Contract.findById(req.params.id);
        if (!contract) {
          return res.status(404).send({ error: 'property not found' });
        }
    
        // Check if the logged-in user is the owner of the booking being deleted
        if (contract.owner.toString() !== req.user._id.toString()) {
          return res.status(403).send({ error: 'You do not have permission to delete this property' });
        }
    
        await contract.delete();
        res.send({ message: 'property deleted successfully' });
      } catch (error) {
        next(error);
      }
}
