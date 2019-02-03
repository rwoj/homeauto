import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import HomeScreen from '../screens/HomeScreen';
import Dom from '../screens/Dom/Dom'
import Swiatlo from '../screens/Swiatlo/Swiatlo'
import Ogrzewanie from '../screens/Ogrzewanie/Ogrzewanie'
import Efekty from '../screens/Efekty/Efekty'
import EfektyOgrzewanie from '../screens/EfektyOgrzewanie/EfektyOgrzewanie'
import PlanLokalu from '../screens/PlanLokalu/PlanLokalu'

import MultiMediaScreen from '../screens/MultiMediaScreen';
import SettingsScreen from '../screens/SettingsScreen';

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// });
const HomeStack = createStackNavigator(    {
  Dom: {screen: Dom},
  Swiatlo: {screen: Swiatlo},
  Efekty: {screen: Efekty},
  Ogrzewanie: {screen: Ogrzewanie}, 
  EfektyOgrzewanie: {screen: EfektyOgrzewanie},
  PlanLokalu: {screen: PlanLokalu}, 
},
{
  initialRouteName: 'Dom',
  defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Dom',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MultiMediaStack = createStackNavigator({
  Multimedia: MultiMediaScreen,
});

MultiMediaStack.navigationOptions = {
  tabBarLabel: 'Multimedia',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  MultiMediaStack,
  SettingsStack,
});
