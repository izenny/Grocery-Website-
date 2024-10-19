import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orders: [],
  currentOrder: null,
  isLoading: false,
  error: null,
};

//  addorder
export const addOrder = createAsyncThunk(
  "/order/addorder",
  async ({ id, orderData }) => {
    const response = await axios.post(
      `http://localhost:5000/api/order/addorder/${id}`,
      orderData,
      {
        withCredentials: true,
      }
    );
    console.log("orrderslice", response.data);

    return response.data;
  }
);

// Place an order
export const placeOrder = createAsyncThunk(
  "/order/placeorder",
  async ({ orderId, placeorderData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/order/placeorder/${orderId}`,
      placeorderData,
      {
        withCredentials: true,
      }
    );
    console.log("orrder place slice", response.data);

    return response.data;
  }
);

// Fetch orders
export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/orders", {
      withCredentials: true,
    });
    return response.data.orders;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "An error occurred while fetching orders"
    );
  }
});

// Delete an order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred while deleting the order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload.order);
        state.currentOrder = action.payload.order;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
