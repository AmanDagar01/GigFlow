import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchBidsForGig = createAsyncThunk(
  "bids/fetchBidsForGig",
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/bids/${gigId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch bids");
    }
  }
);

export const submitBid = createAsyncThunk(
  "bids/submitBid",
  async ({ gigId, message, price }, { rejectWithValue }) => {
    try {
      const response = await api.post("/bids", { gigId, message, price });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to submit bid");
    }
  }
);

export const hireBidder = createAsyncThunk(
  "bids/hireBidder",
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/bids/${bidId}/hire`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to hire bidder");
    }
  }
);

const bidSlice = createSlice({
  name: "bids",
  initialState: {
    bids: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBidsForGig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBidsForGig.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload;
      })
      .addCase(fetchBidsForGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitBid.fulfilled, (state, action) => {
        state.loading = false;
        state.bids.push(action.payload);
      })
      .addCase(submitBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(hireBidder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(hireBidder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.bids.findIndex((bid) => bid._id === action.payload._id);
        if (index !== -1) {
          state.bids[index] = action.payload;
        }
      })
      .addCase(hireBidder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = bidSlice.actions;
export default bidSlice.reducer;