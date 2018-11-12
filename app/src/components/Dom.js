import React from 'react'
import {connect} from 'react-redux'
// import openSocket from 'socket.io-client'
// import {Button} from 'react-native-elements'
import { StyleSheet, Text, View, TouchableOpacity , SectionList } from 'react-native'
import {wyjsciaHashSelector, wySatelHashSelector} from '../reducers/register'
import {konfigSelector} from '../reducers/ustawienia'
import CzujkaForm from './CzujkaForm'
// import {zmienRejestr} from '../actions/rejestr'


class Dom extends React.Component {
    // componentDidMount(){
    //     const socket = openSocket('http://192.168.0.133:8081')
    //     socket.on('zmiana', zmienRejestr)
    // }

    render(){
        const {konfig, wyjscia, wySatel} = this.props
        const currentCzujki=[]
        const grzanie=[16941, 16950]
        let howManyActive=0 
        const wyFind=wyjscia && wyjscia.length>0 ? wyjscia.find(x=>x.id===16999): -1   
        const howManyLights= wyFind>-1 ? wyFind.value : 0
        const howManyGrzanie=wyjscia.reduce((acc,x)=>
            acc=(x.id>=grzanie[0]&&x.id<=grzanie[1]&&x.value===1)?acc+=1:acc , 0)  

        konfig.map(x=>{
            const czujka = x.idWy>0? wySatel.find(y=>y.id===x.idWy):{value: -1}
            const czujkaValue = czujka? czujka.value: -1

            howManyActive=czujkaValue===1?howManyActive+=1: howManyActive

            if(x.rodzaj==='czujka' && czujkaValue===1){
                return currentCzujki.push({...x, key: x.id, czujka : czujkaValue})
            }
        })

        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    {/* <View style={styles.boxes}> */}
                        <Text style={styles.text}> Włączone światła: {howManyLights}  </Text>
                    {/* </View> */}
                    <View style={styles.boxes}>
                        <TouchableOpacity style={styles.boxPress} 
                            onPress={() => this.props.navigation.navigate('Swiatlo')}>
                            <Text style={styles.text}> Swiatla </Text>
                        </TouchableOpacity>    
                        <TouchableOpacity style={styles.boxPress} 
                            onPress={() => this.props.navigation.navigate('Efekty')}>
                            <Text style={styles.text}> Efekty/sceny </Text>
                        </TouchableOpacity>    
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.text}> Włączone grzejniki: {howManyGrzanie}  </Text>
                    <View style={styles.boxes}>
                        <TouchableOpacity style={styles.boxPress} 
                            onPress={() => this.props.navigation.navigate('Ogrzewanie')}>
                            <Text style={styles.text} >Ogrzewanie</Text>
                        </TouchableOpacity>       
                        <TouchableOpacity style={styles.boxPress} 
                            onPress={() => this.props.navigation.navigate('Harmonogram')}>
                            <Text style={styles.text}>Harmonogram</Text>
                        </TouchableOpacity>    
                    </View>    
                </View>
                <CzujkaForm howManyActive={howManyActive} currentCzujki={currentCzujki} />
            </View>
        )
    }
}

function mapStateToProps (state){
    return {
        wyjscia: wyjsciaHashSelector(state),
        wySatel: wySatelHashSelector(state),
        konfig: konfigSelector(state), 
    }
  }

export default connect(mapStateToProps)(Dom)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#202c36',
    },
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
    boxes: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'steelblue',
        borderRadius: 20,
        margin: 10,
    },
    boxPress: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'chocolate',
        borderStyle: 'solid',
        borderColor: '#3e2a19',
        borderWidth: 5,
        borderRadius: 20,
        width: 220,
        height: 170,
        margin: 10,
    },
    text: {
        margin: 10,
        color: '#202c36',
        fontSize: 24,
        fontWeight: 'bold',
        padding: 6, 
    },
  })