
import cron from 'node-cron'
import Advertise from '../models/Advertise';

async function updateExpiredAdvertisements(next) {
    try {
      await Advertise.updateMany(
        { endDate: { $lte: new Date() }, status: { $ne: 'expired' } },
        { $set: { status: 'expired' } }
      );
    } catch (error) {
      next(error)
    }
  }

cron.schedule('* * * * *', updateExpiredAdvertisements);

export const createAdvertise = async (req, res, next) => {
    const { propertyId, startDate, endDate } = req.body;
  
    try {
      const newAdvertise = new Advertise({
        propertyId,
        startDate,
        endDate,
      });
  
      const savedAdvertise = await newAdvertise.save();
      res.status(200).json(savedAdvertise);
    } catch (err) {
      next(err);
    }
  };


  export const getAdvertise= async (req, res, next) => {
    try {
      const advertise = await Advertise.find();
      res.status(200).json(advertise);
    } catch (err) {
      next(err);
    }
  };
