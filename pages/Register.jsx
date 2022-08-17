import { StyleSheet, Text, View, TextInput as Input, Button } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser) => {
                updateProfile(authUser.user, {
                    displayName: name,
                    photoURL: imageUrl || 'https://stape-web.github.io/Img/user.png'
                })
            })
            .catch(err => alert(err.message))
    }

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={{ fontSize: 32, marginBottom: 50 }}>Create a Signal account</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    autoFocus type='text'
                    style={styles.input}
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input
                    placeholder='Email'
                    type='email'
                    style={styles.input}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type='password'
                    style={styles.input}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Input
                    placeholder='Image Url'
                    type='password'
                    style={styles.input}
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>
            <View style={{ width: 200, marginTop: 20 }}>
                <Button raised onPress={register} title='Register' />
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    inputContainer: {
        width: 300
    },
    input: {
        borderBottomWidth: '1px',
        borderBottomColor: '#000',
        paddingVertical: 10,
        fontSize: 18,
        outlineStyle: 'none'
    },
})