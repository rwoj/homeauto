import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native'
import {Icon, Button, CheckBox, Divider} from 'react-native-elements'

import PlanLokaluChangeForm from './PlanLokaluChangeForm';

class PlanLokaluListItem extends Component {
    // state = {
    //     isVisible: true,
    // }

    showWorkDays = (days, size) => (
        <View style={styles.days}>
            <CheckBox title='P' size={size} checked={days[1]} />
            <CheckBox title='W' size={size} checked={days[2]} />
            <CheckBox title='Ś' size={size} checked={days[3]} />
            <CheckBox title='C' size={size} checked={days[4]} />
            <CheckBox title='P' size={size} checked={days[5]} />
        </View>
    )
    showWendDays = (days, size) => (
        <View style={styles.days}>
            <CheckBox title='S' size={size} checked={days[6]} />
            <CheckBox title='N' size={size} checked={days[0]} />
        </View>
    )

    render(){
        const { rule } = this.props;
        // const { isVisible } = this.state;
        // console.log (isVisible)
        return (

        <View style={styles.ruleItem}>
            <View style={styles.ruleLine}> 
                <View style={styles.ruleLineStart}> 
                    <Icon name='cancel' color='red' size={36} />
                </View>
                <View style={styles.ruleLineMid}>
                    <TouchableOpacity >
                        <Text style={styles.textItem}> 
                        {rule.startT}-{rule.endT}: {rule.value} 
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ruleLineEnd}> 
                    {this.showWendDays(rule.weekday, 14)}
                </View>
            </View>
            <View style={styles.ruleLine}> 
                {this.showWorkDays(rule.weekday, 14)}
            </View>
            <Divider style={{ backgroundColor: 'blue', height: 2 }} />
        </View>         
    )}
}
            //  { !isVisible && (

{/* <PlanLokaluChangeForm /> */}

            
export default PlanLokaluListItem

const styles = StyleSheet.create({
    ruleItem: {
        // flex: 1, 
        flexDirection: 'column',
        // alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: 120,
    },
    ruleLine: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 2,
    },
    ruleLineStart: {
        flex: 1,
        flexDirection: 'row',
    },
    ruleLineMid: {
        flex: 6,
        flexDirection: 'row',
    },
    ruleLineEnd: {
        flex: 2,
        flexDirection: 'row',
    },
    days: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 5,
    },
    item: {
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        fontSize: 20,
        margin: 2,
        // paddingLeft: 5,
    },
    button: {
        color: 'black',
    },
    checkbox: {
        // width: 55,
    }, 
    textItem: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        height: 40,
        marginLeft: 2,
        marginRight: 2,
    },
})
 
// tempNastawy: {
//     color: '#3e2a19',
//     backgroundColor: '#e3791c',
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     marginRight: 10,
// },
// tempNast: {
//     color: '#e3791c',
//     fontSize: 20,
//     marginLeft: 10,
//     // marginRight: 10,
//     // fontWeight: 'bold',
// },