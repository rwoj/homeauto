import React, {Component} from 'react';

import { StyleSheet, View } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

// import { StyleSheet, SectionList, Text } from 'react-native';
import OgrzewanieForm from '../../components/Ogrzewanie/OgrzewanieForm';

class OgrzewanieList extends Component {
  constructor(props){
    super(props);
    this.state = {
      isVisible: new Array(this.props.dataToShow.length).fill(false),
      poziom: this.props.poziom
    }
  }
  componentDidUpdate(){
    if (this.props.poziom!=this.state.poziom){
      this.setState({
        isVisible: new Array(this.props.dataToShow.length).fill(false),
        poziom: this.props.poziom 
      })
    }
  }
  render (){
    const {isVisible} = this.state;
    // console.log(this.props.dataToShow);
    const lokaleList = this.props.dataToShow.map((l,i)=>{
      const isTempNast = !!l.idTempNast;
      return (<ListItem 
          key = {i}
          title = {l.nazwaLokalu}
          titleStyle = {{color: '#c9d5df',
              fontSize: 30, fontWeight: 'bold'}}
          badge = {{ value: l.temp || '-', 
              textStyle: { color: (l.ogrzewanie>0)? 'red': 'blue', 
              fontSize: 26, fontWeight: 'bold'},
              containerStyle: { width: 90, height: 30, marginTop: -20 }

              }} 
               
          subtitle={
              <View style={[styles.swiatlaWLokalu, 
                  {height: 70*(isVisible[i]?1:0)*(isTempNast?1:0)}]}> 
                  {isVisible[i] && isTempNast &&
                      <OgrzewanieForm key={i} item = {l} 
                                      zapisz={this.props.zapisz}/>}
              </View>}
          onPress = {() => {
              let changedTbl = [...isVisible];
              changedTbl[i] = !changedTbl[i];
              this.setState({isVisible: [...changedTbl]});
              }
              }
          containerStyle = {{backgroundColor: '#3e2a19'}}
          chevronColor='#c9d5df'
          chevron
          rightIcon = { (isTempNast && {name: 'arrow-drop-down'}) ||
                        {name: 'remove'}}
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


  //   <SectionList style={styles.box}
  //   sections={dataToShow}
  //   renderItem={({item}) => 
  //     <OgrzewanieForm item = {item} zapisz={zapisz}/>}
  //   renderSectionHeader={({section}) => 
  //     <Text style={styles.sectionHeader}>{section.poziom}</Text>}
  //   keyExtractor={(item, index) => index}
  // />
export default OgrzewanieList

const styles = StyleSheet.create({
  swiatlaWLokalu: {
    // backgroundColor: '#202c36',
    width: 250,
    // height: 100,
},
    // box: {
    //     flex: 1,
    //     backgroundColor: 'chocolate',
    //     borderStyle: 'solid',
    //     borderColor: '#3e2a19',
    //     borderWidth: 5,
    //     borderRadius: 10,
    //     height: 500,
    //     margin: 10,
    //   },
    //   sectionHeader: {
    //     paddingTop: 5,
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     paddingBottom: 2,
    //     fontSize: 26,
    //     fontWeight: 'bold',
    //     backgroundColor: '#3e2a19',
    //     color: '#c9d5df',
    //   },
  })