import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import styles from './styles'
import color from '../../style/color'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useEffect } from 'react'

const Loading = ({ text }) => {
    const { navigate } = useNavigation()
    const [timer, setTimer] = useState(false)

    useEffect(() => {
        (() => {
            setTimeout(() => {
                setTimer(true)
            }, 5000)
        })()
    }, [])

    return (
        <View style={styles.loadingView}>
            <View style={styles.loadingViewImage}>
                {
                    timer ? <AntDesign name="inbox" size={60} color={`${color.accent}90`} /> :
                        <FontAwesome5 name="file-invoice-dollar" size={60} color={`${color.accent}40`} />
                }

                {
                    !timer && <ActivityIndicator color={color.accent} style={styles.indicator} />
                }
            </View>

            <Text style={styles.loadingViewText}>{timer ? 'No item yet 🙂' : text}</Text>

            {
                timer &&
                <TouchableOpacity onPress={() => navigate('AddInventory', { viewItem: null })} style={{ paddingHorizontal: 10, paddingVertical: 5, marginTop: 20 }}>
                    <Text style={{ color: color.accent }}>Create now</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default Loading