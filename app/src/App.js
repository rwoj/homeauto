import {createStackNavigator } from 'react-navigation'
import Dom from './screens/Dom/Dom'
import Swiatlo from './screens/Swiatlo/Swiatlo'
import Ogrzewanie from './screens/Ogrzewanie/Ogrzewanie'
import Efekty from './screens/Efekty/Efekty'
import EfektyOgrzewanie from './screens/EfektyOgrzewanie/EfektyOgrzewanie'
import PlanLokalu from './screens/PlanLokalu/PlanLokalu'


export default App = createStackNavigator(
    {
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
    }
)