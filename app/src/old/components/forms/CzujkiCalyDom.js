import React from "react"
import PropTypes from 'prop-types'
import CzujkiForm from './CzujkiForm'

const CzujkiCalyDom =({currentCzujki})=>{
    
    const currentCzujkaList=currentCzujki.map(x=>
            <CzujkiForm key={x.id} lokal={x}/>
        )

    return (
        <div>
            <h4>Czujki w całym domu</h4>
            <div className='czujkiNaglowek'>
                <div className='lokal'>Lokal</div>
                <div className='nazwa'>Nazwa</div>
                <div className='stan'>0/1</div>
            </div>
            {currentCzujkaList}
        </div>
    )
}

CzujkiCalyDom.propTypes={
    currentCzujki: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
}

export default CzujkiCalyDom