import {StackNavigator } from 'react-navigation'
import Dom from './Dom'
import Ogrzewanie from './Ogrzewanie'
import Swiatlo from './Swiatlo'
import Efekty from './Efekty'
import Harmonogram from './Harmonogram'

export default MainNavigator = StackNavigator(
    {
        Dom: {
            screen: Dom,
            navigationOptions: {
                title: 'Sterowanie domem',
                headerStyle: {
                    backgroundColor: '#c9d5df'
                }
            }
        },
        Swiatlo: {
            screen: Swiatlo,
            navigationOptions: {
                title: 'Swiatla',
                headerStyle: {
                    backgroundColor: '#c9d5df'
                }
            }
        },
        Efekty: {
            screen: Efekty,
            navigationOptions: {
                title: 'Efekty/sceny',
                headerStyle: {
                    backgroundColor: '#c9d5df'
                }
            }
        },
        Ogrzewanie: {
            screen: Ogrzewanie,
            navigationOptions: {
                title: 'Ogrzewanie',
                headerStyle: {
                    backgroundColor: '#c9d5df'
                }
            }
        }, 
        Harmonogram: {
            screen: Harmonogram,
            navigationOptions: {
                title: 'Harmonogram',
                headerStyle: {
                    backgroundColor: '#c9d5df'
                }
            }
        }, 
    },
    {
        initialRouteName: 'Dom',
    }
)
