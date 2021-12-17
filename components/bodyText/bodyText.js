import React from 'react'
import {Text, StyleSheet} from 'react-native'

const BodyText = (props) => {
    return <Text style={{...nativeStyles.font, ...props.style}}> {props.children} </Text>

}

const nativeStyles = StyleSheet.create({
    font : {
        fontFamily: 'open-sans'
    }
})

export default BodyText