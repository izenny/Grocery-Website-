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
    console.log("data", cartData);
    console.log("id", id);

    const response = await axios.post(
      `http://localhost:5000/api/cart/addtocart/${id}`,
      cartData,
      {
        withCredentials: true,
      }
    );
    console.log(response.data);

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
    return response.data;
  }
);

// Update quantity of an item
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, cartData }) => {
    console.log("cart update",id,cartData);
    
    const response = await axios.patch(
      `http://localhost:5000/api/cart/update/${id}`,
      { cartData },
      {
        withCredentials: true,
      }
    );
    console.log("cart quantity update ", response.data);

    return response.data;
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
  console.log('cart fetch',response.data.cart);

  return response.data;
});
//delete all
export const deleteCart = createAsyncThunk(
  "cart/deletecart",
  async ({ id }) => {
    console.log("idd", id);

    const response = await axios.delete(
      `http://localhost:5000/api/cart/deletecart/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log("cart", response.data.cart);

    return response.data.cart;
  }
);

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
        state.totalPrice = action.payload.cart.subTotal;
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
        state.items = action.payload.cart.items;
        state.totalPrice = action.payload.cart.subTotal;
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
        state.items = action.payload.cart.items;
        state.totalPrice = action.payload.cart.subTotal;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message || "An error occurred";
      })
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.cart.items;
        state.totalPrice = action.payload.cart.subTotal;
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

        // Extract cart safely from the payload
        const cart = action.payload?.cart || { items: [], subTotal: 0 };

        // Assign the items and totalPrice safely
        state.items = cart.items || []; // Ensure items is at least an empty array
        state.totalPrice = cart.subTotal || 0; // Ensure totalPrice defaults to 0
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
