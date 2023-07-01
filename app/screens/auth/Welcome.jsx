import { View, Text, ImageBackground, Image, Dimensions } from 'react-native'
import React from 'react'

import bg from '../../../assets/images/bg.png'
import styles from './welcome'
import { LinearGradient } from 'expo-linear-gradient'
import color from '../../style/color'
import { BlurView } from 'expo-blur'
import AutoHeightImage from 'react-native-auto-height-image'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('screen')

const Welcome = () => {
    const {navigate} = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.ball} />
            <BlurView intensity={200} tint='dark' style={styles.blur}>
                <AutoHeightImage source={bg} width={width - 20} style={{ marginTop: 30 }} />

                <View style={styles.contentView}>

                    <Text style={styles.appName}>Recido</Text>
                    <Text style={styles.text}>Get your bussiness under control with smart invoice services.</Text>

                    <TouchableOpacity onPress={() => navigate('Signin')} style={styles.button}>
                        <LinearGradient
                            style={styles.gragient}
                            colors={['#0047FF90', '#00A8E390', '#E1A20050', '#CE007C90']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={styles.overlay}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </View>
    )
}

export default Welcome