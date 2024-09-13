import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  getAdminJobsDetails: [],
  getAdminJobsLoading: false,
  getAdminJobsError: null,

  getApplicantsDetails: {},
  getApplicantsLoading: false,
  getApplicantsErrors: null,

  updateApplicantData: {},
  updateApplicantLoading: false,
  updateApplicantError: null,

  createJobData: {},
  createJobLoading: false,
  createJobError: null,
};

export const getAdminJobs = createAsyncThunk("admin/getAdminJobs", async () => {
  const response = await axios.get("http://localhost:8080/api/v1/job/admin");
  return response.data;
});

export const getApplicants = createAsyncThunk(
  "admin/getApplicants",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/application/${id}/applicants`
    );
    return response.data;
  }
);

export const updateApplicant = createAsyncThunk(
  "admin/updateApplicant",
  async ({ id, status }) => {
    const response = await axios.post(
      `http://localhost:8080/api/v1/application/status/${id}/update`,
      {
        status: status,
      }
    );
    return response.data;
  }
);

export const createJobs = createAsyncThunk(
  "admin/createJob",
  async (jobData) => {
    const response = await axios.post(
      "http://localhost:8080/api/v1/job/",
      jobData
    );
    return response.data;
  }
);

export const adminJobSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminJobs.pending, (state) => {
        state.getAdminJobsLoading = true;
      })
      .addCase(getAdminJobs.fulfilled, (state, action) => {
        state.getAdminJobsDetails = action.payload?.jobs;
        state.getAdminJobsLoading = false;
        state.getAdminJobsError = null;
      })
      .addCase(getAdminJobs.rejected, (state, action) => {
        state.getAdminJobsLoading = false;
        state.getAdminJobsError = action.error.message;
      })
      .addCase(getApplicants.pending, (state) => {
        state.getApplicantsLoading = true;
      })
      .addCase(getApplicants.fulfilled, (state, action) => {
        console.log(action.payload);

        state.getApplicantsDetails = action.payload.job;
        state.getApplicantsLoading = false;
        state.getApplicantsErrors = null;
      })
      .addCase(getApplicants.rejected, (state, action) => {
        state.getApplicantsLoading = false;
        state.getApplicantsErrors = action.error.message;
      })
      .addCase(updateApplicant.pending, (state) => {
        state.updateApplicantLoading = true;
      })
      .addCase(updateApplicant.fulfilled, (state, action) => {
        state.updateApplicantLoading = false;
        state.updateApplicantData = action.payload.message;
      })
      .addCase(updateApplicant.rejected, (state, action) => {
        state.updateApplicantLoading = false;
        state.updateApplicantError = action.error.message;
      })
      .addCase(createJobs.pending, (state) => {
        state.createJobLoading = true;
      })
      .addCase(createJobs.fulfilled, (state, action) => {
        state.createJobLoading = false;
        state.createJobData = action.payload.job;
      })
      .addCase(createJobs.rejected, (state, action) => {
        state.createJobLoading = false;
        state.createJobError = action.error.message;
      });
  },
});

export const {} = adminJobSlice.actions;

export default adminJobSlice.reducer;
