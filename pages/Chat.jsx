import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, TextInput as Input, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import Avatar from '../components/Avatar'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { PaperAirplaneIcon, PhoneIcon, VideoCameraIcon } from 'react-native-heroicons/solid'
import { StatusBar } from 'expo-status-bar'
import { auth, db } from '../firebase'
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'

const Chat = ({ navigation, route }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Avatar src={{ uri: messages[0]?.data.photoUrl || 'https://stape-web.github.io/Img/user.png' }} />
                    <Text style={{ color: 'white', marginLeft: 10, fontWeight: 700, fontSize: 20 }}>{route.params.chatName}</Text>
                </View >
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
                    <ArrowLeftIcon style={{ color: '#fff' }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20 }}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <VideoCameraIcon style={{ color: '#fff', width: 24, height: 24 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <PhoneIcon style={{ color: '#fff', width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation, messages])

    const sendMessage = () => {
        Keyboard.dismiss();

        const docRef = doc(db, 'chats', route.params.id);
        const colRef = collection(docRef, 'messages')
        addDoc(colRef, {
            timestamp: serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoUrl: auth.currentUser.photoURL
        });

        setInput('')
    }

    useEffect(() => {
        const docRef = doc(db, 'chats', route.params.id)
        const colRef = collection(docRef, 'messages')
        const q = query(colRef, orderBy('timestamp', 'desc'))
        const unsub = onSnapshot((q), (snapshot) => {
            setMessages(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })))
        })

        return unsub
    }, [route])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView style={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciver}>
                                        <Avatar src={{ uri: data.photoUrl }} style={styles.avatar} />
                                        <Text style={styles.reciverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar src={{ uri: data.photoUrl }} style={styles.avatarLeft} />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <Input
                                placeholder='Signal message'
                                style={styles.input}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <PaperAirplaneIcon style={{ color: '#2B68E6', transform: 'rotate(90deg)' }} />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default Chat

const styles = StyleSheet.create({
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    },
    senderText: {
        color: 'white',
        fontWeight: 500,
        marginLeft: 10,
        marginBottom: 15
    },
    avatar: {
        position: 'absolute',
        right: -5,
        bottom: -15,
        width: 30,
        height: 30
    },
    avatarLeft: {
        position: 'absolute',
        left: -5,
        bottom: -15,
        width: 30,
        height: 30
    },
    reciver: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15
    },
    input: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 30
    }
})