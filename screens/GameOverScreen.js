import React from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'

const GameOverScreen = (props) => {
    return <View style={styles.screen}>
        <Text> THE GAME IS OVER </Text>
        <Text> Number was : {props.userNumber}</Text>
        <Text> Number of Rounds {props.rounds}</Text>
        <Button title="Play Again" onPress={props.gameRestartHandler} />
    </View>
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    }
})

export default GameOverScreen