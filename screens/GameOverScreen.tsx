import React, { FC, useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BodyText } from '../components/BodyText';
import { MainButton } from '../components/MainButton';
import { TitleText } from '../components/TitleText';
import Colors from '../constants/colors';

export const GameOverScreen: FC<{
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}> = ({ roundsNumber, userNumber, onRestart }) => {
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );

  const [imageWidth, setImageWidth] = useState(
    Dimensions.get('window').width * 0.7
  );

  useEffect(() => {
    const updateLayout = () => {
      setImageWidth(Dimensions.get('window').width * 0.7);
    };
    setAvailableDeviceHeight(Dimensions.get('window').height);
    setAvailableDeviceWidth(Dimensions.get('window').width);
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
      <ScrollView>
        <View style={styles.screen}>
          <TitleText>The Game is Over</TitleText>
          <View
            style={{
              ...styles.imageContainer,
              width: imageWidth,
              height: imageWidth,
              borderRadius: imageWidth / 2,
              marginVertical: imageWidth / 30
            }}
          >
            <Image
              source={require('../assets/success.png')}
              // fadeDuration={1000}
              // source={{
              //   uri:
              //     'https://upload.wikimedia.org/wikipedia/commons/4/4e/Artesonraju3.jpg'
              // }}
              style={styles.image}
              resizeMode={'cover'}
            />
          </View>
          <View
            style={{
              ...styles.resultContainer,
              marginVertical: availableDeviceHeight / 60
            }}
          >
            <BodyText
              style={{
                ...styles.resultText,
                fontSize: availableDeviceWidth <= 400 ? 16 : 20
              }}
            >
              Your phone needed{' '}
              <Text style={styles.highlight}>{roundsNumber}</Text> to guess the
              number <Text style={styles.highlight}>{userNumber}</Text>
            </BodyText>
          </View>
          <MainButton onPress={onRestart}>NEW GAME</MainButton>
        </View>
      </ScrollView>

  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultText: {
    textAlign: 'center'
  },
  resultContainer: {
    marginHorizontal: 20
  }
});
