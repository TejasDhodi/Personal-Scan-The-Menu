import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../Features/CartSlice";
import DishesSlice from "../Features/DishesSlice";
import AuthSlice from "../Features/AuthSlice";
import WishListSlice from "../Features/WishListSlice";
import FilterSlice from "../Features/FilterSlice";
const Store = configureStore({
    reducer: {
        cart: CartSlice,
        Dish: DishesSlice,
        authentication: AuthSlice,
        wishList: WishListSlice,
        filters: FilterSlice
    }
});

export default Store;