/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';

import { Provider } from 'react-redux';
import configureStore from "./src/store/configureStore";
import {pobraneUstawienia} from './src/store/actions/ustawienia';
import homeConfig from './homeConfig/konfiguracja';

const store = configureStore();
store.dispatch(pobraneUstawienia(homeConfig));

const AppRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
