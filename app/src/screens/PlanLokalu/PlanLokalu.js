import React, {Component} from 'react';
import {connect} from 'react-redux';
import {regulyHashSelector} from '../../store/reducers/reguly'
import { wsSend } from "../../store/actions/websocket";

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import PlanLokaluList from "../../components/PlanLokalu/PlanLokaluList";
import PlanLokaluForm from "../../components/PlanLokalu/PlanLokaluForm";

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
    }
    componentDidMount(){
        this.setState({item: this.props.navigation.getParam('item', 'no item')})
    }
    // componentWillReceiveProps(nextProps){
    //     if (nextProps.item.tempNast!==this.state.initTempNastawy){
    //         this.setState(
    //             {tempNastawy: nextProps.item.tempNast, initTempNastawy: nextProps.item.tempNast})
    //     }
    // }
    // onChange = e => this.setState({ [e.target.name]: e.target.value })
    // increase = () => this.setState({tempNastawy: Number(this.state.tempNastawy)+0.5})
    // decrease = () => this.setState({ tempNastawy: Number(this.state.tempNastawy)-0.5})
    wyslijNowaRegula = (dane)=>{
        console.log(dane)
        dane = {nazwa: "testreguly1", tempNast: "22.5", 
                startHr: "14.00", czasMin: "5", 
                dni: [true, true, false, false, false, false, true]
            }
        this.props.wsSend({
            key: 'nowaRegula', 
            value:{dane}
        })
        this.setState({isListVisible: !this.state.isListVisible})
    }
    zmodyfikujRegula = (dane)=>{
        console.log(dane)
        dane = {nazwa: "testreguly1", tempNast: "22.5", 
                startHr: "14.00", czasMin: "5", 
                dni: [true, true, false, false, false, false, true]
            }
        this.props.wsSend({
            key: 'zmienRegula', 
            value:{dane}
        })
        this.setState({isListVisible: !this.state.isListVisible})
    }
    usunRegula = (dane)=>{
        console.log(dane)
        dane = { id: 1, idLokalu: 1}
        this.props.wsSend({
            key: 'usunRegula', 
            value:{dane}
        })
        this.setState({isListVisible: !this.state.isListVisible})
    }

    nowyItem = ()=>{
        this.setState({isListVisible: !this.state.isListVisible})
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
                        />
                        <TouchableOpacity style={styles.addNew}
                            onPress={this.nowyItem}> 
                            <Text style={styles.addNewText}>+</Text>
                        </TouchableOpacity>
                    </View>
                }
                {!isListVisible && 
                    <PlanLokaluForm
                        nowyItem = {this.nowyItem}
                        wyslijNowaRegula = {this.wyslijNowaRegula}
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
        backgroundColor: 'blue',
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