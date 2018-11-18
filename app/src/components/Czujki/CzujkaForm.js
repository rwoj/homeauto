import React from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'

const width = Dimensions.get('window').width; 

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
        alignItems: 'center',
        backgroundColor: 'steelblue',
        borderRadius: 20,
        margin: 5,
    },
    text: {
        color: '#202c36',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 5,
    },
    item: {
        width: width-40,
        borderRadius: 5,
        color: '#3e2a19',
        backgroundColor: '#e3791c',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
    }
})
