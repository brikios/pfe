import mongoose from "mongoose";

const AdvertiseSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'expired', 'cancelled'],
    default: 'draft'
  }
}, { timestamps: true });

export default mongoose.model('Advertise', AdvertiseSchema);
