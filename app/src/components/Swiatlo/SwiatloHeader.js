import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const width = Dimensions.get('window').width; 
// const height = Dimensions.get('window').height;

export default SwiatloHeader =({zmienPoziom})=>(
    <View style={styles.buttons}>
        <TouchableOpacity 
            onPress={()=>zmienPoziom('parter')}> 
            <Text style={styles.item}>Parter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            onPress={()=>zmienPoziom('pietro')} >
            <Text style={styles.item}>Piętro</Text>
        </TouchableOpacity>
        <TouchableOpacity  
            onPress={()=>zmienPoziom('calyDom')}>
            <Text style={styles.item}>Inne</Text>
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
        width: width/3 - 30,
        paddingLeft: 10,
        margin: 5,
    }
  })