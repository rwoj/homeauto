import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

const width = Dimensions.get('window').width; 
const height = Dimensions.get('window').height;

export default OgrzewanieBox =({howManyGrzanie, navigation})=>(
    <View style={styles.box}>
        <Text style={styles.text}> 
            Włączone grzejniki: {howManyGrzanie}  
        </Text>
        <View style={styles.boxes}>
            <TouchableOpacity style={styles.boxPress} 
                onPress={() => 
                    navigation.navigate('Ogrzewanie')}>
                <Text style={styles.text} >Ogrzewanie</Text>
            </TouchableOpacity>       
            <TouchableOpacity style={styles.boxPress} 
                onPress={() => 
                    navigation.navigate('Harmonogram')}>
                <Text style={styles.text}> Plan </Text>
            </TouchableOpacity>    
        </View>    
    </View>
)

const styles = StyleSheet.create({
    box: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'steelblue',
        borderRadius: 20,
        margin: 5,
    },
    boxes: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'steelblue',
        borderRadius: 20,
        margin: 5,
    },
    boxPress: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'chocolate',
        borderStyle: 'solid',
        borderColor: '#3e2a19',
        borderWidth: 5,
        borderRadius: 20,
        width: width/2 - 40,
        height: height/3 - height/5,
        margin: 10,
    },
    text: {
        color: '#202c36',
        fontSize: 24,
        fontWeight: 'bold',
        margin: 5,
    },
  })