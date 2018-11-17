import React from 'react'
import { StyleSheet, Text, View, SectionList, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'
import {wyjsciaHashSelector, wyTempHashSelector, 
  wyTempNastHashSelector} from '../store/reducers/register'
import {konfigTempSelector} from '../store/reducers/ustawienia'
import OgrzewanieForm from './OgrzewanieForm'
// import api from '../api'

class Ogrzewanie extends React.Component {
  static navigationOptions: {
    title: 'Ogrzewanie',
    headerStyle: {
        backgroundColor: '#c9d5df'
    }
};
  state={
    poziom: 'all',
  }
  zapisz = (addr, value)=> 
    console.log(addr,value);
    // api.rejestr.wyslijZmianeTemp(addr, value)
    //     .catch(err => console.log(err))

  render(){
    const {poziom} = this.state
    const {konfigTemp, wyTemp, wyTempNast, wyjscia} = this.props
    const currentTemp=[{"poziom": 'parter', "data": []},
                        {"poziom": 'pietro', "data": []}]
    const currentTempCalyDom =[{"poziom": 'calyDom', "data": []}]
    
    // console.log("konfig", konfigTemp)

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
        return currentTempCalyDom[0].data.push(
            {...x, ogrzewanie : ogrzewValue, temp: tempValue, tempNast: tempNastValue })  
    })

    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={()=>this.setState({poziom: 'all'})}> 
            <Text style={styles.item}>Parter/Piętro</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.setState({poziom: 'calyDom'})}>
            <Text style={styles.item}>Pozostałe</Text>
          </TouchableOpacity>
        </View>    
        <SectionList style={styles.box}
          sections={poziom==='all'?currentTemp:currentTempCalyDom}
          renderItem={({item}) => 
            <OgrzewanieForm item = {item} zapisz={this.zapisz}/>}
          renderSectionHeader={({section}) => 
            <Text style={styles.sectionHeader}>{section.poziom}</Text>}
          keyExtractor={(item, index) => index}
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

export default connect(mapStateToProps)(Ogrzewanie)

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
    fontSize: 26,
    fontWeight: 'bold',
    backgroundColor: '#3e2a19',
    color: '#c9d5df',
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
  },
})
