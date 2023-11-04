import { createSlice } from "@reduxjs/toolkit";
import { searchProductAPI } from "../service/product.service";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    totalElements: 0,
    totalPage: 0,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
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
export const { setProducts, setTotalElements, setTotalPage, setPage } = productSlice.actions;

export default productSlice.reducer;

// middleware: thunk 
export const searchThunk = (searchDTO) => {
  return async (dispatch, getState) => {
    //async
    try {
      let body = await searchProductAPI(searchDTO);
      console.log(body.totalElements);
      console.log(body.contents);

      let totalPage = Math.ceil(body.totalElements / searchDTO.size);
      console.log(totalPage);
      dispatch(setProducts(body.contents))
      // dispatch(setTotalElements(body.totalElements))
      // dispatch(setTotalPage(totalPage))
      dispatch(setPage({ totalPage, totalElements: body.totalElements }))
    } catch (e) {
      console.log(e);
    }
  };
};