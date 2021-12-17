import React from 'react'
import {Text, StyleSheet} from 'react-native'

const TitleText = (props) => {
    return <Text style={{...nativeStyles.font, ...props.style}}> {props.children} </Text>

}

const nativeStyles = StyleSheet.create({
    font : {
        fontFamily: 'open-sans-bold',
        fontSize: 18
        
    }
})

export default TitleText