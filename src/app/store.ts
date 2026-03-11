import { Home } from "@mui/icons-material";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import homePageReducer from "./screens/homePage/slice";
import HomePageReducer from "./screens/homePage/slice";

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
