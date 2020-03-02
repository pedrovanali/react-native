import React, { useState } from 'react';
import * as Font from 'expo-font';

import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Header } from './components/Header';
import { GameScreen } from './screens/GameScreen';
import { StartGameScreen } from './screens/StartGamesScreens';
import { GameOverScreen } from './screens/GameOverScreen';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState();

  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  const configureGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureGameHandler}
      />
    );
  }
  // const [courseGoals, setCourseGoals] = useState([]);
  // const [isAddMode, setIsAddMode] = useState(false);

  // const addGoalHandler = (goalTitle: string) => {
  //   setCourseGoals(currentGoals => [
  //     ...currentGoals,
  //     { id: Math.random().toString(), value: goalTitle }
  //   ]);
  //   toggleShowGoalInput();
  // };

  // const removeGoalHandler = (goalId: number) => {
  //   setCourseGoals(currentGoals =>
  //     currentGoals.filter(goalItem => goalItem.id !== goalId)
  //   );
  // };

  // const toggleShowGoalInput = () => {
  //   setIsAddMode(currentIsAddMode => !currentIsAddMode);
  // };

  // const cancelGoalAdditionHandler = () => {
  //   setIsAddMode(false);
  // };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title={'Guess a Number'} />
      {content}
      {/* <Button title='Add new goal' onPress={toggleShowGoalInput} /> */}
      {/* <GoalInput
        addHandler={addGoalHandler}
        isAddMode={isAddMode}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={item => item.id}
        data={courseGoals}
        renderItem={itemData => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  listItem: {
    padding: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
    margin: 10
  }
});
