import React, { FC } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { TitleText } from '../components/TitleText';
import { BodyText } from '../components/BodyText';
import Colors from '../constants/colors';
import { MainButton } from '../components/MainButton';

export const GameOverScreen: FC<{
  roundsNumber: number;
  userNumber: number;
  onRestart: () => void;
}> = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over</TitleText>
      <View style={styles.imageContainer}>
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
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{' '}
          to guess the number <Text style={styles.highlight}>{userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={onRestart}>NEW GAME</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
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
    textAlign: 'center',
    fontSize: 20
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: 20
  }
});
