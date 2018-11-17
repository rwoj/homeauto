import React from 'react'
import {connect} from 'react-redux'
// import {Button} from 'react-native-elements'
import { StyleSheet, Text, View, TouchableOpacity , SectionList } from 'react-native'
import {wyjsciaHashSelector, wySatelHashSelector} from '../../store/reducers/register'
import {konfigSelector} from '../../store/reducers/ustawienia'
import CzujkaForm from '../../components/CzujkaForm'
// import {initRejestr, zmienRejestr} from '../../store/actions/rejestr'
import {odczytRejestru, zmianaRejestruWyjscia, zmianaRejestruWySatel, 
    zmianaRejestruWyTemp, zmianaRejestruWyTempNast} from "../../store/actions/rejestr"

const States = {
    CONNECTED: 'connected',
    CONNECTING: 'connecting',
    DISCONNECTED: 'disconnected'
  };

class Dom extends React.Component {
    static navigationOptions: {
        title: 'Sterowanie domem',
        headerStyle: {
            backgroundColor: '#c9d5df'
        }
    };
    state = {
        status: States.DISCONNECTED,
        interval: null,
    };
    componentDidMount () {
        this.connect();
    }
    componentWillUnmount () {
        this.ws.close();
    }
    connect () {
        this.ws = new WebSocket('ws://192.168.0.205:8080');
        this.ws.onopen = () => this.onConnectionOpen();
        this.ws.onclose = () => this.onConnectionClose();
        this.ws.onmessage = (event) => this.onConnectionMessage(event);
        this.ws.sendJSON = (obj) => this.ws.send(JSON.stringify(obj));
        this.setState({status: States.CONNECTING});
    }
    onConnectionOpen () {
        console.log("on connection open");
        this.setState({status: States.CONNECTED});
    }
    onConnectionClose () {
        this.setState({ status: States.DISCONNECTED });
        // reconnect mechanics
        const interval = setInterval(() => {
            if (this.state.status === States.CONNECTING || this.state.status === States.CONNECTED) {
                clearInterval(this.state.interval);
                return;
            }
            this.connect();
        }, 1000)
        this.setState({interval});
    }
    onConnectionMessage (event) {
        const data = JSON.parse(event.data);
        if (data.key === 'initRejestr'){
            this.props.initRejestr(data.value);
        } else {
            this.props.zmienRejestr(data);
        }
    }

    onConnectionWriteHandler = (key, value) => 
        this.ws.sendJSON({key, value});

    render(){
        const {wyjscia, wySatel, konfig} = this.props
        const currentCzujki=[]
        const grzanie=[16941, 16950]
        let howManyActive=0 
        const wyFind= wyjscia && wyjscia.length>0 ? wyjscia.find(x=>x.id===16999):-1   
        const howManyLights= wyFind ? wyFind.value : 0
        const howManyGrzanie = wyjscia.reduce( (acc, x) =>
                (x.id>=grzanie[0]&&x.id<=grzanie[1]&&x.value===1)? acc+1 : acc
            , 0)  

        konfig.map( x => {
            const czujka = x.idWy>0 ? wySatel.find(y=>y.id===x.idWy) : {value: -1}
            const czujkaValue = czujka ? czujka.value : -1

            howManyActive = czujkaValue===1 ? howManyActive+=1 : howManyActive
            
            if(x.rodzaj==='czujka' && czujkaValue===1){
                return currentCzujki.push({...x, key: 'cz'+x.id, czujka : czujkaValue})
            }
            return howManyActive
        })

        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    {/* <View style={styles.boxes}> */}
                        <Text style={styles.text}> Włączone światła: {howManyLights}  </Text>
                    {/* </View> */}
                    <View style={styles.boxes}>
                        <TouchableOpacity style={styles.boxPress} 
                            onPress={() => this.props.navigation
                                .navigate('Swiatlo', {ws: this.ws})}>
                            <Text style={styles.text}> Swiatla </Text>
                        </TouchableOpacity>    
                        <TouchableOpacity style={styles.boxPress} 
                            onPress={() => this.props.navigation.navigate('Efekty')}>
                            <Text style={styles.text}> Sceny </Text>
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
                            <Text style={styles.text}> Plan </Text>
                        </TouchableOpacity>    
                    </View>    
                </View>
                <CzujkaForm howManyActive={howManyActive} currentCzujki={currentCzujki} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        wyjscia: wyjsciaHashSelector(state),
        wySatel: wySatelHashSelector(state),
        konfig: konfigSelector(state), 
    }
}
const mapDispatchToProps = dispatch => {
    return {
        initRejestr: dane => dispatch(odczytRejestru(dane)), 
        zmienRejestr: dane => {
                // console.log(dane.key, dane.value);
                if (dane.key==='wyjscia'){
                    dispatch(zmianaRejestruWyjscia(dane.value))
                }
                if (dane.key==='wySatel'){
                    dispatch(zmianaRejestruWySatel(dane.value))
                }
                if (dane.key==='wyTemp'){
                    dispatch(zmianaRejestruWyTemp(dane.value))
                }
                if (dane.key==='wyTempNast'){
                    dispatch(zmianaRejestruWyTempNast(dane.value))
                }
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dom)

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
        width: 170,
        height: 100,
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