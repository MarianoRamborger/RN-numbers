import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, 
  SafeAreaView //? Wrapping component which marks the safe area where content can be positioned (accounts for things like notches on phones)
  //? It should always wrap your whole view, the TOPMOST of all the visual render 
} from 'react-native';
import Header from './components/header/header'
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import * as Font  from 'expo-font' //no viene installed por defecto ojo
import AppLoading from 'expo-app-loading'; //? AppLoading, it prolongs the loading screen the user sees until certain conditions are met

const fetchFonts = () => { //? this returns a promise but.. 
  return Font.loadAsync({ //? it really needs to load them before any component tries to use them, so we use Apploading 
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}



export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds,setGuessRounds] = useState(0);
  const [finishedLoading, setFinishedLoading] = useState(false)

  const renderView = () => {
    if (!finishedLoading) {
      return <AppLoading  startAsync={fetchFonts} onFinish={()=>setFinishedLoading(true)}
      onError={(err)=>{console.log(err)}} />
      //? It takes a StartAsync prop, which is the operation we want to start when this is first rendered
    }

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
    <SafeAreaView style={styles.screen}>    
        <Header title={'Guess a number'}/>
        {renderView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }

});
