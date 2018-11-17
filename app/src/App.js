import {createStackNavigator } from 'react-navigation'
import Dom from './screens/Dom/Dom'
import Swiatlo from './screens/Swiatlo/Swiatlo'
import Ogrzewanie from './screens/Ogrzewanie/Ogrzewanie'
import Efekty from './screens/screens/Efekty'
import Harmonogram from './screens/screens/Harmonogram'

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