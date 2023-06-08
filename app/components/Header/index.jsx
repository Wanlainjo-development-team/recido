import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'

import { AntDesign } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import color from '../../style/color'

const Header = () => {
    const { goBack } = useNavigation()

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={() => goBack()} style={style.backButton}>
                <AntDesign name="back" size={22} color={color.accent} />
            </TouchableOpacity>
        </View>
    )
}

export default Header