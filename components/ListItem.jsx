import { StyleSheet, Text, View, TextInput as Input, TouchableOpacity } from 'react-native'
import React from 'react'
import Avatar from './Avatar'

const ListItem = ({ id, chatName, enterChat }) => {
    return (
        <TouchableOpacity onPress={() => enterChat(id, chatName)}>
            <View style={styles.listItem}>
                <Avatar src={{ uri: 'https://stape-web.github.io/Img/user.png' }} />
                <View style={{ width: '100%', padding: 10, }}>
                    <Text style={styles.title}>{chatName}</Text>
                    <Input style={styles.subtitle} value='This is a subtitleThis is a subtitleThis is a subtitleThis is a subtitleThis is a subtitle' />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ListItem

const styles = StyleSheet.create({
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        gap: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        outlineStyle: 'none',
        pointerEvents: 'none',
        width: '80%'
    }
})