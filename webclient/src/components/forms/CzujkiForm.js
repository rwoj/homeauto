import React from "react"
import PropTypes from 'prop-types'

const CzujkiForm = ({lokal})=>
  (
        <div className='czujki'>
            <div className='lokal'> {lokal.nazwaLokalu}</div>
            <div className='nazwa'> {lokal.nazwa}</div>
            <div className={lokal.czujka===0?'czujki-zero': 'czujki-one'}>  {lokal.czujka}</div>
        </div>
        )

CzujkiForm.propTypes={
    lokal: PropTypes.shape({
        czujka: PropTypes.number.isRequired,
    }).isRequired
}

export default CzujkiForm
