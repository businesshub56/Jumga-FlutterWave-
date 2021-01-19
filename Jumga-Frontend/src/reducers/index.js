import { combineReducers } from "redux";
import productReducer from "./productReducer";
import AuthReducer from "./AuthReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Auth"],
};
const productPersistConfig = {
  key: "product",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  product: persistReducer(productPersistConfig, productReducer),
  Auth: AuthReducer,
});

export default persistReducer(persistConfig, rootReducer);
