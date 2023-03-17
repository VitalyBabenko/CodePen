import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentWork } from "./actions/fetchCurrentWork";
import { saveFiles } from "./actions/saveFiles";

const initialState = {
  id: "",
  title: "",
  owner: { id: "", login: "" },
  files: {
    html: { text: "", type: "HTML" },
    css: { text: "", type: "CSS" },
    js: { text: "", type: "JS" },
  },
  isLoading: false,
  error: null,
};

export const currentWorkSlice = createSlice({
  name: "currentWork",
  initialState,
  reducers: {
    setHtml(state, action) {
      state.files.html.text = action.payload;
    },
    setCss(state, action) {
      state.files.css.text = action.payload;
    },
    setJs(state, action) {
      state.files.js.text = action.payload;
    },

    setLocalHtml(state, action) {
      state.files.html.text = action.payload;
      localStorage.setItem(
        "localFiles",
        JSON.stringify({
          ...state.files,
          html: { type: "HTML", text: action.payload },
        })
      );
    },
    setLocalCss(state, action) {
      state.files.css.text = action.payload;
      localStorage.setItem(
        "localFiles",
        JSON.stringify({
          ...state.files,
          css: { type: "CSS", text: action.payload },
        })
      );
    },
    setLocalJs(state, action) {
      state.files.js.text = action.payload;
      localStorage.setItem(
        "localFiles",
        JSON.stringify({
          ...state.files,
          js: { type: "JS", text: action.payload },
        })
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
      state.id = action.payload._id;
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

export const { setHtml, setCss, setJs, setLocalHtml, setLocalCss, setLocalJs } =
  currentWorkSlice.actions;
