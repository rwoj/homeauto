import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { Button, Icon, Input } from 'react-native-elements';


class UInput extends Component {

    render () {
        const {data, onChange} = this.props;
        // console.log(data, data.name);
        return (
                <Input
                    inputStyle={styles.textInput}
                    keyboardType="numeric"
                    placeholder={data.value}
                    value={data.value}
                    onChangeText= {(text)=>onChange(data.name, text)}
                    errorStyle={data.error && { color: 'red' }}
                    errorMessage={data.errorMessage}
                    containerStyle={styles.input}
                />
        )
    }
}
export default UInput ;

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
        height: 100,
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

