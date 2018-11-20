import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const width = Dimensions.get('window').width; 

export default OgrzewanieHeader =({zmienPoziom})=>(
    <View style={styles.buttons}>
        <TouchableOpacity onPress={()=>zmienPoziom('all')}> 
            <Text style={styles.item}>Parter/Piętro</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>zmienPoziom('calyDom')}>
            <Text style={styles.item}>Pozostałe</Text>
        </TouchableOpacity>
    </View>   
)

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#202c36',
        margin: 5
    },
    item: {
        backgroundColor: '#3b84c4',
        color: '#c9d5df',
        borderRadius: 5,
        fontSize: 28,
        fontWeight: 'bold',
        width: width/2 - 20,
        paddingLeft: 10,
        margin: 5,
    }
  })