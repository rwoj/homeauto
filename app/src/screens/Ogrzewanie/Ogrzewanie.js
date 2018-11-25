import React from 'react';
import {connect} from 'react-redux';
import {konfigTempSelector} from '../../store/reducers/ustawienia';
import {wyjsciaHashSelector, wyTempHashSelector, 
  wyTempNastHashSelector} from '../../store/reducers/register';
import { wsSend } from "../../store/actions/websocket";

import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native';
import OgrzewanieHeader from '../../components/Ogrzewanie/OgrzewanieHeader';
import OgrzewanieList from '../../components/Ogrzewanie/OgrzewanieList';

  
class Ogrzewanie extends React.Component {
  static navigationOptions: {
    title: 'Ogrzewanie',
    headerStyle: {
        backgroundColor: '#c9d5df'
    }
  };
  state={
    poziom: 'parter',
  }
  zapisz = (address, value)=> this.props.wsSend({
      key: 'zmianaTemperatury', 
      value:{address, value, temp: true}
  })
  zmienPoziom = (poziom) => this.setState({poziom});

  render(){
    const {poziom} = this.state
    const {konfigTemp, wyTemp, wyTempNast, wyjscia} = this.props
    const currentTemp=[{"poziom": 'parter', "data": []},
                        {"poziom": 'pietro', "data": []}, 
                        {"poziom": 'calyDom', "data": []}]
    // const currentTempCalyDom =[{"poziom": 'calyDom', "data": []}]

    konfigTemp.map(x=>{
      // console.log(x.idTempWy, wyTemp[0].id)
        const temp = x.idTempWy !== 0 && wyTemp.length>0 ? wyTemp.find(y => y.id===x.idTempWy): {value: ''}
        const tempValue = temp?temp.value:''
        const tempNast = x.idTempWy>0? wyTempNast.find(y=>y.id===x.idTempNast):{value: ''}
        const tempNastValue = tempNast?tempNast.value:''
        const ogrzew = x.idGrzanie>0? wyjscia.find(y=>y.id===x.idGrzanie):{value: ''}
        const ogrzewValue = ogrzew?ogrzew.value:''
        if (x.poziom==='parter'){
          return currentTemp[0].data.push(
            {...x, ogrzewanie : ogrzewValue, temp: tempValue, tempNast: tempNastValue })
        } else if (x.poziom==='pietro') {
          return currentTemp[1].data.push(
            {...x, ogrzewanie : ogrzewValue, temp: tempValue, tempNast: tempNastValue })
        } 
        // return currentTempCalyDom[0].data.push(
        return currentTemp[2].data.push(
            {...x, ogrzewanie : ogrzewValue, temp: tempValue, tempNast: tempNastValue })  
    })

    return (
      <View style={styles.container}>
        <OgrzewanieHeader zmienPoziom={this.zmienPoziom} />
        <OgrzewanieList 
          poziom = {poziom}
          dataToShow={(poziom==='parter')
            ? currentTemp[0].data
            :(poziom ==='pietro'? currentTemp[1].data : currentTemp[2].data)}
          zapisz={this.zapisz}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}
function mapStateToProps (state){
    return {
      wyTempNast: wyTempNastHashSelector(state),
      wyTemp: wyTempHashSelector(state),
      wyjscia: wyjsciaHashSelector(state),
      konfigTemp: konfigTempSelector(state)
    }
}
const mapDispatchToProps = dispatch => {
  return {
      wsSend: (dane) => dispatch(wsSend(dane))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ogrzewanie)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#202c36',
  },
})
