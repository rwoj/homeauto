import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native'
import { Button } from 'react-native-elements';

import PlanLokaluListItem from "../../components/PlanLokalu/PlanLokaluListItem";
import TempChange from "./TempChange"

class PlanLokaluList extends Component {

    showTempBazowa = (temp, key) =>{
        return (
        <View key={key} style={styles.ruleItem}>
            <Text style={styles.textItem}>Temperatura bazowa: </Text>
            <TempChange />
        </View>)
    }

    render(){
        const { rules } = this.props
        console.log( rules );
        const listaRegul = rules.map((x, i) => 
        x.id!==0 ? <PlanLokaluListItem key={x.id+i} rule={x} />
                 : this.showTempBazowa(x.value, x.id+i))

        return (
            <View style={styles.itemBox}>
                {listaRegul}
            </View>    
    )}
}
export default PlanLokaluList

const styles = StyleSheet.create({
    itemBox: {
        // flex: 1, 
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    ruleItem: {
        // flex: 1, 
        flexDirection: 'row',
        // alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: 150,
    },
    textItem: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        height: 40,
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
    },
})