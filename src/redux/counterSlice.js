import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    x: 0,
  },
  reducers: {
    increment: (state) => {
      state.x += 1;
    },
    incNumber: (state, action) => {
      console.log(action.type);
      state.x += action.payload;
    },
  },
});
export const { increment, incNumber } = counterSlice.actions;
console.log(increment());
console.log(incNumber());

const couterReducer = counterSlice.reducer;
console.log(couterReducer);
// function reducer = (action) => {
//   if (action.type == 'counter/increment')
//      return {x: x + 1}
//    else (action.type == 'counter/incNumber')
//      return {x: x + action.payload}
// }

// middleware: thunk , saga, observable

// thunk
export const incrementAsync = (amount) => {
  return (dispatch, getState) => {
    console.log(getState());
    //async

    setTimeout(() => {
      dispatch(incNumber(amount));
    }, 1000);
  };
};

export default couterReducer;
