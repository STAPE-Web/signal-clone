import { StyleSheet, Text, View, TextInput as Input, Button } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const AddChat = ({ navigation }) => {
    const [input, setInput] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
            headerBackTitle: 'Chats'
        })
    }, [navigation])

    const createChat = async () => {
        addDoc(collection(db, 'chats'), {
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch(err => alert(err))
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder='Enter a chat name'
                value={input}
                onChangeText={(text) => setInput(text)}
                style={styles.input}
                onSubmitEditing={createChat}
            />
            <Button onPress={createChat} title='Create new Chat' />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        gap: 20,
        padding: 25
    },
    input: {
        borderBottomWidth: '1px',
        borderBottomColor: '#000',
        paddingVertical: 10,
        fontSize: 18,
        outlineStyle: 'none',
        width: '100%',
    },
})