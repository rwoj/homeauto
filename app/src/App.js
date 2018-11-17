import React, {Component} from 'react';
import {createStackNavigator } from 'react-navigation'
import Dom from './screens/Dom/Dom'
import Ogrzewanie from './components/Ogrzewanie'
import Swiatlo from './components/Swiatlo'
import Efekty from './components/Efekty'
import Harmonogram from './components/Harmonogram'

// import MainNavigator from './components/MainNavigator'
// import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native'
// export default class App extends Component {
//   render() {
//     return (
//       <Text>heja</Text>
//     );
//   }
// }
export default App = createStackNavigator(
    {
        Dom: {screen: Dom},
        Swiatlo: {screen: Swiatlo},
        Efekty: {screen: Efekty},
        Ogrzewanie: {screen: Ogrzewanie}, 
        Harmonogram: {screen: Harmonogram}, 
    },
    {
        initialRouteName: 'Dom',
    }
)




// import { Navigation } from "react-native-navigation";
// import { Provider } from "react-redux";

// import AuthScreen from "./src/screens/Auth/Auth";
// import SharePlaceScreen from "./src/screens/SharePlace/SharePlace";
// import FindPlaceScreen from "./src/screens/FindPlace/FindPlace";
// import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
// import SideDrawer from "./src/screens/SideDrawer/SideDrawer";
// import configureStore from "./src/store/configureStore";

// const store = configureStore();

// // Register Screens
// Navigation.registerComponent(
//   "awesome-places.AuthScreen",
//   () => AuthScreen,
//   store,
//   Provider
// );
// Navigation.registerComponent(
//   "awesome-places.SharePlaceScreen",
//   () => SharePlaceScreen,
//   store,
//   Provider
// );
// Navigation.registerComponent(
//   "awesome-places.FindPlaceScreen",
//   () => FindPlaceScreen,
//   store,
//   Provider
// );
// Navigation.registerComponent(
//   "awesome-places.PlaceDetailScreen",
//   () => PlaceDetailScreen,
//   store,
//   Provider
// );
// Navigation.registerComponent(
//   "awesome-places.SideDrawer",
//   () => SideDrawer,
//   store,
//   Provider
// );

// // Start a App
// export default () => Navigation.startSingleScreenApp({
//   screen: {
//     screen: "awesome-places.AuthScreen",
//     title: "Login"
//   }
// });
