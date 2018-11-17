import websocket from '@giantmachines/redux-websocket';
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(websocket))
    );
};

export default configureStore;