import React from 'react'
import SwiatloForm from './SwiatloForm';

const SwiatloList = ({lokale, items, zapisz}) => {
    const currentList =  lokale.map( (lokal, i) => 
        items[i].map(item =>
            <SwiatloForm key={i+item.id} item={item} zapisz={zapisz} />
        )
    )

return (
        <div>
            {currentList}        
        </div>
        )  
}    
export default SwiatloList