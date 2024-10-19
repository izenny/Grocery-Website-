// controllers/addressController.js
const Address = require("../Modals/AddressSchema");



// Fetch a specific address by ID
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.find({user:req.params.id});
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: "Error fetching address", error });
  }
};

// Create a new address
exports.createAddress = async (req, res) => {
    const { id } = req.params;  // Destructure the 'id' from the request parameters
    console.log(id);  // Corrected from 'user' to 'id'
  
    const { name, street, city, state, postalCode, country, phone } = req.body;
    
    // Create a new address object with the user ID (id)
    const newAddress = new Address({
      user: id,  // Assign the user ID from params to the user field
      name,
      street,
      city,
      state,
      postalCode,
      country,
      phone,
    });
  
    try {
      const savedAddress = await newAddress.save();  // Save the new address to the database
      res.status(201).json(savedAddress);  // Return the saved address with a success status
    } catch (error) {
      res.status(400).json({ message: "Error creating address", error });  // Handle errors during address creation
    }
  };
  
// Update an existing address
exports.updateAddress = async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(400).json({ message: "Error updating address", error });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);
    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting address", error });
  }
};
