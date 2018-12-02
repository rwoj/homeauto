import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const width = Dimensions.get('window').width; 
const height = Dimensions.get('window').height;

class EfektyOgrzewanie extends Component {
    static navigationOptions = {
        title: 'Efekty Ogrzewanie',
        headerStyle: {
            backgroundColor: '#c9d5df'
        }
      }
    render(){
        // const {navigation} = this.props;
        // console.log(navigation.getParam('lokal', 'no value'))
        return (
            <View style={styles.box}>
            <View style={styles.boxes}>
                <TouchableOpacity style={styles.boxPress} 
                    onPress={() => 
                    console.log("Wychodzimy")}>
                    <Text style={styles.text}> Wychodzimy </Text>
                </TouchableOpacity>    
                <TouchableOpacity style={styles.boxPress} 
                    onPress={() => 
                    console.log("heja")}>
                    <Text style={styles.text}> Heja </Text>
                </TouchableOpacity>    
            </View>
        </View>  
        )
    }
}
export default EfektyOgrzewanie
    // navigationOptions: {
    //     title: 'EfektyOgrzewanie',
    //     headerStyle: {
    //         backgroundColor: '#c9d5df'
    //     }
    // }
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
