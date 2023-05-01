import Property from "../models/Property.js";

//ADD PROPERTY

export const createProperty = async (req,res)=>{
    const newProperty = new Property({ ...req.body, currentOwner: req.user.id })
    try{
        const savedProperty = await newProperty.save()
        res.status(200).json(savedProperty);
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
// GET FEATURED
export const getFeaturedProperty = async(req,res,next)=>{
    try{
        const featuredProperty = await Property.find({featured:true}).populate('currentOwner','-password')
        return res.status(200),json(featuredProperty)
    }catch(err){
        return res.status(500).json(err.message)
    }
}
//GET ALL PROPERTY

export const getProperties = async(req,res)=>{
    try{
        const getAllProperty = await Property.find();
        res.status(200).json(getAllProperty);
    }catch(err){
        res.status(500).json(err) 
    }
}

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
