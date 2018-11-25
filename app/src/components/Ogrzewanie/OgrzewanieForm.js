import React from 'react'
import {Icon, Button} from 'react-native-elements'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

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
        const {item, zapisz, navigation} = this.props

        return (
        <View style={styles.itemBox}>
            {item.tempNast!==''&& <View style={styles.nastawa}>    
                <TouchableOpacity onPress={this.decrease}>
                    <Icon size={42} type='material-community' name='minus-box' color='#3bb8c4' /> 
                </TouchableOpacity>
                <Text style={styles.tempNastawy}>
                    {tempNastawy}
                </Text>
                <TouchableOpacity onPress={this.increase}>
                    <Icon size={42} type='material-community' name='plus-box' color='#3bb8c4' /> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>zapisz(item.idTempNast, this.state.tempNastawy)}>
                    <Icon size={42} type='material-community' name='checkbox-marked' color='#3bb8c4' /> 
                </TouchableOpacity>
                <Text style={styles.tempNast}> {item.tempNast} </Text>
                <Button title = 'Plan' 
                        titleStyle = {{
                            color: '#3e2a19', 
                            fontWeight: 'bold'
                        }}
                        buttonStyle={{
                            backgroundColor: "#3bb8c4",
                            width: 100,
                            height: 30,
                            // borderColor: "transparent",
                            // borderWidth: 0,
                            borderRadius: 5
                        }}
                        onPress = {()=>navigation.navigate('PlanLokalu', 
                                    {lokal: item})}
                />   
            </View>}

            {/* {item.ogrzewanie==1 && <Icon size={20} type='material-icon' name='wb-iridescent' color='red' />}     */}
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
    // temp: {
    //     color: '#202c36',
    //     fontSize: 22,
    //     fontWeight: 'bold',
    //     marginLeft: 5,
    //     marginRight: 5,
    //     padding: 3,
    // },
    tempNastawy: {
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        fontSize: 26,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
    },
    tempNast: {
        color: '#e3791c',
        fontSize: 20,
        marginLeft: 10,
        // marginRight: 10,
        // fontWeight: 'bold',
    },
    item: {
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        // color: '#3e2a19',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 35,
        // marginRight: 5,
        padding: 3,
        width: 140,
    },
    nastawa: {
        flex: 1,
        flexDirection: 'row',
        // borderStyle: 'solid',
        // borderColor: 'red',
        // alignItems: 'flex-end',
    }     
})
 