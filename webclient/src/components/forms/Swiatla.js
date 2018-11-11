import React from "react"
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {wyjsciaSelector} from '../../reducers/register'
import {konfigSelector} from '../../reducers/ustawienia'
import SwiatlaParter from "./SwiatlaParter"
import SwiatlaPietro from "./SwiatlaPietro"
import SwiatlaZewnetrzne from "./SwiatlaZewnetrzne"
import api from '../../api'

class Swiatla extends React.Component{
    state={
        poziom: this.props.location.state,
    }

    zapisz = (addr, value)=> 
        api.rejestr.wyslijZmiane(addr, value)

    zmienPoziom= (poz) =>
        this.setState({poziom: poz})

    render (){
        const {poziom} = this.state
        const {konfig, wyjscia} = this.props
        const currentSwiatla={
            parter:[],
            pietro:[],
            calyDom:[]
        }
        // console.log("ogrz :")
        konfig.map(x=>{
            const swiatlo = x.idWy>0? wyjscia.find(y=>y.id===x.idWy):{value: -1}
            const swiatloValue = swiatlo?swiatlo.value:-1
            // const swiatloSter = x.idWySter>0? wyjscia.find(y=>y.id===x.idWySter):{value: ''}
            // const swiatloSterValue = swiatloSter?swiatloSter.value:''
            if(x.rodzaj==='swiatlo'){
                if (x.poziom==='parter'){
                    return currentSwiatla.parter.push(
                        {...x, swiatlo : swiatloValue})
                            // , swiatloSter: swiatloSterValue })
                } else if (x.poziom==='pietro') {
                    return currentSwiatla.pietro.push(
                        {...x, swiatlo : swiatloValue})
                        // , swiatloSter: swiatloSterValue })
                } 
                    return currentSwiatla.calyDom.push(
                        {...x, swiatlo : swiatloValue})
                        // , swiatloSter: swiatloSterValue })
            }
        })

        return (
            <div className='strona-glowna'>              
                {poziom === 'parter' && 
                    <SwiatlaParter currentSwiatla={currentSwiatla.parter} 
                        zapisz={this.zapisz} />}
                {poziom === 'pietro' && 
                    <SwiatlaPietro currentSwiatla={currentSwiatla.pietro} 
                        zapisz={this.zapisz} />}
                {poziom === 'calyDom' && 
                    <SwiatlaZewnetrzne currentSwiatla={currentSwiatla.calyDom} 
                        zapisz={this.zapisz} />}

                <button onClick = {()=>this.zmienPoziom('parter')}> Parter </button>
                <button onClick = {()=>this.zmienPoziom('pietro')}> Piętro </button>
                <button onClick = {()=>this.zmienPoziom('calyDom')}> Zewnętrzne </button>
            </div>
        )
    }
}

Swiatla.propTypes = {
    wyjscia: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
    location: PropTypes.shape({
        state: PropTypes.string.isRequired,
    }).isRequired,
    konfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
  
  function mapStateToProps (state){
    return {
      wyjscia: wyjsciaSelector(state),
      konfig: konfigSelector(state), 
    }
  }

export default connect(mapStateToProps)(Swiatla)