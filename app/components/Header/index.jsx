import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'

import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation()

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={style.backButton}>
                <AntDesign name="back" size={22} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default Header