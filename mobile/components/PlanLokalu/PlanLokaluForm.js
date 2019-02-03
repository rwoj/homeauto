import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, CheckBox } from 'react-native'
// import {Icon, Button, CheckBox } from 'react-native-elements'

class PlanLokaluForm extends Component {
    state={
        rule: {
            nazwa: "",
            tempNast: 0,
            startHr: 0,
            czasMin: 0,
            dni: [false, false, false, false, false, false, false],
        },
    }
    onChange = (name, text) => this.setState({rule:{...this.state.rule, [name]: text, }})
    onCheckPress = (nr)=>{
        const {rule} = this.state;
        const targetDni = rule.dni;
        targetDni[nr]=!targetDni[nr]; 
        this.setState({rule: {...rule, dni: targetDni}})
    }


    render(){
        const {rule} = this.state;
        const {wyslijNowaRegula, nowyItem} = this.props;

        return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textInput}
                placeholder="podaj nazwę reguły"
                onChangeText= {(text)=>this.onChange('nazwa', text)}
            />
            <TextInput 
                style={styles.textInput}
                keyboardType="numeric"
                placeholder="temperatura nastawy"
                onChangeText= {(text)=>this.onChange('tempNast', text)}
            />
            <TextInput 
                style={styles.textInput}
                keyboardType="numeric"
                placeholder="godzina startu"
                onChangeText= {(text)=>this.onChange('startHr', text)}
            />
            <TextInput 
                style={styles.textInput}
                keyboardType="numeric"
                placeholder="czas trwania"
                onChangeText= {(text)=>this.onChange('czasMin', text)}
            />
            <CheckBox
                title='N'
                value={this.state.rule.dni[0]}
                onValueChange={()=>this.onCheckPress(0)}
            />
            <CheckBox
                title='Pn'
                value={this.state.rule.dni[1]}
                onValueChange={()=>this.onCheckPress(1)}
            />
            <CheckBox
                title='Wt'
                value={this.state.rule.dni[2]}
                onValueChange={()=>this.onCheckPress(2)}
            />
            <CheckBox
                title='Sr'
                value={this.state.rule.dni[3]}
                onValueChange={()=>this.onCheckPress(3)}
            />
            <CheckBox
                title='Cz'
                value={this.state.rule.dni[4]}
                onValueChange={()=>this.onCheckPress(4)}
            />
            <CheckBox
                title='Pt'
                value={this.state.rule.dni[5]}
                onValueChange={()=>this.onCheckPress(5)}
            />
            <CheckBox
                title='So'
                value={this.state.rule.dni[6]}
                onValueChange={()=>this.onCheckPress(6)}
            />
            
            <TouchableOpacity style={styles.return}
                    onPress={nowyItem}> 
                    <Text style={styles.buttonText}>anuluj</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.zapis}
                    onPress={()=>wyslijNowaRegula(rule)}> 
                    <Text style={styles.buttonText}>wyslij</Text>
            </TouchableOpacity>
        </View>    
    )}
}
export default PlanLokaluForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#202c36',
    },
    return: {
        width: 120,
        borderRadius: 40,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 10,
        left: 10,
        alignItems: 'center',
    },
    zapis: {
        width: 120,
        borderRadius: 40,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 10,
        right: 10,
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    textInput: {
        fontSize: 20,
        color: 'white',
    },
})
