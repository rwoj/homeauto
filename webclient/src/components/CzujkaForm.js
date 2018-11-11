import React from 'react'

const CzujkaForm =({howManyActive, currentCzujki})=>{
    const listaCzujek = currentCzujki.map(item=>
    <li key={item.id}>
         {item.nazwaLokalu} ({item.poziom}
    </li>)
    return (
        <div>    
            Aktywne czujki: {howManyActive} 
            <ol>
                {listaCzujek}
            </ol>
            {/* <FlatList
                data={currentCzujki}
                renderItem={({item})=>
                    <Text style={styles.item}>
                        {item.nazwaLokalu} ({item.poziom})
                    </Text>}
            /> */}
        </div>  
        )  
}

export default CzujkaForm