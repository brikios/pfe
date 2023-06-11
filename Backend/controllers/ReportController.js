import Property from "../models/Property.js";
import Report from "../models/Report.js";


export const addReport=async(req, res,next)=>{
    try {
      const { propertyId,  reason, description,reportType,userReported } = req.body; 
      const property = await Property.findById(propertyId);
      
      const user = req.user.id;
      if (!user) {
        next("there is no user");
      }
  
      const newReport = new Report({
        user: user,
        property: propertyId,
        userReported,
        reason,
        reportType,
        description,
      });
        await newReport.save();
      
      res.status(201).json({ message: "Report added successfully" });
    } catch (error) {
      res.status(500).json(error)
    }
  }


export const updateReportStatus = async (req, res, next) => {
  try {
    const { reportId, status } = req.body;
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    report.status = status;
    await report.save();

    res.status(200).json({ message: "Report status updated successfully" });
  } catch (error) {
    next(error);
  }
};



  export const getAllReports=async(req,res,next)=>{
    try{
      const reports= await Report.find().populate('property').populate('user')
      res.status(200).json(reports)
    }catch(err){
      next(err)
    }
  }
  export const generateReportByUser = async (req,res,next) => {
    try {
       const reports = await Report.find({ reportType: "user" }).populate("user").populate("userReported");
      res.status(200).json(reports)
    } catch (error) {
      next(error);
    }
  };
  export const generateReportByProperty = async (req,res,next) => {
    try {
       const reports = await Report.find({ reportType: "property" }).populate("user").populate("property");
      res.status(200).json(reports)
    } catch (error) {
      next(error);
    }
  };