import React from 'react'
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native'
import Colors from '../../constants/colors'

//! RN checks for the platform then renders the appropiate component, automatically
//! Just by naming it x.android.js and x.ios.js

const MainButton = props => {
    return <TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>

        <View style={styles.button}>
            <Text style={styles.buttonText}> {props.children} </Text>
        </View>

    </TouchableOpacity>
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: 'green',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default MainButton