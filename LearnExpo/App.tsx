import React, {useState} from 'react';
import {
  Button,
  Platform,
  PlatformColor,
  StyleSheet, Text,
  View
} from 'react-native';
import {Audio, AVPlaybackStatus} from 'expo-av';
import {Sound} from "expo-av/build/Audio/Sound";

const App = () => {
  const [sound, setSound] = React.useState<Sound>();
  const [progress, setProgress] = React.useState<string>();

  const assets = [
    {key: 'land-ahoy', asset: require(`./assets/audio/land-ahoy.m4a`)},
    {key: 'ship-ahoy', asset: require(`./assets/audio/ship-ahoy.m4a`)},
    {key: 'yo-ho-ho', asset: require(`./assets/audio/yo-ho-ho.m4a`)},
    {key: 'laugh-1', asset: require(`./assets/audio/laugh-1.m4a`)},
    {key: 'laugh-2', asset: require(`./assets/audio/laugh-2.m4a`)},
    {key: 'laugh-3', asset: require(`./assets/audio/laugh-3.m4a`)},
  ]

  const onPlaybackStatusUpdate = (status: any|AVPlaybackStatus) => {
    console.log('onPlaybackStatusUpdate', status);
  }

  const playSound = async (key: string) => {
    console.log('Loading Sound');

    const asset = assets
      .filter((item) => item.key === key)[0].asset;

    const {sound} = await Audio.Sound.createAsync(asset, {}, onPlaybackStatusUpdate);

    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title={"Land Ahoy"} onPress={() => playSound('land-ahoy')}/>
      <Button title={"Ship Ahoy"} onPress={() => playSound('ship-ahoy')}/>
      <Button title={"Yo Ho Ho"} onPress={() => playSound('yo-ho-ho')}/>
      <Button title={"Laugh 1"} onPress={() => playSound('laugh-1')}/>
      <Button title={"Laugh 2"} onPress={() => playSound('laugh-2')}/>
      <Button title={"Laugh 3"} onPress={() => playSound('laugh-3')}/>
      <Text>Progress: {progress}%</Text>
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

export default App;
