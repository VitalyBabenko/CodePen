import { createSlice } from "@reduxjs/toolkit";
import { getWork } from "./actions/getWorkAction";
import { updateWork } from "./actions/updateWork";

const initialState = {
  work: [],
  HTML: "",
  CSS: "",
  JS: "",
  isLoading: false,
  error: null,
};

export const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    // setHTML(state, action) {
    //   console.log(action.payload);
    //   state.HTML = action.payload;
    // },
    // setCSS(state, action) {
    //   state.CSS = action.payload;
    // },
    // setJS(state, action) {
    //   state.JS = action.payload;
    // },
  },
  extraReducers: (builder) => {
    //getWork
    builder.addCase(getWork.fulfilled, (state, action) => {
      state.work = action.payload;
      state.HTML = action.payload.files.find(
        (file) => file.type === "HTML"
      ).text;
      state.CSS = action.payload.files.find((file) => file.type === "CSS").text;
      state.JS = action.payload.files.find((file) => file.type === "JS").text;
    });

    // // updateWork
    builder.addCase(updateWork.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { setHTML, setCSS, setJS } = workSlice.actions;
