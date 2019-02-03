import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native'
import {Icon, Button, CheckBox, Divider} from 'react-native-elements'

import UInput from '../utils/UInput';
import PlanLokaluItemWeekday from './PlanLokaluItemWeekday';

class PlanLokaluItemNew extends Component {
    state = {
        startT: {
            name: 'startT',
            // editing: false,
            value: '00.00',
            error: false,
            errorMessage: '',
        },
        endT: {
            name: 'endT',
            // editing: false,
            value: '00.00',
            error: false,
            errorMessage: '',
        },
        temp: {
            name: 'temp',
            // editing: false,
            value: '00.00',
            error: false,
            errorMessage: '',
        },
        weekday: [true, true, true, true, true, true, true]
    }
    onChange = (name, value) => this.setState({[name]: {...this.state[name], value: value}})
    changeDay = (day) => {
        // console.log("changeday", day);
        const tempWeek = this.state.weekday;
        tempWeek[day]=!tempWeek[day];
        this.setState({weekday: [...tempWeek]})
    }
    cancelNew = ()=>{
        // console.log("cancelNew")
        // could reset state
        this.props.cancelNew();
    }
    sendNew = ()=>{
        const {rules} = this.props;
        const nextId = rules.reduce((acc, x)=> x.id > acc ? x.id : acc , 0);
        const newRule={
            id: nextId+1,
            idLokalu: rules[0].idLokalu, 
            address: rules[0].address,
            temp: true, nazwa: 'plan',
            startT: this.state.startT.value,
            endT: this.state.endT.value,
            value: this.state.temp.value,
            weekday: [...this.state.weekday],
        }
        this.props.sendNew(newRule)
        // clear state
    }
    render(){
        const { startT, endT, temp, weekday} = this.state;  
        // const { sendUpdate, cancelEdit } = this.props;
        return (
            <View style={styles.ruleItem}>             
                <View style={styles.ruleLine}> 
                    <Text style={styles.labelsText}>Czas od</Text>
                    <UInput 
                        data={startT}
                        onChange={this.onChange}
                    />
                    <Text style={styles.labelsText}>do</Text>
                    <UInput 
                        data={endT}
                        onChange={this.onChange}
                    />
                    <Text style={styles.labelsText}>Temperatura</Text>
                    <UInput 
                        data={temp}
                        onChange={this.onChange}
                    />
                </View>
                <PlanLokaluItemWeekday 
                    weekday = {weekday} 
                    changeDay = {this.changeDay}
                />
                <Divider style={{ backgroundColor: '#3b84c4', height: 2 }} />
                <View style={styles.ruleLine}> 
                    <TouchableOpacity onPress={this.cancelNew}>
                        <Icon size={46} type='material-community' name='close-box' color='#a7251a' /> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.sendNew} >
                        <Icon size={46} type='material-community' name='checkbox-marked' color='#3bb8c4' /> 
                    </TouchableOpacity>
                </View>   
            </View>
    )}
}           
export default PlanLokaluItemNew

const styles = StyleSheet.create({
    ruleItem: {
        // flex: 1, 
        flexDirection: 'column',
        // justifyContent: 'center',
        height: 200,
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
    labelsText: {
        fontSize: 16,
        color: 'white'
    },
})
