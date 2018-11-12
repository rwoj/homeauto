import React from "react"
// import {PropTypes} from 'prop-types'
// import {connect} from 'react-redux'
// import {wyjsciaSelector, wySatelSelector, wyTempSelector} from '../../reducers/register'
// import {swiatlaRejestrOpisSelector} from '../../reducers/ustawienia'
// import Swiatla from '../forms/Swiatla'
// import Czujki from '../forms/Czujki'


const HomePage =({history})=>(
  <div className='strona-glowna'>
    <div className="block">
      <h4> Ogrzewanie </h4>
      <div className='parter' 
        onClick={()=>history.push("/ogrzewanie", "parter")}>
        ogrzewanie parter
      </div>
      <div className='pietro' 
        onClick={()=>history.push("/ogrzewanie", "pietro")}>
        ogrzewanie pietro
      </div>
      <div className="caly-dom"
        onClick={()=>history.push("/ogrzewanie", "calyDom")}>
        ogrzewanie harmonogram
      </div>
    </div>
    <div className="block">
      <h4> Swiatla </h4>
      <div className='parter' 
        onClick={()=>history.push("/swiatla", "parter")}>
        swiatla parter
      </div>
      <div className='pietro' 
        onClick={()=>history.push("/swiatla", "pietro")}>
        swiatla pietro
      </div>
      <div className="caly-dom"
        onClick={()=>history.push("/swiatla", "calyDom")}>
        swiatla zewnetrzne
      </div>
    </div>
    <div className="block">
      <h4> Czujki </h4>
      <div className="caly-dom"
        onClick={()=>history.push("/czujki", "calyDom")}>
        czujki
      </div>
    </div>
    </div>
    )
    
    export default HomePage    
    // {/* <Swiatla wyjscia={wyjscia} swiatla={swiatla} />
    // <Czujki wySatel={wySatel} />  */}
    // const {history, swiatla, wySatel, wyjscia, wyTemp} = this.props
    // console.log(history)
    // return (
      //   }
      // }
      
// HomePage.propTypes = {
//   wyjscia: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
//   wySatel: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
//   wyTemp: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
//   swiatla: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
// }

// function mapStateToProps (state){
//   return {
//     wyjscia: wyjsciaSelector(state), 
//     wySatel: wySatelSelector(state),
//     wyTemp: wyTempSelector(state), 
//     swiatla: swiatlaRejestrOpisSelector(state), 
//   }
// }

// export default connect(mapStateToProps)(HomePage)
