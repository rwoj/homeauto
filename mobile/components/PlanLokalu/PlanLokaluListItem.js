import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native'
import {Icon, Button, CheckBox, Divider} from 'react-native-elements'

import PlanLokaluItemDisplay from './PlanLokaluItemDisplay';
import PlanLokaluItemEdit from './PlanLokaluItemEdit';
import PlanLokaluItemWeekday from './PlanLokaluItemWeekday';

class PlanLokaluListItem extends Component {
    state = {
        editing: false,
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
        weekday: []
    }
    componentDidMount(){
        this.initState();
    }
    // componentDidUpdate(){
    //     this.initState();
    // }
    initState = ()=>{
        const {rule} = this.props;
        this.setState({
            editing: false,
            startT: {...this.state.startT, value: rule.startT.toString()}, 
            endT: {...this.state.endT, value: rule.endT.toString()},
            temp: {...this.state.temp, value: rule.value.toString()},
            weekday: [...rule.weekday]
        });
    }
    onChange = (name, value) => this.setState({[name]: {...this.state[name], value: value}})
    setEditing = ()=>{
        this.setState({ editing: true });
    }
    cancelEdit = ()=>{
        this.setState({ editing: false, weekday: [...this.props.rule.weekday] });
    }
    sendUpdate = (rule)=>{
        // console.log(this.state, rule);
        const updatedRule={
            ...rule, 
            startT: this.state.startT.value,
            endT: this.state.endT.value,
            value: this.state.temp.value,
            weekday: [...this.state.weekday],
        }
        this.props.modifyRule(updatedRule)
        this.setState({
            editing: false,
        });
    }
    changeDay = (day) => {
        console.log("changeday", day);
        const tempWeek = this.state.weekday;
        tempWeek[day]=!tempWeek[day];
        this.setState({weekday: [...tempWeek], editing: true})
    }
    render(){
        const { rule, removeRule } = this.props;
        const { startT, endT, temp, weekday, editing } = this.state;

        return (
        <View style={styles.ruleItem}>
            { !editing && (
                <PlanLokaluItemDisplay
                    rule={rule}
                    removeRule={removeRule}
                    setEditing={this.setEditing}  
                />)    
            }{ editing && (
                <PlanLokaluItemEdit 
                    startT={startT}
                    endT={endT}
                    temp={temp}
                    rule={rule}
                    onChange={this.onChange}
                    sendUpdate={this.sendUpdate}
                    cancelEdit={this.cancelEdit}
                />)
            }
            <PlanLokaluItemWeekday 
                weekday = {weekday} 
                changeDay = {this.changeDay}
            />
            <Divider style={{ backgroundColor: '#3b84c4', height: 2 }} />
        </View>         
    )}
}
export default PlanLokaluListItem


const styles = StyleSheet.create({
    ruleItem: {
        // flex: 1, 
        flexDirection: 'column',
        // justifyContent: 'center',
        height: 140,
        margin: 2,
    },
    // ruleLine: {
    //     flex: 2,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // ruleDaysLine: {
    //     flex: 3,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     // marginLeft: 2,
    // },
    // ruleLineStart: {
    //     flex: 1,
    //     flexDirection: 'row',
    // },
    // ruleLineMid: {
    //     flex: 8,
    //     flexDirection: 'row',
    // },
    // ruleLineEnd: {
    //     flex: 2,
    //     flexDirection: 'row',
    // },
    // daysWeek: {
    //     flex: 4,
    //     flexDirection: 'column',
    // },
    // daysWeekEnd: {
    //     flex: 2,
    //     flexDirection: 'column',
    // },
    // days: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     margin: 2,
    // },
    // daysLabels: {
    //     // flex: 1,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-around',
    //     height: 30,
    // },
    // containerStyle: {
    //     backgroundColor: '#c9d5df',
    //     // width: 30,
    //     // margin: 2,
    // },
    // containerStyleEnd: {
    //     backgroundColor: '#e2cdbb',
    //     // width: 30,
    //     // margin: 2,
    // },
    // item: {
    //     color: '#3e2a19',
    //     backgroundColor: '#e3791c',
    //     fontSize: 20,
    //     margin: 2,
    //     // paddingLeft: 5,
    // },
    // button: {
    //     color: 'black',
    // },
    // checkbox: {
    //     // width: 55,
    // }, 
    // textItem: {
    //     fontWeight: 'bold',
    //     fontSize: 22,
    //     color: '#3e2a19',
    //     backgroundColor: '#e3791c',
    //     height: 40,
    //     marginLeft: 2,
    //     marginRight: 2,
    //     padding: 2,
    // },
    // daysLabelsText: {
    //     fontSize: 16,
    //     color: 'white'
    // },
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

                // {/* <View style={styles.ruleLine}> 
                //     <TouchableOpacity style={styles.ruleLineStart}
                //         onPress={()=>removeRule(rule)}> 
                //         <Icon name='cancel' color='#a7251a' size={38} />
                //     </TouchableOpacity>
                //     <View style={styles.ruleLineMid}>
                //         <TouchableOpacity onLongPress={this.setEditing}>
                //             <Text style={styles.textItem}> 
                //                 {rule.startT} 
                //             </Text>
                //         </TouchableOpacity>
                //         <Text>-</Text>
                //         <TouchableOpacity onLongPress={this.setEditing}>
                //             <Text style={styles.textItem}> 
                //                 {rule.endT} 
                //             </Text>
                //         </TouchableOpacity>
                //         <Text>:</Text>
                //         <TouchableOpacity onLongPress={this.setEditing}>
                //             <Text style={styles.textItem}> 
                //                 {rule.value} 
                //             </Text>
                //         </TouchableOpacity>
                //     </View>
                // </View>) */}

                
            // {/* <View style={styles.ruleDaysLine}> 
            //     <View style={styles.daysWeek}>
            //         {this.showWeekLabels()}
            //         {this.showWorkDays(weekday, 16)}
            //     </View>
            //     <View style={styles.daysWeekEnd}>
            //         {this.showWeekEndLabels()}
            //         {this.showWeekDays(weekday, 16)}
            //     </View>
            // </View> */}
            {/* <View style={styles.ruleLine}> 
                    <UInput 
                        data={startT}
                        onChange={this.onChange}
                    />
                    <UInput 
                        data={endT}
                        onChange={this.onChange}
                    />
                    <UInput 
                            data={temp}
                            onChange={this.onChange}
                        />
                    <TouchableOpacity onPress={()=>this.sendUpdate(rule)} >
                        <Icon size={42} type='material-community' name='checkbox-marked' color='#3bb8c4' /> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.cancelEdit}>
                        <Icon size={42} type='material-community' name='close-box' color='#a7251a' /> 
                    </TouchableOpacity>
                </View>)     */}
                    // showWorkDays = (days, size) => (
    //     <View style={styles.days}>
    //         <CheckBox size={size} containerStyle={styles.containerStyle} 
    //             checked={days[1]} onIconPress={()=>this.changeDay(1)} />
    //         <CheckBox size={size} containerStyle={styles.containerStyle}
    //             checked={days[2]} onIconPress={()=>this.changeDay(2)} />
    //         <CheckBox size={size} containerStyle={styles.containerStyle}
    //             checked={days[3]} onIconPress={()=>this.changeDay(3)} />
    //         <CheckBox size={size} containerStyle={styles.containerStyle}
    //             checked={days[4]} onIconPress={()=>this.changeDay(4)} />
    //         <CheckBox size={size} containerStyle={styles.containerStyle}
    //             checked={days[5]} onIconPress={()=>this.changeDay(5)} />
    //     </View>
    // )
    // showWeekDays = (days, size) => (
    //     <View style={styles.days}>
    //         <CheckBox size={size} containerStyle={styles.containerStyleEnd}
    //             checked={days[6]} onIconPress={()=>this.changeDay(6)}/>
    //         <CheckBox size={size} containerStyle={styles.containerStyleEnd}
    //             checked={days[0]} onIconPress={()=>this.changeDay(0)}/>
    //     </View>
    // )
    // showWeekLabels = () => (
    //     <View style={styles.daysLabels}>
    //         <Text style={styles.daysLabelsText}> Pn  -  Pt </Text>
    //     </View>
    // )
    // showWeekEndLabels = () => (
    //     <View style={styles.daysLabels}>
    //         <Text style={styles.daysLabelsText}> So  -  N </Text>
    //     </View>
    // )
    // removeRuleT = (dane)=>console.log(dane)

