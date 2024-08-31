/*import { createSlice } from "@reduxjs/toolkit";
import { APP_ROUTES } from "../../constants/route.const";

const ROUTE_STATE = {
  currentRoute: APP_ROUTES.SIGN_IN,
};

const routeSlice = createSlice({
  name: "route",
  initialState: ROUTE_STATE,
  reducers: {
    switchRoute: (state, action) => {
      const { route } = action.payload;
      return { ...state, currentRoute: route };
    },
  },
});

export const { switchRoute } = routeSlice.actions;
export default routeSlice.reducer;*/
