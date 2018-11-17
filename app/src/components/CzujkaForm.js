import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

const CzujkaForm =({howManyActive, currentCzujki})=>(
    <View style={styles.box}>    
        <Text style={styles.text}> Aktywne czujki: {howManyActive} </Text>
        <FlatList
            data={currentCzujki}
            renderItem={({item})=>
                <Text style={styles.item}>
                    {item.nazwaLokalu} ({item.poziom})
                </Text>}
        />
    </View>    

)
export default CzujkaForm


const styles = StyleSheet.create({
    box: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'steelblue',
        borderRadius: 20,
        height: 250,
        margin: 10,
    },
    text: {
        margin: 10,
        color: '#202c36',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 6, 
    },
    item: {
        width: 350,
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        borderRadius: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 30,
        marginRight: 30,
    }
  })
