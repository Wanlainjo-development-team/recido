import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './styles'
import color from '../../style/color'
import { FontAwesome5 } from '@expo/vector-icons'

const Loading = ({ text }) => {
    return (
        <View style={styles.loadingView}>
            <View style={styles.loadingViewImage}>
                <FontAwesome5 name="file-invoice-dollar" size={60} color={`${color.accent}40`} />
                <ActivityIndicator color={color.accent} style={styles.indicator} />
            </View>

            <Text style={styles.loadingViewText}>{text}</Text>
        </View>
    )
}

export default Loading