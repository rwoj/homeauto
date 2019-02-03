import React from 'react'
import {connect} from 'react-redux'
import {konfigSelector} from '../../store/reducers/ustawienia'
import {wyjsciaHashSelector, wySatelHashSelector} from '../../store/reducers/register'
import { wsConnect, wsDisconnect } from "../../store/actions/websocket";

import { StyleSheet, View } from 'react-native';
import SwiatlaBox from './SwiatlaBox';
import OgrzewanieBox from './OgrzewanieBox';
import CzujkaForm from '../../components/Czujki/CzujkaForm';

class Dom extends React.Component {
    static navigationOptions = {
        title: 'Sterowanie domem',
        headerStyle: {
            backgroundColor: '#c9d5df',
        }, 
        // headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };
    componentDidMount () { this.props.wsConnect(); }
    componentWillUnmount () { this.props.wsDisconnect(); }

    render(){
        const {wyjscia, wySatel, konfig} = this.props
        const currentCzujki=[]
        const grzanie=[16941, 16950]
        let howManyActive=0 
        const wyFind= wyjscia && wyjscia.length>0 ? wyjscia.find(x=>x.id===16999):-1   
        const howManyLights= wyFind ? wyFind.value : 0
        const howManyGrzanie = wyjscia.reduce( (acc, x) =>
                (x.id>=grzanie[0]&&x.id<=grzanie[1]&&x.value===1)? acc+1 : acc
            , 0)  

        konfig.map( x => {
            const czujka = x.idWy>0 ? wySatel.find(y=>y.id===x.idWy) : {value: -1}
            const czujkaValue = czujka ? czujka.value : -1

            howManyActive = czujkaValue===1 ? howManyActive+=1 : howManyActive
            
            if(x.rodzaj==='czujka' && czujkaValue===1){
                return currentCzujki.push({...x, key: 'cz'+x.id, czujka : czujkaValue})
            }
            return howManyActive
        })

        return (
            <View style={styles.container}>
                <SwiatlaBox howManyLights={howManyLights}
                    navigation={this.props.navigation} />                   
                <OgrzewanieBox howManyGrzanie={howManyGrzanie}
                    navigation={this.props.navigation} />                   
                <CzujkaForm howManyActive={howManyActive} 
                    currentCzujki={currentCzujki} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        wyjscia: wyjsciaHashSelector(state),
        wySatel: wySatelHashSelector(state),
        konfig: konfigSelector(state), 
    }
}
const mapDispatchToProps = dispatch => {
    return {
        wsConnect: () => dispatch(wsConnect()),
        wsDisconnect: () => dispatch(wsDisconnect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dom)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202c36',
    }
  }
)