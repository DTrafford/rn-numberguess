import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const Card = (props) => {
    return (
        // By using spread on styles we take existing styles and then add passed prop styles, any existing style will be overriden by props
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        maxWidth: '80%',
        width: 300,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .46,
        shadowRadius: 6,
        backgroundColor: 'white',
        elevation: 12,
        padding: 20,
        borderRadius: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
    }
})
