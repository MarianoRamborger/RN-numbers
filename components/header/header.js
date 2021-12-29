import React from 'react'

import { View, Text, StyleSheet,
Platform, //? Gives you the platform of the device, if its a tv or tablet or phone, as well as the OS  
//? Platform.select({ ios: styles.X, android: styles.X}) Lets you pass styles depending on the OS for a component or tag..
//! You pass plataform.select on the style a of a component/tag 
} from 'react-native'
import Colors from '../../constants/colors'
import TitleText from '../titleText/titleText'


const Header = props => { 
    return (
            <View style={styles.header}>
                <TitleText style={styles.headerTitle}> {props.title} </TitleText>
            

            </View>
    )
}  

const styles  = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    headerTitle: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
})

export default Header