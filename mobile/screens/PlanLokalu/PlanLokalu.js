import React, {Component} from 'react';
import {connect} from 'react-redux';
import {regulyHashSelector} from '../../store/reducers/reguly'
import { wsSend } from "../../store/actions/websocket";

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import PlanLokaluList from "../../components/PlanLokalu/PlanLokaluList";
import PlanLokaluItemNew from "../../components/PlanLokalu/PlanLokaluItemNew";

class PlanLokalu extends Component {
    static navigationOptions = ({navigation})=>{
        return {
            title: navigation.getParam('nazwaLokalu', 'brak lokalu'),
            headerStyle: {
                backgroundColor: '#c9d5df'
            }
        }
    }
    state={
        isListVisible: true,
        item: {},
        tempNastawy: 0,
        isRuleEdited: false,
        editedRule: {},
    }
    componentDidMount(){
        this.setState({item: this.props.navigation.getParam('item', 'no item')})
    }

    modifyRule = (dane)=>{
        console.log("modify", dane)
        this.props.wsSend({
            key: 'zmienRegula', 
            value: dane
        })
    }
    removeRule = (dane)=>{
        console.log("removeRule: ", dane)
        this.props.wsSend({
            key: 'usunRegula', 
            value: dane
        })
    }
    sendNew = (dane)=>{
        console.log("nowa regula", dane)
        this.props.wsSend({
            key: 'nowaRegula', 
            value: dane
        })
        this.setState({isListVisible: true})
    }
    cancelNew = ()=>{
        this.setState({isListVisible: true})      
    }

    newItemButton = ()=>{
        this.setState({isListVisible: !this.state.isListVisible})
    }    
    showNewButton = ()=>{
        return !this.state.isRuleEdited &&
        (<TouchableOpacity style={styles.addNew}
            onPress={this.newItemButton}> 
            <Text style={styles.addNewText}>+</Text>
        </TouchableOpacity>)
    }

    render(){
        const { isListVisible, item } = this.state;
        const { rules } = this.props;
        const localReguly = rules ? rules.filter(x=>x.idLokalu===item.idLokalu):[];

        return (
            <View style={styles.container}>
                {isListVisible && 
                    <View style={styles.list}>
                        <PlanLokaluList 
                            rules={localReguly}
                            removeRule={this.removeRule}
                            modifyRule={this.modifyRule}
                        />
                        {this.showNewButton()}
                    </View>
                }
                {!isListVisible && 
                    <PlanLokaluItemNew
                        rules={localReguly}
                        cancelNew={this.cancelNew}
                        sendNew = {this.sendNew}
                    />
                }
            </View> 
    )}
}
const mapStateToProps = state => ({
    rules: regulyHashSelector(state)
})
const mapDispatchToProps = dispatch => ({
        wsSend: (dane) => dispatch(wsSend(dane))    
})

export default connect(mapStateToProps, mapDispatchToProps)(PlanLokalu)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202c36',
    },
    list: {
        flex: 1,
    },
    addNew: {
        width: 50,
        borderRadius: 40,
        backgroundColor: '#3b84c4',
        position: 'absolute',
        bottom: 10,
        right: 10,
        alignItems: 'center',

    },
    addNewText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
    },
})