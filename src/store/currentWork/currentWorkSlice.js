import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentWork } from "./actions/fetchCurrentWork";
import { saveFiles } from "./actions/saveFiles";

const initialState = {
  currentWork: {
    files: [
      { text: "", type: "HTML" },
      { text: "", type: "CSS" },
      { text: "", type: "JS" },
    ],
  },
  isLoading: false,
  error: null,
};

export const currentWorkSlice = createSlice({
  name: "works",
  initialState,
  reducers: {
    setCurrentWork(state, action) {
      state.currentWork = state.works.find(
        (work) => (work.id = action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    // fetchWorks
    builder.addCase(fetchCurrentWork.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentWork.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentWork = action.payload;
    });
    builder.addCase(fetchCurrentWork.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // save files
    builder.addCase(saveFiles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentWork = action.payload;
    });
    builder.addCase(saveFiles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { setCurrentWork } = currentWorkSlice.actions;
