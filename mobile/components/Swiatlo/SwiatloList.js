import React, {Component} from 'react';

import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import SwiatloForm from './SwiatloForm';

class SwiatloList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isVisible: new Array(this.props.dataToShow.length).fill(false),
            poziom: this.props.poziom
        }
    }
    componentDidUpdate(){
        // console.log(this.props.dataToShow[0].lokal, this.state.lokal)
        if (this.props.poziom!=this.state.poziom){
            this.setState({
                isVisible: new Array(this.props.dataToShow.length).fill(false),
                poziom: this.props.poziom 
            })
        }
    }
    
    render(){
        const {isVisible} = this.state;
        // console.log(this.state.isVisible, this.props.dataToShow)
        const lokaleList = this.props.dataToShow.map((l,i)=>{
            let ileSwiatel = 0;
            let swiatlaWLokalu = l.data.map((x,xi)=>{
                if (x.swiatlo>0){ ileSwiatel++; };
                return (<SwiatloForm key={xi} item={x} zapisz={this.props.zapisz}/>);
            });
            return (<ListItem 
                key = {i}
                title = {l.lokal}
                titleStyle = {{color: '#c9d5df',
                    fontSize: 28, fontWeight: 'bold'}}
                badge = {{ value: ileSwiatel, 
                    textStyle: { color: (ileSwiatel>0)? 'yellow': 'blue', 
                    fontSize: 28, fontWeight: 'bold'}
                    }}
                     
                    // containerStyle: { width: 40, height: 40 } 
                subtitle={
                    <View style={[styles.swiatlaWLokalu, 
                        {height: l.data.length*40*(isVisible[i]?1:0)}]}> 
                        {isVisible[i] && swiatlaWLokalu}
                    </View>}
                onPress = {() => {
                    let changedTbl = [...isVisible];
                    changedTbl[i] = !changedTbl[i];
                    this.setState({isVisible: [...changedTbl]});
                    }
                    }
                containerStyle = {{backgroundColor: '#3e2a19'}}
                // chevronColor='#c9d5df'
                chevronColor='#202c36'
                chevron
                rightIcon = {
                    {name: 'arrow-drop-down'}
                }
                />)
            }
            )        
        return (
            <View>
                { lokaleList }
            </View>

        )
    }    
}

export default SwiatloList;

const styles = StyleSheet.create({
    swiatlaWLokalu: {
        // backgroundColor: '#202c36',
        width: 250,
        // height: 100,
    },
})
    // container: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'flex-start',
    //     backgroundColor: '#202c36',
    // },
    // box: {
    //     flex: 1,
    //     backgroundColor: 'chocolate',
    //     borderStyle: 'solid',
    //     borderColor: '#3e2a19',
    //     borderWidth: 5,
    //     borderRadius: 10,
    //     height: 500,
    //     margin: 10,
    // },
    // sectionHeader: {
    //   paddingTop: 5,
    //   paddingLeft: 10,
    //   paddingRight: 10,
    //   paddingBottom: 2,
    //   fontSize: 24,
    //   fontWeight: 'bold',
    //   backgroundColor: '#3e2a19',
    //   color: '#c9d5df'
    // },
