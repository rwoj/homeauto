import React from "react"
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {wySatelSelector} from '../../reducers/register'
import {konfigSelector} from '../../reducers/ustawienia'
import CzujkiCalyDom from "./CzujkiCalyDom"

class Czujki extends React.Component{
    render (){
        const {konfig, wySatel} = this.props
        const currentCzujki={
            calyDom:[]
        }
        konfig.map(x=>{
            const czujka = x.idWy>0? wySatel.find(y=>y.id===x.idWy):{value: -1}
            const czujkaValue = czujka? czujka.value: -1

            if(x.rodzaj==='czujka'){
                return currentCzujki.calyDom.push(
                    {...x, czujka : czujkaValue})
            }
        })

        return (
            <div className='strona-glowna'>              
                    <CzujkiCalyDom currentCzujki={currentCzujki.calyDom} />
            </div>
        )
    }
}

Czujki.propTypes = {
    wySatel: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
    konfig: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
  
  function mapStateToProps (state){
    return {
      wySatel: wySatelSelector(state),
      konfig: konfigSelector(state), 
    }
  }

export default connect(mapStateToProps)(Czujki)