import React from "react"
import PropTypes from 'prop-types'

const SwiatloForm = ({lokal, zapisz})=>
  (
        <div className='swiatlo'>
            <div className='lokal'> {lokal.nazwaLokalu}</div>
            <div className='nazwa'> {lokal.nazwa}</div>
            <div className={lokal.swiatlo===0?'swiatlo-zero': 'swiatlo-one'}>  {lokal.swiatlo}</div>
            <div className='buttony-swiatla'>
                <button onClick={()=>zapisz(lokal.idWySter, lokal.swiatlo>0?1:0)}>
                    {lokal.swiatlo}
                </button>  
            </div>  
        </div>
        )

SwiatloForm.propTypes={
    lokal: PropTypes.shape({
        swiatlo: PropTypes.number.isRequired,
    }).isRequired, 
    zapisz: PropTypes.func.isRequired,
}

export default SwiatloForm
