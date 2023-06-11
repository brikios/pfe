import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
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


contractSchema.pre("validate", async function (next) {
  const Property = mongoose.model("Property");
  const property = await Property.findById(this.propertyId);
  if (!property) {
    throw new Error("Invalid property ID");
  }

  const overlappingContracts = await this.constructor.find({
    propertyId: this.propertyId,
    startDate: { $lt: this.endDate },
    endDate: { $gt: this.startDate },
    status: { $ne: "cancelled" },
  });

  if (overlappingContracts.length > 0) {
    throw new Error("Property not available for the specified dates");
  }

  next();
});

export default mongoose.model('Contract', contractSchema);
