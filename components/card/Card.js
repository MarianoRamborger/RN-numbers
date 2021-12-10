import React from 'react'
import { View, StyleSheet } from 'react-native'

const Card = props => {
    return  <View 
        /*  Much like with dispatch, stlye gets spread operator con estilos propios,  then spread operator con estilos heredados
        que pueden pisarlos si fuera necesario, overwriting them */
        style={{...styles.card, ...props.style }}>
        {props.children}
        </View> //props.children, para que la card wrapee cualquier cosa que le pases

}

const styles = StyleSheet.create({
    card: {

             /* Estas shadows solo funcan en IOS */
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowRadius: 6,
                shadowOpacity: 0.26,
             /* Estas shadows solo funcan en IOS */
            /* Para Android,  usar Elevation:  */ 
             elevation: 5, 
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10   
    }
})

export default Card