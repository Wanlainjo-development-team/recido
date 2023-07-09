import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import style from './style'

import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import color from '../../style/color'
import { useSelector } from 'react-redux'

const Header = ({ title }) => {
    const { goBack } = useNavigation()

    const { theme } = useSelector(state => state.user)

    return (
        <View style={{ ...style.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <View style={style.left}>
                <TouchableOpacity onPress={() => goBack()} style={style.backButton}>
                    <AntDesign name="back" size={22} color={color.accent} />
                </TouchableOpacity>

                {
                    title &&
                    <Text style={{ ...style.title, color: theme ? color.white : color.dark }}>{title}</Text>
                }
            </View>
        </View>
    )
}

export default Header