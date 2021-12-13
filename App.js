import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/header/header'
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds,setGuessRounds] = useState(0);

  const renderView = () => {
    if (guessRounds > 0) {
      return <GameOverScreen rounds={guessRounds} userNumber={userNumber} gameRestartHandler={gameRestartHandler}/>
    }
    else if (!userNumber) {
      return <StartGameScreen startGame={setUserNumber} />
    } else {
      return <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    }
  }

  const gameOverHandler = rounds => {
    setGuessRounds(rounds)
  }

  const gameRestartHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  } 

  return (
    <View style={styles.screen}>
      <Header title={'Guess a number'}/>

      {renderView()}
      
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }

});
