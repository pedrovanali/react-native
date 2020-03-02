import { Ionicons } from '@expo/vector-icons';
import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { BodyText } from '../components/BodyText';
import { Card } from '../components/Card';
import { MainButton } from '../components/MainButton';
import { NumberContainer } from '../components/NumberContainer';
import { TitleText } from '../components/TitleText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength: number, itemData: any) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <Text>{itemData.item}</Text>
  </View>
);

export const GameScreen: FC<{
  userChoice: number;
  onGameOver: (numOfRounds) => void;
}> = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
      setAvailableDeviceWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction: string) => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' }
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const newNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(newNumber);
    setPastGuesses(curPastGuesses => [newNumber.toString(), ...curPastGuesses]);
  };

  let letListContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    letListContainerStyle = styles.listContainerBig;
  }

  let gameControls = (
    <Fragment>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
    </Fragment>
  );

  if (availableDeviceHeight < 500) {
    gameControls = (
      <View style={styles.controls}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </View>
    );
    // return (
    //   <View style={styles.screen}>
    //     <Card>
    //       <TitleText>Opponent's Guess</TitleText>
    //       <View style={styles.controls}>
    //         <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
    //           <Ionicons name='md-remove' size={24} color='white' />
    //         </MainButton>
    //         <NumberContainer>{currentGuess}</NumberContainer>
    //         <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
    //           <Ionicons name='md-add' size={24} color='white' />
    //         </MainButton>
    //       </View>
    //     </Card>
    //     <View style={letListContainerStyle}>
    //       <FlatList
    //         data={pastGuesses}
    //         keyExtractor={item => item}
    //         renderItem={renderListItem.bind(this, pastGuesses.length)}
    //         contentContainerStyle={styles.list}
    //       ></FlatList>
    //     </View>
    //   </View>
    // );
  }

  return (
    <View style={styles.screen}>
      <Card>
        <TitleText>Opponent's Guess</TitleText>
        {gameControls}
        {/* <View>
          <NumberContainer>{currentGuess}</NumberContainer>
        </View>
        <View
          style={{
            ...styles.buttonContainer,
            marginTop: availableDeviceHeight > 600 ? 20 : 5
          }}
        >
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View> */}
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={pastGuesses}
          keyExtractor={item => item}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        ></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // marginTop: screenHeight > 600 ? 20 : 5,
    width: 400,
    maxWidth: '90%'
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  listContainer: {
    flex: 1,
    width: '60%'
  },
  listContainerBig: {
    flex: 1,
    width: '80%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
  }
});
