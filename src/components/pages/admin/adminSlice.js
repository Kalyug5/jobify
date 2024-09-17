import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

const initialState = {
  getCompanyDetails: [],
  getCompanyDetailsLoading: false,
  getCompanyDetailsError: null,
  getCompanySpecificJob: [],
  getCompanySpecificJobLoading: false,
  getCompanySpecificJobError: null,

  getOneCompany: {},
  getOneCompanyLoading: false,
  getOneCompanyError: null,

  createCompanyData: "",
  createCompanyLoading: false,
  createCompanyError: null,

  updateComapny: {},
  updateComapnyLoading: false,
  updateComapnyError: null,
};

const url = process.env.REACT_APP_URI;

export const getCompanies = createAsyncThunk("getCompanies", async () => {
  const response = await axios.get(`${url}/api/v1/company/get`);
  return response.data;
});

export const getCompanyJob = createAsyncThunk("getCompanyJob", async (id) => {
  const response = await axios.get(`${url}/api/v1/job/companyjob/${id}`);
  return response?.data;
});

export const createCompany = createAsyncThunk(
  "createCompany",
  async (company) => {
    const response = await axios.post(
      `${url}/api/v1/company/register`,
      company,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const getSpecificCompany = createAsyncThunk(
  "getcompanyById",
  async (id) => {
    const response = await axios.get(`${url}/api/v1/company/${id}`);
    return response.data;
  }
);

export const updateCompany = createAsyncThunk(
  "updateCompany",
  async ({ id, company }) => {
    const response = await axios.put(`${url}/api/v1/company/${id}`, company, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.getCompanyDetailsLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.getCompanyDetails = action.payload?.data;
        state.getCompanyDetailsLoading = false;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.getCompanyDetailsError = action.error.message;
        state.getCompanyDetailsLoading = false;
      })
      .addCase(getCompanyJob.pending, (state) => {
        state.getCompanySpecificJobLoading = true;
      })
      .addCase(getCompanyJob.fulfilled, (state, action) => {
        state.getCompanySpecificJobLoading = false;
        state.getCompanySpecificJob = action.payload?.jobs;
      })
      .addCase(getCompanyJob.rejected, (state, action) => {
        state.getCompanySpecificJobError = action.error.message;
      })
      .addCase(getSpecificCompany.pending, (state) => {
        state.getOneCompanyLoading = true;
      })
      .addCase(getSpecificCompany.fulfilled, (state, action) => {
        state.getOneCompanyLoading = false;
        state.getOneCompany = action.payload.data;
      })
      .addCase(getSpecificCompany.rejected, (state, action) => {
        state.getOneCompanyError = action.payload.error;
        state.getOneCompanyLoading = false;
      })
      .addCase(createCompany.pending, (state) => {
        state.createCompanyLoading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.createCompanyLoading = false;
        state.createCompanyData = action.payload.data;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.createCompanyError = action.error.message;
        state.createCompanyLoading = false;
      })
      .addCase(updateCompany.pending, (state) => {
        state.updateComapnyLoading = true;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.updateComapnyLoading = false;
        state.updateComapny = action.payload.data;
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.updateComapnyError = action.error.message;
      });
  },
});

export const {} = adminSlice.actions;

export default adminSlice.reducer;
