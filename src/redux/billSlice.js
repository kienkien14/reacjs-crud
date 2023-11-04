import { createSlice } from "@reduxjs/toolkit";
import { searchBillAPI } from "../service/bill.service";

export const billSlice = createSlice({
  name: "bill",
  initialState: {
    bills: [],
    totalElements: 0,
    totalPage: 0,
  },
  reducers: {
    setBills: (state, action) => {
      state.bills = action.payload
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
export const { setBills, setTotalElements, setTotalPage, setPage } = billSlice.actions;

export default billSlice.reducer;

// middleware: thunk 
export const searchThunk = (searchDTO) => {
  return async (dispatch, getState) => {
    //async
    try {
      let body = await searchBillAPI(searchDTO);
      console.log(body.totalElements);
      console.log(body.contents);

      let totalPage = Math.ceil(body.totalElements / searchDTO.size);
      console.log(totalPage);
      dispatch(setBills(body.contents))

      dispatch(setPage({ totalPage, totalElements: body.totalElements }))
    } catch (e) {
      console.log(e);
    }
  };
};