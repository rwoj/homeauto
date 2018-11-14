// import {StackNavigator } from 'react-navigation'
import {createStackNavigator } from 'react-navigation'
import Dom from './Dom'
import Ogrzewanie from './Ogrzewanie'
import Swiatlo from './Swiatlo'
import Efekty from './Efekty'
import Harmonogram from './Harmonogram'

export default MainNavigator = createStackNavigator(
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
