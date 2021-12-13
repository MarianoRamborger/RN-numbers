import React, {useState, useEffect,
    useRef // Allows you to define a value that survives component rerenders 
    //! Difference con useState is that when the value is changed, the component is not rerendered
} from 'react'
import {View, Text, StyleSheet, Button, Alert} from 'react-native'
import Card from '../components/card/Card'
import NumberContainer from '../components/NumberContainer/NumberContainer'



const getRandom = (min,max,exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    const randomNumber = Math.floor(Math.random() * (max - min)) + min

    if (randomNumber === exclude) {
        return getRandom(min,max,exclude)
    } else return randomNumber
} 


const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(getRandom(1, 100, props.userChoice))
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const [rounds, setRounds] = useState(0)

    const guess = (direction) => {
        if ((direction === "lower") && (currentGuess < props.userChoice) || (direction === 'greater') && (currentGuess > props.userChoice)) {
            Alert.alert("Please don't lie to the computer", "Let's make it fair", [{
                text: 'Sorry', style: 'cancel'
            }]
            )
            return
        } 
    
        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess
        }
    
        const nextNumber = getRandom(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(curRounds => curRounds + 1)
    }
     
    useEffect(()=>{
        if (currentGuess === props.userChoice) {
            props.onGameOver(rounds)
        }

    },[currentGuess, props.userChoice, props.onGameOver])



    return (
        <View style={styles.screen}>
            <Text> Opponent's Guess </Text>
            <NumberContainer> {currentGuess} </NumberContainer>

            <Card style={styles.buttonContainer}>
                <Button title='LOWER' onPress={()=>{guess('lower')}}/>
                <Button title='GREATER' onPress={()=>{guess('greater')}}/>
                
            </Card>

            

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})

export default GameScreen