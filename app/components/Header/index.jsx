import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import style from './style'

import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import color from '../../style/color'

const Header = ({ title }) => {
    const { goBack } = useNavigation()

    return (
        <View style={style.container}>
            <View style={style.left}>
                <TouchableOpacity onPress={() => goBack()} style={style.backButton}>
                    <AntDesign name="back" size={22} color={color.accent} />
                </TouchableOpacity>

                {
                    title &&
                    <Text style={style.title}>{title}</Text>
                }
            </View>
        </View>
    )
}

export default Header