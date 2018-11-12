import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import App from './App';
import homeConfig from './homeConfig/konfiguracja';
import {pobraneUstawienia} from './actions/ustawienia'
// import './index.css'
import * as serviceWorker from './serviceWorker';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

// possibly to refactor and take from server on initial message
// however then ustawiania/pages would be empty if no connection
store.dispatch(pobraneUstawienia(homeConfig));

ReactDOM.render(
    <BrowserRouter >
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// api.ustawienia.getUstawieniaKonfiguracja()
//   .then(konfiguracja => store.dispatch(pobraneUstawienia(konfiguracja))) 
// api.ustawienia.getUstawieniaKonfiguracjaTemp()
//   .then(konfiguracjaTemp => store.dispatch(pobraneUstawienia(konfiguracjaTemp)))
