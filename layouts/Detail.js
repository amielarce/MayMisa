import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import Schedule from './Schedule';
import DataFetcher from './../functions/DataFetcher';

const {width, height} = Dimensions.get('window');

const Detail = ({route, navigation}) => {
  // Obtain data to display
  const {itemId} = route.params;
  var scheduleDetails = DataFetcher.getScheduleDetails(itemId);

  if (scheduleDetails.isFound) {
    // Set page title
    // navigation.setOptions({title: scheduleDetails.name});
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: scheduleDetails.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.header}>{scheduleDetails.name}</Text>
        <Text style={styles.text}>{scheduleDetails.address.details}</Text>
        <Text
          style={
            styles.text
          }>{`${scheduleDetails.address.barangay}, ${scheduleDetails.address.municipality}, ${scheduleDetails.address.province}`}</Text>
        <Text style={styles.text}>{`Website: ${scheduleDetails.website}`}</Text>
      </View>
      <Schedule data={scheduleDetails.schedule} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  image: {
    width: width,
    height: 300,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    backfaceVisibility: 'hidden',
  },
  header: {
    padding: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    paddingLeft: 5,
    fontSize: 16,
  },
  info: {
    margin: 2,
  },
});

export default Detail;
