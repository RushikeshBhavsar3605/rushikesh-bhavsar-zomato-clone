import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  searchString: "",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not in basket!`
        );
      }

      state.items = newBasket;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, setSearchString } =
  basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += item.price), 0);

export const searchString = (state) => state.basket.searchString;

export default basketSlice.reducer;
