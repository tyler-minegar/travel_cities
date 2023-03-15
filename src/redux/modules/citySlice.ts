import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import { calcuateDistances } from "../../services/cityService";

interface CityState {
  distances: number[];
  status: "idle" | "loading" | "failed";
}

const initialState: CityState = {
  distances: [],
  status: "idle",
};

export const getCalcuateDistances = createAsyncThunk(
  "city/getCalcuateDistances",
  async (cities: string[]) => {
    const response: AxiosResponse = await calcuateDistances(cities);

    return response.data;
  }
);

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCalcuateDistances.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCalcuateDistances.fulfilled, (state, action) => {
        state.status = "idle";
        state.distances = action.payload.distances;
      })
      .addCase(getCalcuateDistances.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default citySlice.reducer;
