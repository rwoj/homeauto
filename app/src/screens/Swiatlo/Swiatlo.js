import React from 'react'
import {connect} from 'react-redux'
import {wyjsciaHashSelector} from '../../store/reducers/register'
import {konfigSelector} from '../../store/reducers/ustawienia'
import { wsSend } from "../../store/actions/websocket";

import { StyleSheet, View } from 'react-native'

import SwiatloHeader from '../../components/Swiatlo/SwiatloHeader';
import SwiatloList from '../../components/Swiatlo/SwiatloList';

class Swiatlo extends React.Component {
    static navigationOptions = {
        title: 'Swiatla',
        headerStyle: {
            backgroundColor: '#c9d5df'
        }
    }
    state = { poziom: 'parter' }
    zapisz = (address, value)=> this.props.wsSend({   
        key: 'zmianaSwiatla', 
        value:{address, value, temp: false}
    });
    zmienPoziom = (poziom) => this.setState({poziom});

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
                <SwiatloHeader zmienPoziom={this.zmienPoziom} />
                <SwiatloList 
                    poziom={this.state.poziom}
                    dataToShow={dataToShow}
                    zapisz={this.zapisz}
                />
            </View>
        )
    }
}
const mapStateToProps = (state) => ({
      wyjscia: wyjsciaHashSelector(state),
      konfig: konfigSelector(state), 
})
const mapDispatchToProps = dispatch => ({ wsSend: (dane) => dispatch(wsSend(dane))})

export default connect(mapStateToProps, mapDispatchToProps)(Swiatlo)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202c36',
    },
  })
