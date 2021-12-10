import React from 'react'
import {TextInput,StyleSheet} from 'react-native'


const Input = (props) => {
    //? Here, instead of destructuring, usamos un spread props, para poder pasarle a TextInput todos los props opcionales
    //? Que el componente base podria aceptar, que son un millon btw.
    return <TextInput {...props} style={{...nativeStyles.input, ...props.styles}} />
}

const nativeStyles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginVertical: 10
    }
})

export default Input
