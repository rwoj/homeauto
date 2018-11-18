import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const width = Dimensions.get('window').width; 
const height = Dimensions.get('window').height;

export default SwiatlaBox =({howManyLights, navigation})=>(
    <View style={styles.box}>
        <Text style={styles.text}> 
            Włączone światła: {howManyLights}  
        </Text>
        <View style={styles.boxes}>
            <TouchableOpacity style={styles.boxPress} 
                onPress={() => 
                navigation.navigate('Swiatlo')}>
                <Text style={styles.text}> Swiatla </Text>
            </TouchableOpacity>    
            <TouchableOpacity style={styles.boxPress} 
                onPress={() => 
                navigation.navigate('Efekty')}>
                <Text style={styles.text}> Efekty </Text>
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
        justifyContent: 'space-between',
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