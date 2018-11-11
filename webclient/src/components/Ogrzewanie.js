import React from 'react'
import {connect} from 'react-redux'
import {wyjsciaHashSelector, wyTempHashSelector, wyTempNastHashSelector} from '../reducers/register'
import {konfigTempSelector} from '../reducers/ustawienia'
import api from '../api'
import OgrzewanieList from './OgrzewanieList'

class Ogrzewanie extends React.Component {
  state={
    poziom: 'all',
  }
  zapisz = (addr, value)=> 
    api.rejestr.wyslijZmianeTemp(addr, value)
        .catch(err => console.log(err))

  zmienPoziom= (poz) =>
    this.setState({poziom: poz})

  render(){
    const {poziom} = this.state
    const {history, konfigTemp, wyTemp, wyTempNast, wyjscia} = this.props
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
    <div className='strona-glowna'>              
        {poziom === 'all' && 
            <OgrzewanieList currentTemps={currentTemp} 
                zapisz={this.zapisz} />}
        {poziom === 'calyDom' && 
            <OgrzewanieList currentTemps={currentTempCalyDom} 
                zapisz={this.zapisz} />}

        <button onClick={()=>history.push("/")}> Strona początkowa </button>
        <button onClick = {()=>this.zmienPoziom('all')}> Parter/Piętro </button>
        <button onClick = {()=>this.zmienPoziom('calyDom')}> Pozostałe </button>
    </div>
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

// {/* <View style={styles.container}> */}
// {/* <View style={styles.buttons}>
//   <TouchableOpacity onPress={()=>this.setState({poziom: 'all'})}> 
//     <Text style={styles.item}>Parter/Piętro</Text>
//   </TouchableOpacity>
//   <TouchableOpacity onPress={()=>this.setState({poziom: 'calyDom'})}>
//     <Text style={styles.item}>Pozostałe</Text>
//   </TouchableOpacity>
// </View>    

// <SectionList style={styles.box}
//   sections={poziom==='all'?currentTemp:currentTempCalyDom}
//   renderItem={({item}) => 
//     <OgrzewanieForm item = {item} zapisz={this.zapisz}/>}
//   renderSectionHeader={({section}) => 
//     <Text style={styles.sectionHeader}>{section.poziom}</Text>}
//   keyExtractor={(item, index) => index}
// />
// </View> */}