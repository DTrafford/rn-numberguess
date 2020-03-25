import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const Input = (props) => {
    return (
        // ...props takes the passed props and applied them
        // ...styles.input & ...props.styles takes the styles from this component and adds the passed styles
        <TextInput {...props} style={{ ...styles.input, ...props.style }} />
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        width: '85%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 20
    }
})
