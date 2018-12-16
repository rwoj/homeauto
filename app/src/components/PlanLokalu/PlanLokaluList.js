import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native'

import PlanLokaluListItem from "../../components/PlanLokalu/PlanLokaluListItem";

class PlanLokaluList extends Component {
    render(){
        const { rules } = this.props
        console.log( rules );
        const listaRegul = rules.map((x, i) =>
            <PlanLokaluListItem key={x+i} rule={x} />)

        return (
        <View style={styles.itemBox}>
            {listaRegul}
        </View>    
    )}
}
export default PlanLokaluList

const styles = StyleSheet.create({
    itemBox: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },
})