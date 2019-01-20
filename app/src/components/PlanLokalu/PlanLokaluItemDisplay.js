import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native'
import {Icon, Button, CheckBox, Divider} from 'react-native-elements'

class PlanLokaluItemDisplay extends Component {

    render(){
        const { rule, removeRule, setEditing } = this.props;
        return (
        <View style={styles.ruleLine}> 
            <TouchableOpacity style={styles.ruleLineStart}
                onPress={()=>removeRule(rule)}> 
                <Icon name='cancel' color='#a7251a' size={38} />
            </TouchableOpacity>
            <View style={styles.ruleLineMid}>
                <TouchableOpacity onLongPress={setEditing}>
                    <Text style={styles.textItem}> 
                        {rule.startT} 
                    </Text>
                </TouchableOpacity>
                <Text>-</Text>
                <TouchableOpacity onLongPress={setEditing}>
                    <Text style={styles.textItem}> 
                        {rule.endT} 
                    </Text>
                </TouchableOpacity>
                <Text>:</Text>
                <TouchableOpacity onLongPress={setEditing}>
                    <Text style={styles.textItem}> 
                        {rule.value} 
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )}
}           
export default PlanLokaluItemDisplay;

const styles = StyleSheet.create({
    ruleItem: {
        // flex: 1, 
        flexDirection: 'column',
        // justifyContent: 'center',
        height: 140,
        margin: 2,
    },
    ruleLine: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ruleDaysLine: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginLeft: 2,
    },
    ruleLineStart: {
        flex: 1,
        flexDirection: 'row',
    },
    ruleLineMid: {
        flex: 8,
        flexDirection: 'row',
    },
    ruleLineEnd: {
        flex: 2,
        flexDirection: 'row',
    },
    daysWeek: {
        flex: 4,
        flexDirection: 'column',
    },
    daysWeekEnd: {
        flex: 2,
        flexDirection: 'column',
    },
    days: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 2,
    },
    daysLabels: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 30,
    },
    containerStyle: {
        backgroundColor: '#c9d5df',
        // width: 30,
        // margin: 2,
    },
    containerStyleEnd: {
        backgroundColor: '#e2cdbb',
        // width: 30,
        // margin: 2,
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
        padding: 2,
    },
    daysLabelsText: {
        fontSize: 16,
        color: 'white'
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

                // {/* <View style={styles.ruleLineEnd}> 
                // </View> */}