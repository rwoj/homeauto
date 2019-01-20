import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { Button, Icon, Input } from 'react-native-elements';

import UInput from '../utils/UInput';
// import TempChange from "./TempChange"

class PlanLokaluListItemTempBaz extends Component {
    state = {
        temp: {
            name: 'temp',
            editing: false,
            value: '0.0',
            error: false,
            errorMessage: '',
        },
        // editing: false,
        // temp: '21',
        // error: false,
        // errorMessage: '',
    }
    onChange = (name, text) => this.setState({[name]: {value: text}})
    setEditing = (name)=>{
        // this.props.toggleEdit()
        this.setState({[name]: {editing: true}});
    }
    cancelEdit = ()=>{
        this.setState({
            temp: {editing: false}
        });
    }

    render (){
        const {rule} = this.props;
        const {temp} = this.state;
        return (
        <View style={styles.ruleItem}>
            <Text style={styles.textItemNonPress}>Temp. bazowa: </Text>
            { !temp.editing && (
                <TouchableOpacity onLongPress={()=>this.setEditing('temp')}>
                    <Text style={styles.textItem}> {rule.value} </Text>
                </TouchableOpacity>
            )}
            { temp.editing && (
                <View style={styles.ruleItemCont}>
                    <UInput 
                        data={temp}
                        onChange={this.onChange}
                    />
                    <TouchableOpacity >
                        <Icon size={42} type='material-community' name='checkbox-marked' color='#3bb8c4' /> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.cancelEdit}>
                        <Icon size={42} type='material-community' name='close-box' color='#a7251a' /> 
                    </TouchableOpacity>
                </View>
            )}
        </View>)
    }
}
export default PlanLokaluListItemTempBaz;


const styles = StyleSheet.create({

    ruleItem: {
        // flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 100,
    },
    ruleItemCont: {
        // flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 120,
    },
    textItemNonPress: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#e3791c',
        // backgroundColor: '#e3791c',
        height: 40,
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
    },
    textItem: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        height: 40,
        marginLeft: 2,
        marginRight: 10,
        padding: 2,
    },
    textInput: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        backgroundColor: '#e3791c',
        // width: 30,
    },
    input: {
        width: 80,
        // marginLeft: 5,
        // marginRight: 5,
        // padding: 0,
    },
})

                // {/* <View style={styles.ruleItemCont}>
                //     <Input
                //         inputStyle={styles.textInput}
                //         keyboardType="number"
                //         placeholder={temp}
                //         value={temp}
                //         onChangeText= {(text)=>this.onChange('temp', text)}
                //         errorStyle={error && { color: 'red' }}
                //         errorMessage={errorMessage}
                //         containerStyle={styles.input}
                //     />
                //     <TouchableOpacity >
                //         <Icon size={42} type='material-community' name='checkbox-marked' color='#3bb8c4' /> 
                //     </TouchableOpacity>
                //     <TouchableOpacity >
                //         <Icon size={42} type='material-community' name='close-box' color='#a7251a' /> 
                //     </TouchableOpacity>
                // </View> */}