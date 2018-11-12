import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import {Icon} from 'react-native-elements'

class OgrzewanieForm extends React.Component {
    state={
        initTempNastawy: 0,
        tempNastawy: 0,
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.item.tempNast!==this.state.initTempNastawy){
            this.setState(
                {tempNastawy: nextProps.item.tempNast, initTempNastawy: nextProps.item.tempNast})
        }
    }
    onChange = e => this.setState({ [e.target.name]: e.target.value })
    increase = () => this.setState({tempNastawy: Number(this.state.tempNastawy)+0.5})
    decrease = () => this.setState({ tempNastawy: Number(this.state.tempNastawy)-0.5})

    render(){
        const {tempNastawy} = this.state
        const {item, zapisz} = this.props

        return (
        <View style={styles.itemBox}>
            <Text style={styles.item}> {item.nazwa} </Text>
            <Text style={styles.temp}> {item.temp} </Text>
            {item.tempNast!==''&& <View style={styles.nastawa}>    
                <TouchableOpacity onPress={this.decrease}>
                    <Icon size={30} type='material-community' name='minus-box' color='#3e2a19' /> 
                </TouchableOpacity>
                <Text style={styles.tempNastawy}>
                    {tempNastawy}
                </Text>
                <TouchableOpacity onPress={this.increase}>
                    <Icon size={30} type='material-community' name='plus-box' color='#3e2a19' /> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>zapisz(item.idTempNast, this.state.tempNastawy)}>
                    <Icon size={30} type='material-community' name='checkbox-marked' color='#3bb8c4' /> 
                </TouchableOpacity>
                <Text style={styles.tempNast}> {item.tempNast} </Text>
            </View>}
            {item.ogrzewanie==1 && <Icon size={30} type='material-icon' name='wb-iridescent' color='red' />}    
        </View>    
    )}
}
export default OgrzewanieForm

const styles = StyleSheet.create({
    itemBox: {
        flex: 1, 
        flexDirection: 'row',
        paddingLeft: 5, 
        alignItems: 'flex-end'
    },
    temp: {
        color: '#202c36',
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
    },
    tempNastawy: {
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        fontSize: 28,
        fontWeight: 'bold',
    },
    tempNast: {
        color: '#e3791c',
        fontSize: 28,
        // fontWeight: 'bold',
    },
    item: {
        color: '#3e2a19',
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
        width: 200,
    },
    nastawa: {
        flex: 1,
        flexDirection: 'row',
        borderStyle: 'solid',
        borderColor: 'red',
        alignItems: 'flex-end',
    }     
})
 