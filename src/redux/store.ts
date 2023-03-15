import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
} from "@reduxjs/toolkit";
import citySlice from "./modules/citySlice";

export const store = configureStore({
  reducer: {
    city: citySlice,
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

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = store;
}

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: {
      city: citySlice,
    },
    preloadedState,
  });
}
