import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native'
import {Icon, Button} from 'react-native-elements'

class PlanLokaluListItem extends Component {
    render(){
        const { rule } = this.props
        // console.log( item )
        return (
        <View style={styles.rule}>
            <Button style={styles.button} title='X'/>
            <TouchableOpacity >
                <Text style={styles.item}> 
                  {rule.nazwa} {rule.startT} {rule.endT} {rule.value} 
                </Text>
            </TouchableOpacity>
        </View>    
    )}
}
export default PlanLokaluListItem

const styles = StyleSheet.create({
    rule: {
        // flex: 1, 
        flexDirection: 'row',
        // alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    item: {
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        fontSize: 15,
        margin: 5,
        paddingLeft: 3,
        height: 40,
    },
    button: {
        color: 'black',
    },
})
 
