import React, {useState, useEffect,
    useRef // Allows you to define a value that survives component rerenders 
    //! Difference con useState is that when the value is changed, the component is not rerendered
} from 'react'
import {View, Text, StyleSheet, Button, Alert, ScrollView} from 'react-native'
import Card from '../components/card/Card'
import NumberContainer from '../components/NumberContainer/NumberContainer'
import defaultStylesheet from '../constants/default-stylesheet'
import MainButton from '../components/mainButton/mainButton'
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../components/bodyText/bodyText'




const getRandom = (min,max,exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    const randomNumber = Math.floor(Math.random() * (max - min)) + min

    if (randomNumber === exclude) {
        return getRandom(min,max,exclude)
    } else return randomNumber
} 

const renderListItem = (item,index) => {
    return <View key={`${item}-${index}`} style={styles.listItem}>
                    <BodyText>  
                        #{index}
                    </BodyText>
                    <BodyText>
                        {item}
                    </BodyText>
                </View>
}


const GameScreen = (props) => {
    const initialGuess = getRandom(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])

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
            currentLow.current = currentGuess + 1
        }
    
        const nextNumber = getRandom(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        // setRounds(curRounds => curRounds + 1)
        setPastGuesses([nextNumber, ...pastGuesses ])
    }
     
    useEffect(()=>{
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length)
        }

    },[currentGuess, props.userChoice, props.onGameOver])



    return (
        <View style={styles.screen}>
            <Text style={defaultStylesheet.titleText}> Opponent's Guess </Text>
            <NumberContainer> {currentGuess} </NumberContainer>

            <Card style={styles.buttonContainer}>
                <MainButton onPress={()=>{guess('lower')}}> <Ionicons name='md-remove' size={24} color={'white'} />  </MainButton>
                <MainButton onPress={()=>{guess('greater')}}> <Ionicons name='md-add' size={24} color={'white'}  />  </MainButton>
      
                
            </Card>

            <View style={styles.listContainer}>
                 {/*For scrollview and flatlist, you use contentContainerStyle to control the spacing of items */}
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,index) => {
                        return renderListItem(guess, pastGuesses.length - index)
                    })}
                </ScrollView>
            </View>
           
            

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
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent:  'space-around',
        width: '60%'
    },
    listContainer: {
        width: '80%',
        flex: 1, //! Sin esto, un scrollView wrappeado en una View no va a poder ser scrolleable.
    },
    list: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1, // Like flex-grow, but it ONLY is concerned with growth, mantiene todas sus otras properties, useful for scrollviews,
        //Con flex:1 no funca en android. And we needed 
    }
})

export default GameScreen