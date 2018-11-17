import { createStore, compose } from "redux";
import rootReducer from "./reducers";

// import thunk from "redux-thunk";
// applyMiddleware(thunk)
let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers());
};

export default configureStore;