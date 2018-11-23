import React from 'react'

import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, TouchableOpacity} from 'react-native'

const SwiatloForm =({item, zapisz})=>(
        <TouchableOpacity  style={styles.itemBox}
                onPress={()=>zapisz(item.idWySter, item.swiatlo===0?1:0)}>
            <Text style={styles.item}>{item.nazwa} </Text>
            <Icon type='font-awesome' name='lightbulb-o' 
                    size={36} color={item.swiatlo===0?'blue':'yellow'} />  
        </TouchableOpacity>
)

export default SwiatloForm


const styles = StyleSheet.create({
    itemBox: {
        flex: 1, 
        flexDirection: 'row',
        // backgroundColor: '#202c36',
    },
    item: {
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        fontSize: 22,
        fontWeight: 'bold',
        width: 160,
        borderRadius: 5,
        marginRight: 20,
        marginLeft: 20,
        margin: 5,
    }
  })
