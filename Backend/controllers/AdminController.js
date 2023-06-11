import Admin from "../models/Admin.js";

export const createAdmin = async (req,res) => {
    const { userName, email, password } = req.body;
    try {
        const newAdmin = new Admin({
            userName: userName,
            email: email,
            password: password,
          });
      const admin = await newAdmin.save();
      res.status(200).json(admin)
    } catch (err) {
      throw err;
    }
  };

  export const getRevenue = async (req, res) => {
    try {
  
      const admin = await Admin.findOne({userName:"brikios"});
  
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      const revenue = admin.revenue;
  
      return res.status(200).json({ revenue });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const updateAdminRevenue = async (req, res) => {
  try {
    const { userName, revenue } = req.body;

    const admin = await Admin.findOne({ userName });

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const updatedRevenue = admin.revenue + revenue;

    admin.revenue = updatedRevenue;
    const updatedAdmin = await admin.save();

    return res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};







