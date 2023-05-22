import Property from "../models/Property.js";
import Report from "../models/Report.js";


export const addReport=async(req, res,next)=>{
    try {
      const { propertyId,  reason, description } = req.body; 
      const property = await Property.findById(propertyId);
      if (!property) {
          next("there is no property")
          }
      const user = req.user.id;
      if (!user) {
        next("there is no user");
      }
  
      const newReport = new Report({
        user: user,
        property: propertyId,
        reason,
        description,
      });
        await newReport.save();
      
      res.status(201).json({ message: "Report added successfully" });
    } catch (error) {
      next(error)
    }
  }