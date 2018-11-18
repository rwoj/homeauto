import React from 'react';

import { StyleSheet, SectionList, Text } from 'react-native';
import SwiatloForm from './SwiatloForm'

export default SwiatloList =({dataToShow, zapisz})=>(
    <SectionList style={styles.box}
        sections={dataToShow}
        renderItem={({item}) => 
            <SwiatloForm item={item} zapisz={zapisz}/>}    
        renderSectionHeader={({section}) => 
            <Text style={styles.sectionHeader}>{section.lokal}</Text>}
        keyExtractor={(item, index) => index}
    />
)

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'flex-start',
    //     backgroundColor: '#202c36',
    // },
    box: {
        flex: 1,
        backgroundColor: 'chocolate',
        borderStyle: 'solid',
        borderColor: '#3e2a19',
        borderWidth: 5,
        borderRadius: 10,
        height: 500,
        margin: 10,
    },
    sectionHeader: {
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: '#3e2a19',
      color: '#c9d5df'
    },
  })