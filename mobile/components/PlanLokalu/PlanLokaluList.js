import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { Button, Icon } from 'react-native-elements';

import PlanLokaluListItem from "./PlanLokaluListItem";
import PlanLokaluListItemTempBaz from "./PlanLokaluListItemTempBaz";

class PlanLokaluList extends Component {
    render(){
        const { rules, removeRule, modifyRule } = this.props
        console.log("local rules: ", rules );
        const listaRegul = rules.map((x, i) => 
            x.id!==0 
            ? <PlanLokaluListItem key={x.id} rule={x} 
                modifyRule={modifyRule} removeRule={removeRule} />
            : <PlanLokaluListItemTempBaz key={x.id} rule={x} 
                modifyRule={modifyRule} />);

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
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 100,
    },
    textItem: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#e3791c',
        // backgroundColor: '#e3791c',
        height: 40,
        marginTop: 2,
        marginLeft: 2,
        marginRight: 2,
    },
})