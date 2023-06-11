import Wishlist from '../models/Wishlist.js';

export const createWishlistItem = async (req, res) => {
  try {
    const { property } = req.body;

    const existingItem = await Wishlist.findOne({ property });
    if (existingItem) {
      return res.status(400).json({ error: 'Property already exists in the wishlist' });
    }

    const wishlistItem = new Wishlist({ property });

    await wishlistItem.save();

    res.status(201).json({ message: 'Wishlist item created successfully', wishlistItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getWishlistItemsByClientId = async (req, res) => {
    try {
      const wishlistItems = await Wishlist.find({ clientId : req.params.id }).populate('propertyIds');
  
      res.status(200).json(wishlistItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const removeWishlistItem = async (req, res) => {
  try {
    const { id } = req.params;

    await Wishlist.findByIdAndRemove(id);

    res.status(200).json({ message: 'Wishlist item removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const addPropertyToWishlist = async (req, res) => {
  try {
    const { clientId, propertyId } = req.body;

    let wishlist = await Wishlist.findOne({ clientId });

    if (!wishlist) {
      wishlist = new Wishlist({ clientId, propertyIds: [] });
    }

    if (wishlist.propertyIds.includes(propertyId)) {
      return res.status(400).json({ error: 'Property already exists in the wishlist' });
    }

    wishlist.propertyIds.push(propertyId);
    await wishlist.save();

    res.status(200).json({ message: 'Property added to the wishlist successfully', wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const removePropertyFromWishlist = async (req, res) => {
    try {
      const { clientId, propertyId } = req.body;
  
      const wishlist = await Wishlist.findOne({ clientId });
  
      if (!wishlist) {
        return res.status(404).json({ error: 'Wishlist not found for the client ID' });
      }
  
      const propertyIndex = wishlist.propertyIds.indexOf(propertyId);
      if (propertyIndex === -1) {
        return res.status(404).json({ error: 'Property not found in the wishlist' });
      }
  
      wishlist.propertyIds.splice(propertyIndex, 1);
      await wishlist.save();
  
      res.status(200).json({ message: 'Property removed from the wishlist successfully', wishlist });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };