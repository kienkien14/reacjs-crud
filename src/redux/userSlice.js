import { createSlice } from "@reduxjs/toolkit";
import { searchUserAPI } from "../service/user.service";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    totalElements: 0,
    totalPage: 0,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
      // return action.payload; //payload === initialState
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload
    },
    setPage: (state, action) => {
      const { totalElements, totalPage } = action.payload
      state.totalElements = totalElements
      state.totalPage = totalPage
    }
  },
});
export const { setUsers, setTotalElements, setTotalPage, setPage } = userSlice.actions;

export default userSlice.reducer;

// middleware: thunk 
export const searchThunk = (searchDTO) => {
  return async (dispatch, getState) => {
    //async
    try {
      let body = await searchUserAPI(searchDTO);
      console.log(body.totalElements);
      console.log(body.contents);

      let totalPage = Math.ceil(body.totalElements / searchDTO.size);
      console.log(totalPage);
      dispatch(setUsers(body.contents))
      // dispatch(setTotalElements(body.totalElements))
      // dispatch(setTotalPage(totalPage))
      dispatch(setPage({ totalPage, totalElements: body.totalElements }))
    } catch (e) {
      console.log(e);
    }
  };
};