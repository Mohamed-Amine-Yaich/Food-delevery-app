import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(item => {
        return item._id === action.payload.id;
      });

      //console.log(index);
      const NewItems = [...state.items];
      console.log(index);

      NewItems.splice(index, 1);
      state.items = NewItems;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

/* selector allow to access the state of the basketSlice   */
/* with selector we get access to the value of state of basketSlice */
export const selectBasketItems = state => state.basket.items;
export const selectBasketItemsById = (state, id) =>
  state.basket.items.filter(item => {
    if (item._id === id) {
      return item;
    }
  });
export const selectTotalItemsPrice = state =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export default basketSlice.reducer;
