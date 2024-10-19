import axios from "axios";
export const AddNewProductApi = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/product/addproduct",
      data,
      {
        withCredentials: true,
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//fetch all products

export const ProductsFetchApi = async (type) => {
  console.log(type);

  try {
    const res = await axios.get(
      "http://localhost:5000/api/product/getproductbycategory",
      {
        params: type,
      }
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const LowProductsFetchApi = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/product/lowstocks"
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
