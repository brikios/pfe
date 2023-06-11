import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
  },
  propertyIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
  ],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;
