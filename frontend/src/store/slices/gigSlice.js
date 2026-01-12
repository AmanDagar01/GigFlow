import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchGigs = createAsyncThunk(
  "gigs/fetchGigs",
  async ({ search = "" } = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/gigs", { params: { search } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch gigs");
    }
  }
);

export const fetchGigById = createAsyncThunk(
  "gigs/fetchGigById",
  async (gigId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/gigs/${gigId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch gig");
    }
  }
);

export const createGig = createAsyncThunk(
  "gigs/createGig",
  async ({ title, description, budget }, { rejectWithValue }) => {
    try {
      const response = await api.post("/gigs", { title, description, budget });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to create gig");
    }
  }
);

const gigSlice = createSlice({
  name: "gigs",
  initialState: {
    gigs: [],
    currentGig: null,
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
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchGigById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGig = action.payload;
      })
      .addCase(fetchGigById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createGig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs.push(action.payload);
      })
      .addCase(createGig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = gigSlice.actions;
export default gigSlice.reducer;