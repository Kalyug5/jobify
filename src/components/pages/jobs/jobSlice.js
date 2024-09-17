import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const URL = import.meta.env.VITE_APP_SERVER_URI;

const initialState = {
  jobData: [],
  jobDataLoading: false,
  jobDataError: null,

  filteredData: [],

  getOneJobData: {},
  getOneJobLoadingData: false,
  getOneJobError: {},

  applyJobData: {},
  applyJobLoadingData: false,
  applyJobError: {},

  appliedJobData: {},
  appliedJobLoadingData: false,
  appliedJobLoadingError: {},
};

export const getJob = createAsyncThunk("job/getJob", async () => {
  const response = await axios.get(`${URL}/api/v1/job/get`);
  return response.data;
});

export const getOneJob = createAsyncThunk("job/getOneJob", async (id) => {
  const response = await axios.get(`${URL}/api/v1/job/${id}`);
  return response.data;
});

export const applyJob = createAsyncThunk("applyJob/apply", async (data) => {
  const response = await axios.get(`${URL}/api/v1/application/apply/${data}`);
  return response.data;
});

export const getApplyJobs = createAsyncThunk(
  "applyJobs/getApplyJobs",
  async () => {
    const response = await axios.get(`${URL}/api/v1/application/get`);
    return response.data;
  }
);

const jobSlice = createSlice({
  name: "jobSclice",
  initialState: initialState,
  reducers: {
    filterByLocation: (state, action) => {
      const { data } = action.payload;

      state.filteredData = state.jobData.filter((item) =>
        item.location.toLowerCase().includes(data.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJob.pending, (state) => {
        state.jobDataLoading = true;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        console.log(action.payload);

        state.jobData = action.payload.jobs;
        state.filteredData = state.jobData;
        state.jobDataLoading = false;
        state.jobDataError = null;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.jobDataLoading = false;
        state.jobDataError = action.payload;
      })
      .addCase(getOneJob.pending, (state) => {
        state.getOneJobLoadingData = true;
      })
      .addCase(getOneJob.fulfilled, (state, action) => {
        console.log(action.payload);

        state.getOneJobData = action.payload.job;
        state.getOneJobLoadingData = false;
      })
      .addCase(getOneJob.rejected, (state, action) => {
        state.getOneJobError = action.payload;
      })
      .addCase(applyJob.pending, (state) => {
        state.applyJobLoadingData = true;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        console.log(action.payload);
        state.applyJobData = action.payload;
        state.applyJobLoadingData = false;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.applyJobLoadingData = false;
        state.applyJobError = action.payload;
      })
      .addCase(getApplyJobs.pending, (state) => {
        state.appliedJobLoadingData = true;
      })
      .addCase(getApplyJobs.fulfilled, (state, action) => {
        state.appliedJobData = action.payload?.application;
        state.appliedJobLoadingData = false;
      })
      .addCase(getApplyJobs.rejected, (state, action) => {
        state.appliedJobLoadingData = false;
        state.appliedJobLoadingError = action.payload;
      });
  },
});

export const { filterByLocation } = jobSlice.actions;
export default jobSlice.reducer;
