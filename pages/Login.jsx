import { StyleSheet, View, Image, TextInput as Input, Button } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace('Home')
            }
        })

        return unsubscribe;
    })

    const SignIn = () => {
        signInWithEmailAndPassword(auth, email, password).catch(err => alert(err))
    }

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <Image source={{ uri: 'https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png' }} style={{ width: 200, height: 200 }} />
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Email'
                    autoFocus type='email'
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
                    onSubmitEditing={SignIn}
                />
            </View>
            <View style={{ flex: 1, gap: 10, width: 200, marginTop: 20 }}>
                <Button onPress={SignIn} title='Login' />
                <Button onPress={() => navigation.navigate('Register')} title='Register' />
            </View>
        </View>
    )
}

export default Login

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