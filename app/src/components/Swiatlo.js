import React from 'react'
// import { Button } from 'react-native-elements'
import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import {wyjsciaHashSelector} from '../store/reducers/register'
import {konfigSelector} from '../store/reducers/ustawienia'
import SwiatloForm from './SwiatloForm'
// import api from '../api'

class Swiatlo extends React.Component {
    // static navigationOptions: {
    //     title: 'Swiatla',
    //     headerStyle: {
    //         backgroundColor: '#c9d5df'
    //     }
    // }
    state={
        poziom: 'parter', 
        ws: null 
    }
    componentDidMount () {
        this.setState({ws: this.props.navigation.getParam('ws', null)})
    }
    // componentWillUnmount(){
    //     this.setState({ws: null})
    // }
    zapisz = (address, value)=> {
        console.log(this.state.ws, address, value);
        this.state.ws.send(JSON.stringify('zmianaSwiatla', 
        {address, value, temp: false}))
    }
    // (obj) => this.ws.send(JSON.stringify(obj))
        // console.log(addr,value);
    // api.rejestr.wyslijZmiane(addr, value)
    
    render(){
        const {poziom} = this.state
        const {konfig, wyjscia} = this.props
        const currentSwiatla={ parter: {}, pietro: {}, calyDom: {} }   

        konfig.map(x=>{
            const swiatlo = x.idWy>0 ? wyjscia.find(y=>y.id===x.idWy):{value: -1}
            const swiatloValue = swiatlo?swiatlo.value:-1
            if(x.rodzaj==='swiatlo'){
                if (x.poziom==='parter'){
                    if (!currentSwiatla.parter[x.nazwaLokalu]){
                        currentSwiatla.parter[x.nazwaLokalu]=[]
                    }
                    return currentSwiatla.parter[x.nazwaLokalu].push(
                        {...x, swiatlo : swiatloValue})
                } else if (x.poziom==='pietro') {
                    if (!currentSwiatla.pietro[x.nazwaLokalu]){
                        currentSwiatla.pietro[x.nazwaLokalu]=[]
                    }
                    return currentSwiatla.pietro[x.nazwaLokalu].push(
                        {...x, swiatlo : swiatloValue})
                }
                if (!currentSwiatla.calyDom[x.nazwaLokalu]){
                    currentSwiatla.calyDom[x.nazwaLokalu]=[]
                }
                return currentSwiatla.calyDom[x.nazwaLokalu].push(
                    {...x, swiatlo : swiatloValue}) 
            }
        })
        const dataToShow=[]
        for (let lokal in currentSwiatla[poziom] ){
            dataToShow.push({lokal: lokal, data: currentSwiatla[poziom][lokal] })
        }

        return (
            <View style={styles.container}>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={()=>this.setState({poziom: 'parter'})}> 
                        <Text style={styles.item}>Parter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({poziom: 'pietro'})} text="Piętro">
                        <Text style={styles.item}>Piętro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>this.setState({poziom: 'calyDom'})}>
                        <Text style={styles.item}>Zewnętrzne</Text>
                    </TouchableOpacity>
                </View>    
                <SectionList style={styles.box}
                    sections={dataToShow}
                    renderItem={({item}) => 
                        <SwiatloForm item={item} zapisz={this.zapisz}/>}    
                    renderSectionHeader={({section}) => 
                        <Text style={styles.sectionHeader}>{section.lokal}</Text>}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}
function mapStateToProps (state){
    return {
      wyjscia: wyjsciaHashSelector(state),
      konfig: konfigSelector(state), 
    }
  }

export default connect(mapStateToProps)(Swiatlo)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#202c36',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#202c36',
        // height: 60,
        margin: 10
    },
    box: {
        flex: 1,
        backgroundColor: 'chocolate',
        borderStyle: 'solid',
        borderColor: '#3e2a19',
        borderWidth: 5,
        borderRadius: 10,
        height: 500,
        margin: 10,
    },
    sectionHeader: {
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: '#3e2a19',
      color: '#c9d5df'
    },
    item: {
        marginRight: 5,
        marginLeft: 5,
        color: '#c9d5df',
        backgroundColor: '#3b84c4',
        borderRadius: 10,
        fontSize: 32,
        padding: 5,
        fontWeight: 'bold',
    }
  })
