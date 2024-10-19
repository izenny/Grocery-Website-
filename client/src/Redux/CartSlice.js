import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};

// Add item to cart
export const addToCart = createAsyncThunk(
  "cart/addtocart",
  async ({ id, cartData }) => {
    // console.log('data',cartData);

    const response = await axios.post(
      `http://localhost:5000/api/cart/addtocart/${id}`,
      cartData,
      {
        withCredentials: true,
      }
    );
    // console.log(response.data);
    
    return response.data;
  }
);
// export const addToCart = createAsyncThunk("cart/addtocart", async ({ id, cartData }, { rejectWithValue }) => {
//   try {
//     const response = await axios.post(`http://localhost:5000/api/cart/addtocart/${id}`, cartData, {
//       withCredentials: true,
//     });
//     return response.data; // Return the success response
//   } catch (error) {
//     return rejectWithValue(error.response?.data?.message || "An error occurred");
//   }
// });

// Remove item from cart
// export const removeFromCart = createAsyncThunk("cart/deletecartitem", async ({id,productId}) => {
//   console.log('hellol',productId);

//   const response = await axios.delete(`http://localhost:5000/api/cart/deletecartitem/${id}`,{productId}, {
//     withCredentials: true,
//   });
//   return response.data;
// });
// Remove item from cart
export const removeFromCart = createAsyncThunk(
  "cart/deletecartitem",
  async ({ id, productId }) => {
    // console.log("Product ID:", productId);

    const response = await axios.delete(
      `http://localhost:5000/api/cart/deletecartitem/${id}`,
      {
        data: { productId }, // Send productId in the data field
        withCredentials: true,
      }
    );
    return response.data.cart;
  }
);

// Update quantity of an item
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }) => {
    const response = await axios.put(
      `http://localhost:5000/api/cart/update/${productId}`,
      { quantity },
      {
        withCredentials: true,
      }
    );
    return response.data.cart;
  }
);

// Fetch cart items
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ id }) => {
  console.log("idd", id);

  const response = await axios.get(
    `http://localhost:5000/api/cart/fetchcart/${id}`,
    {
      withCredentials: true,
    }
  );
  // console.log('cart',response.data.cart.items);

  return response.data.cart;
});
//delete all
export const deleteCart = createAsyncThunk("cart/deletecart", async ({ id }) => {
  console.log("idd", id);

  const response = await axios.delete(
    `http://localhost:5000/api/cart/deletecart/${id}`,
    {
      withCredentials: true,
    }
  );
  // console.log('cart',response.data.cart.items);

  return response.data.cart;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.cart.items;
        state.totalPrice = action.payload.cart.totalPrice;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        // state.error = action.payload.message;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      })
      .addCase(updateQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
