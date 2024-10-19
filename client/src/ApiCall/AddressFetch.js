import axios from "axios";

// Function to fetch addresses
export const AddressFetchApi = async (id) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/address/${id}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Function to create a new address
export const CreateAddressApi = async (id,newAddress) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/address/create/${id}`, newAddress);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
