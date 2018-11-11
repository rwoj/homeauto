import React from 'react'

const SwiatloForm = ({item, zapisz}) => (
    
    <div key={item.id}>
        <button onClick={()=>zapisz(item.idWySter, item.swiatlo === 1 ? 0x0 : 0x1 )}>
            {item.swiatlo}
        </button>  
        {item.nazwaLokalu} {item.nazwa}
    </div>
)

export default SwiatloForm

// <TouchableOpacity  style={styles.itemBox}
//     onPress={()=>zapisz(item.idWySter, item.swiatlo===0?1:0)}>
//     <Icon type='font-awesome' name='lightbulb-o' 
//         size={24} color={item.swiatlo===0?'blue':'yellow'} /> 
//     <Text style={styles.item}>{item.nazwa} </Text>
// </TouchableOpacity>

// 