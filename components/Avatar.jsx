import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Avatar = ({ src, style }) => {
    return (
        <Image source={src ? src : { uri: 'https://stape-web.github.io/Img/user.png' }} style={[styles.avatar, style]} />
    )
}

export default Avatar

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: '100%'
    },
})