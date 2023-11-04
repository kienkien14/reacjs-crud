import { createSlice } from "@reduxjs/toolkit";
import { searchCategoryAPI } from "../service/category.service";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    totalElements: 0,
    totalPage: 0,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload
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
export const { setCategories, setTotalElements, setTotalPage, setPage } = categorySlice.actions;

export default categorySlice.reducer;

// middleware: thunk 
export const searchThunk = (searchDTO) => {
  return async (dispatch, getState) => {
    //async
    try {
      let body = await searchCategoryAPI(searchDTO);
      console.log(body.totalElements);
      console.log(body.contents);

      let totalPage = Math.ceil(body.totalElements / searchDTO.size);
      console.log(totalPage);
      dispatch(setCategories(body.contents))
      // dispatch(setTotalElements(body.totalElements))
      // dispatch(setTotalPage(totalPage))
      dispatch(setPage({ totalPage, totalElements: body.totalElements }))
    } catch (e) {
      console.log(e);
    }

  };
};

