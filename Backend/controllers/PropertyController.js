import Property from '../models/Property.js';
import upload from '../utils/UploadImages.js';
import cloudinary from 'cloudinary';
export const createProperty = async (req, res,next) => {
    
        const {title,description,price,city,type}=req.body
      const images = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.v2.uploader.upload(file.path);
          return result.secure_url;
        })
      );
      
      try {
      const newProperty = new Property({
        title:title,
        description:description,
        price:price,
        city:city,
        type:type,
        images:images,  
        currentOwner: req.user.id,
      });
  
      const savedProperty = await newProperty.save();
      res.status(200).json(savedProperty);
    } catch (err) {
        console.error(error.response);
    }
  };

//GET PROPERTY OWNER
export const getPropertyByOwner = async (req,res)=>{
    try{
        const getProperty = await Property.find({currentOwner : req.params.id});
        res.status(200).json(getProperty);
    }catch(err){
        res.status(500).json(err) 
    }
}

//UPDATE PROPERTY

export const updatedProperty = async(req,res)=>{
    try{
        
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, { $set: req.body},{new:true});
        
        res.status(200).json(updatedProperty);
    }catch(err){
        res.status(500).json(err) 
    }
}


//DELETE PROPERTY
export const deleteProperty = async(req,res)=>{
    try{
        await Property.findByIdAndDelete(req.params.id);
         res.status(200).json("تم حذف الملكية");
     }catch(err){
         res.status(500).json(err) 
     }
}

//GET ALL PROPERTiet
export const getAllProperties = async(req,res)=>{
    try{
        const properties=await Property.find().populate('currentOwner');
         res.status(200).json(properties);
     }catch(err){
         res.status(500).json(err) 
     }
}

//GET PROPERTY

export const getProperty = async(req,res,next)=>{
    //const failed = true;
    //if(failed) return(next(createError(401,"you're not authenticate"))) 
    try{
        const getProperty = await Property.findById(req.params.id);
        res.status(200).json(getProperty);
    }catch(err){
        res.status(500).json(err) 
    }
}

//GET ALL PROPERTY

export const getProperties = async (req, res) => {
    const { city, type, min, max } = req.query;
    const filters = {};
  
    
    if (city) {
      filters.city = city;
    }
    if (type) {
      filters.type = type;
    }
    if (min && max) {
      filters.price = { $gte: min, $lte: max };
    } else if (min) {
      filters.price = { $gte: min };
    } else if (max) {
      filters.price = { $lte: max };
    }
  
    try {
      const getAllProperty = await Property.find(filters);
      res.status(200).json(getAllProperty);
    } catch (err) {
      res.status(500).json(err);
    }
  };

export const countPropertiesByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try{
        const citiesList = await Promise.all(cities.map(city=>{
            return Property.countDocuments({city:city})
        }))
        res.status(200).json(citiesList);
    }catch(err){
        next(err)
    }
}

export const countPropertiesByType = async(req,res,next)=>{
    const types = req.query.type.split(",")
    try{
        const typeList = await Promise.all(types.map(type=>{
            return Property.countDocuments({type:type})
        }))
        res.status(200).json(typeList);
    }catch(err){
        next(err)
    }
}


//Infinite Scroll 

export const readInfiniteScroll = async(req,res,next)=>{
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);

        const skip = (page -1) * size;

        const total = await Property.countDocuments();
        const properties = await Property.find().skip(skip).limit(size);

        res.json({
            records: properties,
            total,
            page, 
            size
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
}

