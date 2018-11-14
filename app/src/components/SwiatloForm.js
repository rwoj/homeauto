import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
// import {Icon} from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const SwiatloForm =({item, zapisz})=>(
    <View  >
        <TouchableOpacity  style={styles.itemBox}
            onPress={()=>zapisz(item.idWySter, item.swiatlo===0?1:0)}>

            <Icon type='font-awesome' name='lightbulb-o' 
                 size={24} color={item.swiatlo===0?'blue':'yellow'} />  
            <Text style={styles.item}>{item.nazwa} </Text>
        </TouchableOpacity>
    </View>    
)

export default SwiatloForm


const styles = StyleSheet.create({
    itemBox: {
        flex: 1, 
        flexDirection: 'row',
        paddingLeft: 40
    },
    item: {
        marginRight: 20,
        marginLeft: 20,
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        borderRadius: 10,
        fontSize: 23,
        padding: 4,
        fontWeight: 'bold',
    }
  })
