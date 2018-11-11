import React from "react"
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {wyjsciaSelector, wyTempSelector} from '../../reducers/register'
import {konfigTempSelector} from '../../reducers/ustawienia'
import OgrzewanieParter from "./OgrzewanieParter"
import OgrzewaniePietro from "./OgrzewaniePietro"
import OgrzewanieHarmonogram from "./OgrzewanieHarmonogram"
import api from '../../api'

class Ogrzewanie extends React.Component{
    state={
        poziom: this.props.location.state,
    }

    zapisz = (addr, value)=> 
        api.rejestr.wyslijZmianeTemp(addr, value)
            .catch(err => console.log(err))

    zmienPoziom= (poz) =>
        this.setState({poziom: poz})

    render (){
        const {poziom} = this.state
        const {konfigTemp, wyTemp, wyjscia} = this.props
        const currentTemp={
            parter:[],
            pietro:[],
            calyDom:[]
        }
        // console.log("ogrz :")
        konfigTemp.map(x=>{
            const temp = x.idTempWy>0? wyTemp.find(y=>y.id===x.idTempWy):{value: ''}
            const tempValue = temp?temp.value:''
            const tempNast = x.idTempWy>0? wyTemp.find(y=>y.id===x.idTempNast):{value: ''}
            const tempNastValue = tempNast?tempNast.value:''
            const ogrzew = x.idGrzanie>0? wyjscia.find(y=>y.id===x.idGrzanie):{value: ''}
            const ogrzewValue = ogrzew?ogrzew.value:''
            if (x.poziom==='parter'){
                return currentTemp.parter.push(
                    {...x, ogrzewanie : ogrzewValue, temp: tempValue, tempNast: tempNastValue })
            } else if (x.poziom==='pietro') {
                return currentTemp.pietro.push(
                    {...x, ogrzewanie : ogrzewValue, temp: tempValue, tempNast: tempNastValue })
            } 
                return currentTemp.calyDom.push(
                    {...x, ogrzewanie : ogrzewValue, temp: tempValue, tempNast: tempNastValue })
            
        })

        return (
            <div className='strona-glowna'>              
                {poziom === 'parter' && 
                    <OgrzewanieParter currentTemp={currentTemp.parter} 
                        zapisz={this.zapisz} />}
                {poziom === 'pietro' && 
                    <OgrzewaniePietro currentTemp={currentTemp.pietro} 
                        zapisz={this.zapisz} />}
                {poziom === 'calyDom' && 
                    <OgrzewanieHarmonogram currentTemp={currentTemp.parter} />}
                <button onClick = {()=>this.zmienPoziom('parter')}> Parter </button>
                <button onClick = {()=>this.zmienPoziom('pietro')}> Piętro </button>
                <button onClick = {()=>this.zmienPoziom('calyDom')}> Harmonogram </button>
            </div>
        )
    }
}

Ogrzewanie.propTypes = {
    wyTemp: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
    wyjscia: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
    location: PropTypes.shape({
        state: PropTypes.string.isRequired,
    }).isRequired,
    konfigTemp: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
  
  function mapStateToProps (state){
    return {
      wyTemp: wyTempSelector(state),
      wyjscia: wyjsciaSelector(state),
      konfigTemp: konfigTempSelector(state), 
    }
  }

export default connect(mapStateToProps)(Ogrzewanie)