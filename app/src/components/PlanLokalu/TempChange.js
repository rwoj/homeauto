import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native'
import {Input, Icon, Button, CheckBox, Divider, Overlay} from 'react-native-elements'

class TempChange extends Component {
    state = {
        temp: '21',
        error: false,
        errorMessage: '',
    }
    onChange = (name, text) => this.setState({[name]: text})
        // this.isTempOK(text)
    
    onCheckPress = (nr)=>{
        const {rule} = this.state;
        const targetDni = rule.dni;
        targetDni[nr]=!targetDni[nr]; 
        this.setState({rule: {...rule, dni: targetDni}})
    }

    isTempOK = (text)=>{
        const tempText = text;
        const tempTbl = tempText.split('.');
        if (tempTbl.length > 2 || tempTbl.length < 1){
            this.setState({error: true, errorMessage: 'wprowadź poprawną temperaturę'})
            return false;
        } 
        console.log(tempTbl);
        if (tempTbl[0] && parseInt(tempTbl[0])>16 && parseInt(tempTbl[0])<26){
            if (tempTbl.length===1 || (tempTbl[1]>0 && tempTbl[1]<90)){
                this.setState({ error: false, errorMessage: '' })
                return true;
            } 
        } 
        this.setState({error: true, errorMessage: 'wprowadź poprawną temperaturę'})
        return false;
    }

 

    render (){
        const {temp, error, errorMessage} = this.state;
        return (
            <Input
                inputStyle={styles.textInput}
                keyboardType="numeric"
                placeholder={temp}
                value={temp}
                onChangeText= {(text)=>this.onChange('temp', text)}
                errorStyle={error && { color: 'red' }}
                errorMessage={errorMessage}
            />
        )
    }
};
export default TempChange;

const styles = StyleSheet.create({
    textInput: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        backgroundColor: '#e3791c',
        width: 30,
    },
})
