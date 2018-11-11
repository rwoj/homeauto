import React from 'react'
import {connect} from 'react-redux'

import {wyjsciaHashSelector, wySatelHashSelector} from '../reducers/register'
import {konfigSelector} from '../reducers/ustawienia'
import CzujkaForm from './CzujkaForm'

class Dom extends React.Component {
    render(){
        const {history, wyjscia, wySatel, konfig} = this.props
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
                return currentCzujki.push({...x, key: x.id, czujka : czujkaValue})
            }
            return howManyActive
        })

        return (
            <div className='strona-glowna'>
                <div className="block">
                    Włączone światła: {howManyLights}
                    <div>
                        <div className='przycisk'
                            onClick={()=>history.push("/swiatlo")}>
                            Swiatla
                        </div>    
                        <div className='przycisk' 
                            onClick={()=>history.push("/swiatlo")}>
                            Efekty/sceny
                        </div>    
                    </div>
                </div>
                <div className="block">
                    Włączone grzejniki: {howManyGrzanie}
                    <div>
                        <div className='przycisk' 
                            onClick={()=>history.push("/ogrzewanie")}>
                            Ogrzewanie
                        </div>       
                        <div className='przycisk' 
                            onClick={()=>history.push("/ogrzewanie")}>
                            Harmonogram
                        </div>    
                    </div>    
                </div>
                <CzujkaForm howManyActive={howManyActive} currentCzujki={currentCzujki} />
            </div>
        )
    }
}


function mapStateToProps (state){
    return {
        wyjscia: wyjsciaHashSelector(state),
        wySatel: wySatelHashSelector(state),
        konfig: konfigSelector(state), 
    }
  }

export default connect(mapStateToProps)(Dom)
