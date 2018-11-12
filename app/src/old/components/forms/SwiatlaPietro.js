import React from "react"
import PropTypes from 'prop-types'
import SwiatloForm from './SwiatloForm'

const SwiatlaPietro =({currentSwiatla, zapisz})=>{
    
    const currentSwiatlaList=currentSwiatla.map(x=>
            <SwiatloForm key={x.id} lokal={x} zapisz={zapisz} />
        )

    return (
        <div>
            <h4>światła pietro</h4>
            <div className='swiatloNaglowek'>
                <div className='lokal'>Lokal</div>
                <div className='nazwa'>Nazwa</div>
                <div className='swiatlo'>0/1</div>
                <div className='buttony-swiatla'>Zmień</div>
            </div>
            {currentSwiatlaList}
        </div>
    )
}

SwiatlaPietro.propTypes={
    currentSwiatla: PropTypes.arrayOf(PropTypes.shape({})).isRequired, 
    zapisz: PropTypes.func.isRequired,
}

export default SwiatlaPietro
