import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button,
    TouchableWithoutFeedback, //registers a touch listener without visual feedback
    Keyboard //? And API that lets you interface con el teclado del telefono
} from 'react-native';
import Card from '../components/card/Card'
import Colors from '../constants/colors'
import Input from '../components/input/input'

const StartGameScreen = () => { 
    const [enteredNumber, setEnteredNumber] = useState("")
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(undefined)

    const inputHandler = (input) => {
        setEnteredNumber(input.replace(/[^0-9]/g, ''))
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber)
        if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
            return
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
    }

    let confirmedOutput

    if (confirmed) {
        confirmedOutput = <Text> Chosen Number: {selectedNumber}</Text>
    }



    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}> 
            <Text style={styles.title}> The Game Screen </Text>
            <Card style={styles.inputContainer}>
                <Text> Select a Number </Text>

                
                <Input styles={styles.input} blurOnSubmit keyboardType='number-pad' maxLength={2} 
                onChangeText={(inputHandler)} value={enteredNumber}/>

                <View style={styles.buttonContainer}>
                    <View style={styles.btn}>
                        <Button title="Reset" onPress={() => {setEnteredNumber('');setConfirmed(false)}} color={Colors.secondary} />
                    </View> 
                    <View style={styles.btn}>
                        <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                    </View>
              
                   
                </View>          
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    )

}


//? style Stylesheets are local, so podemos repetir nombres as long as no esten en el mismo archivo.
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,

    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',  
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    btn: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: 'center',
    }
})

export default StartGameScreen