import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SectionList } from 'react-native'
import {Icon, Button} from 'react-native-elements'

import PlanLokaluListItem from "../../components/PlanLokalu/PlanLokaluListItem";

class PlanLokaluList extends Component {
    render(){
        // const { navigation} = this.props
        // console.log( item )
        const listaRegul = [<PlanLokaluListItem key={1} />, 
                            <PlanLokaluListItem key={2} />]

        return (
        <View>
            {listaRegul}
        </View>    
    )}
}
export default PlanLokaluList

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
 
{/* <View style={styles.nastawa}>    
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
                    {   nazwaLokalu: item.nazwaLokalu,
                        lokal: item
                    })}
/>   
</View> */}