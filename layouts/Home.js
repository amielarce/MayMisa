import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DataFetcher from './../functions/DataFetcher';
import CustomCallout from './CustomCallout';

import churchImg from './../assets/church-64.png';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.045;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MAP_STYLE = [
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

const Home = ({navigation}) => {
  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted;
  };

  const getCurrentLocation = (callback) => {
    Geolocation.getCurrentPosition(
      (position) => {
        var latitude = parseFloat(position.coords.latitude);
        var longitude = parseFloat(position.coords.longitude);

        callback({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      (error) => {
        callback({
          latitude: 0,
          longitude: 0,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const requestForCurrentLocation = (callback) => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((isPermitted) => {
      if (!isPermitted) {
        requestLocationPermission().then((isGranted) => {
          if (!isGranted) {
            return callback({
              latitude: 0,
              longitude: 0,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            });
          }
        });
      }
      getCurrentLocation((location) => {
        setBottomMargin(1);
        callback(location);
      });
    });
  };

  const onMapReady = () => {
    if (!isMapReady) {
      setMapReady(true);
    }
    setBottomMargin(0);
  };

  const onRegionChangeComplete = (region) => {
    setData(DataFetcher.getNearbyMarkerData(region, new Date()));
  };

  useEffect(() => {
    requestForCurrentLocation((location) => {
      if (isMapReady) {
        setTimeout(() => {
          mapRef.current.animateToRegion(location);
        }, 10);
      }
    });
  }, [isMapReady == false]);

  const mapRef = useRef(null);
  const [isMapReady, setMapReady] = useState(false);
  const [data, setData] = useState([]);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [bottomMargin, setBottomMargin] = useState(1);

  return (
    <View style={styles.container}>
      <MapView
        // style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={{
          marginBottom: bottomMargin,
          ...StyleSheet.absoluteFillObject,
        }}
        customMapStyle={MAP_STYLE}
        ref={mapRef}
        onMapReady={onMapReady}
        onRegionChangeComplete={onRegionChangeComplete}>
        {data.map((item) => (
          <Marker key={item.id} coordinate={item.coordinates} image={churchImg}>
            <Callout
              style={{flex: 1, position: 'relative'}}
              tooltip={true}
              onPress={() =>
                navigation.navigate('Detail', {
                  itemId: item.id,
                  name: item.name,
                })
              }>
              <CustomCallout
                name={item.name}
                image={item.image}
                nextMass={item.nextSchedule}
                language={item.language}
              />
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  view: {
    height: 60,
    width: width * 0.75,
  },
});

export default Home;
