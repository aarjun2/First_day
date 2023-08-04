import { View, Text, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mapData } = route.params; 
  const mapView = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    setCoordinates(mapData);

    if (mapView.current && mapData.length > 0) {
      const targetCoordinate = mapData[0];
      mapView.current.animateToRegion({
        latitude: targetCoordinate.latitude,
        longitude: targetCoordinate.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [mapData]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <MapView
        ref={mapView}
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: coord.latitude, longitude: coord.longitude }}
            title={coord.name}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;