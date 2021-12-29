import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, ScrollView,
    TouchableWithoutFeedback, //registers a touch listener without visual feedback
    Keyboard, //? And API that lets you interface con el teclado del telefono
    Alert, //? Object desde el que se llama una native API
    Dimensions, //? Allows to find how much width (and other stuff) you have available in your screen
    KeyboardAvoidingView //? Used to wrap a component to make sure the keyboard doesnt overlays it
} from 'react-native';
import Card from '../components/card/Card'
import Colors from '../constants/colors'
import Input from '../components/input/input'
import NumberContainer from '../components/NumberContainer/NumberContainer'
import BodyText from '../components/bodyText/bodyText'
import TitleText from '../components/titleText/titleText';
import MainButton  from '../components/mainButton/mainButton'

const StartGameScreen = (props) => { 
    const [enteredNumber, setEnteredNumber] = useState("")
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(undefined)
   
    //! Este 'combo' escucha y recalcula el length de los botones al cambiar la orientation del device
    const [ buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4 )
    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width / 4)      
    }
 
    useEffect (() => {
  
       Dimensions.addEventListener('change', updateLayout)
       return () => { //? CleanUp function
           Dimensions.removeEventListener('change', updateLayout)
       }
    },[])

    //! *************************************************************************************



    const inputHandler = (input) => {
        setEnteredNumber(input.replace(/[^0-9]/g, ''))
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber)
        if ( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid number", 'Number has to be between 1 and 99', [{text: 'Okay', style: 'destructive', onPress:()=>{setEnteredNumber('');setConfirmed(false)}} ])
            return
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber)
        setEnteredNumber('')
    }

    let confirmedOutput

    if (confirmed) {
        
        confirmedOutput = <Card style={styles.summaryContainer}>
           <BodyText> You Selected: </BodyText>
           <NumberContainer> {selectedNumber} </NumberContainer>
           <MainButton onPress={()=>props.startGame(selectedNumber)}> Start Game </MainButton>
           
        </Card>
        
    }



    return ( <ScrollView>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View style={styles.screen}> 
                    <TitleText style={styles.title}> The Game Screen </TitleText>
                    <Card style={styles.inputContainer}>
                        <Text> Select a Number </Text>

                        
                        <Input styles={styles.input} blurOnSubmit keyboardType='number-pad' maxLength={2} 
                        onChangeText={(inputHandler)} value={enteredNumber}/>

                        <View style={styles.buttonContainer}>
                            <View style={{width : buttonWidth}}>
                                <Button title="Reset" onPress={() => {setEnteredNumber('');setConfirmed(false)}} color={Colors.secondary} />
                            </View> 
                            <View style={{width : buttonWidth}}>
                                <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                            </View>
                    
                        
                        </View>          
                    </Card>
                    {confirmedOutput}
                </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
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
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',  
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    btn: {
        // width: 100
        width: Dimensions.get('window').width / 4 
        //? use Window cause, in android, screen cuenta la statusbar, so window es la parte visible posta
        //? From here you can get width, height, fonstscale and other stuff
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
        
    }
})

export default StartGameScreen