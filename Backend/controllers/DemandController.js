
import Property from '../models/Property.js';
import Contract from '../models/Contract.js';
import { calculateTotalPrice } from '../utils/ContractUtils.js';



export const addContract = async (req, res, next) => {
    const property = await Property.findById(req.body.propertyId);
  
    if (!property) {
      return res.status(404).send({ error: 'Property not found' });
    }
  
    if (property.currentOwner == req.user.id) {
      return res.status(403).send({ error: 'You do not have permission to book this property' });
    }
  
    const contract = new Contract({
      ...req.body,
      owner: property.currentOwner,
      client: req.user.id,
      price: calculateTotalPrice(req.body.startDate, req.body.endDate, property.price)
    });
  
    await contract.save();
    res.status(201).send(contract);
  };