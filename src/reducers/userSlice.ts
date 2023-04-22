import { createSlice } from "@reduxjs/toolkit";

export interface UserStateProps {
  name: string;
  score: number;
}

const initialState: UserStateProps = {
  name: "",
  score: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUsername: (state, action) => {
      state.name = action.payload;
    },
    storeUserScore: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const { storeUsername, storeUserScore } = userSlice.actions;
export default userSlice.reducer;
