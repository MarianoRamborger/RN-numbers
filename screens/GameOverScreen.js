import React from 'react'
import {View, StyleSheet, Text, Image, Button, Dimensions, ScrollView,
} from 'react-native'
import TitleText from '../components/titleText/titleText'
import colors from '../constants/colors'
import MainButton from '../components/mainButton/mainButton'

const GameOverScreen = (props) => {
    return <ScrollView>
    <View style={styles.screen}>
        <TitleText> THE GAME IS OVER </TitleText>
        <View style={styles.imageContainer}>
            <Image 
            source={require('../assets/images/success.png')} //  FOR LOCAL IMAGES
            // source={{
            //     uri: 'https://bsmedia.business-standard.com/_media/bs/img/article/2020-12/11/full/1607656152-0479.jpg'
            // }} //! BUT, para las imagenes cargadas de internet, one MUST specify width/height 
            //! for the image component since RN cant figure it out iself. Con las locales si puede
            style={styles.image} />
        </View> 
       
        <View style={styles.resultContainer}> 
         {/* Text inside text, receives the stlyes of the parent text!. Also Text doesnt use flexbox but its own positioning system */}
         <TitleText style={styles.resultText}> Phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.  </TitleText>
        </View>
       
       <MainButton onPress={props.gameRestartHandler}>Play Again</MainButton>
        
    </View>
    </ScrollView>
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height:  Dimensions.get('window').width * 0.7, //? Es width, porque la imagen es al final del dia un cuadrado so same wdth as hght    
        borderRadius:  Dimensions.get('window').width * 0.7 / 2, 
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical:  Dimensions.get('window').height / 30, //? So that'd be 3.1% of the device height
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height / 60     //? So that'd be 1.4%
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    }
})

export default GameOverScreen