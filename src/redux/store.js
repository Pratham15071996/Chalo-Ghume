import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import { FlightReducer } from "./flights/reducer";
import { HotelReducer } from "./hotels/reducer";
import { LoginReducer } from "./auth/authReducer";
import { StayReducer } from "./stay/reducer";

const rootReducer = combineReducers({
  FlightReducer,
  HotelReducer,
  LoginReducer,
  StayReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
