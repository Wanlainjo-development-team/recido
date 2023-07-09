import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import styles from '../styles'
import color from '../../../style/color'
import { useSelector } from 'react-redux'

const Loading = ({ text }) => {
    const { theme } = useSelector(state => state.user)

    return (
        <View style={styles.loadingView}>
            <View style={styles.loadingViewImage}>
                <FontAwesome5 name="file-invoice-dollar" size={60} color={`${color.accent}40`} />
                <ActivityIndicator color={color.accent} style={styles.indicator} />
            </View>

            <Text style={{ ...styles.loadingViewText, color: theme ? color.white : color.dark }}>{text}</Text>
        </View>
    )
}

export default Loading