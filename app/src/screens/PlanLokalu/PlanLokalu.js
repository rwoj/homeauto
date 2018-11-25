import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native'

class PlanLokalu extends Component {

    render(){
        const {navigation} = this.props;
        console.log(navigation.getParam('lokal', 'no value'))
        return (
            <View >    
                <Text > PlanLokalu... </Text>
            </View>    
        )
    }
}
export default PlanLokalu
    // navigationOptions: {
    //     title: 'PlanLokalu',
    //     headerStyle: {
    //         backgroundColor: '#c9d5df'
    //     }
    // }