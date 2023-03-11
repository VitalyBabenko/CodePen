import { createSlice } from "@reduxjs/toolkit";
import { fetchWorks } from "./actions/fetchWorks";
import { createWork } from "./actions/createWork";
import { deleteWork } from "./actions/deleteWork";

const initialState = {
  works: [],
  isLoading: true,
  error: null,
};

export const worksSlice = createSlice({
  name: "works",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchWorks
    builder.addCase(fetchWorks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWorks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.works = action.payload;
    });
    builder.addCase(fetchWorks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // createWork
    builder.addCase(createWork.fulfilled, (state, action) => {
      state.works = [action.payload, ...state.works];
    });
    builder.addCase(createWork.rejected, (state, action) => {
      state.error = action.payload;
    });

    // deleteWork
    builder.addCase(deleteWork.fulfilled, (state, action) => {
      state.works = [
        ...state.works.filter((work) => work._id !== action.payload._id),
      ];
    });
    builder.addCase(deleteWork.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setCurrentWork } = worksSlice.actions;
