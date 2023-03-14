import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentWork } from "./actions/fetchCurrentWork";
import { saveFiles } from "./actions/saveFiles";

const initialState = {
  title: "",
  owner: { id: "", login: "" },
  files: [
    { text: "", type: "HTML" },
    { text: "", type: "CSS" },
    { text: "", type: "JS" },
  ],
  isLoading: false,
  error: null,
};

export const currentWorkSlice = createSlice({
  name: "currentWork",
  initialState,
  reducers: {
    setHtml(state, action) {
      state.files[0].text = action.payload;
    },
    setCss(state, action) {
      state.files[1].text = action.payload;
    },
    setJs(state, action) {
      state.files[2].text = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetchWorks
    builder.addCase(fetchCurrentWork.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentWork.fulfilled, (state, action) => {
      state.isLoading = false;
      state.title = action.payload.title;
      state.owner = action.payload.owner;
      state.files = action.payload.files;
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

export const { setCurrentWork, setHtml, setCss, setJs } =
  currentWorkSlice.actions;
