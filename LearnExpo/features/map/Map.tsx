import React, {useState} from 'react';
import {
  Dimensions,
  Platform,
  PlatformColor,
  StyleSheet, TextInput,
  View
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const markers = [
  {
    title: 'title',
    description: 'description',
    coordinate: {latitude: -27.5, longitude: 153.0}
  },
  {
    title: 'title',
    description: 'description',
    coordinate: {latitude: -27.474, longitude: 153.025}
  },
  {
    title: 'title',
    description: 'description',
    coordinate: {latitude: -27.475, longitude: 153.03}
  }
];

const Map = () => {
  const [region, setRegion] = useState(
    {
      latitude: -27.475,
      longitude: 153.03,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
  );

  const onRegionChange = (region: any) => {
    setRegion(region);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
               onRegionChange={onRegionChange}
               region={region}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />))}
      </MapView>
      <TextInput style={styles.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        backgroundColor: PlatformColor('systemBackground')
      }
    })
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 100,
  },
  text: {
    height: 100
  },
  label: {
    padding: 16,
    ...Platform.select({
      ios: {
        color: PlatformColor('label'),
      }
    })
  },
  link: {
    ...Platform.select({
      ios: {
        color: PlatformColor('link'),
      }
    })
  }
});

export default Map;
