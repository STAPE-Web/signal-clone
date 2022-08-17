import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ListItem from '../components/ListItem'
import { auth, db } from '../firebase';
import Avatar from '../components/Avatar';
import { CameraIcon, PencilIcon } from 'react-native-heroicons/outline'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';

const Home = ({ navigation }) => {
    const [chats, setChats] = useState([])

    const SignOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login')
        })
    }
    useEffect(() => {
        onSnapshot(collection(db, 'chats'), (snapshot) => {
            setChats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: '#000' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={SignOutUser}>
                        <Avatar src={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>

                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20 }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <CameraIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddChat')} activeOpacity={0.5}>
                        <PencilIcon />
                    </TouchableOpacity>
                </View>
            )
        })
    })

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName
        })
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {chats.map(({ id, data: { chatName } }) => (
                    <ListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})