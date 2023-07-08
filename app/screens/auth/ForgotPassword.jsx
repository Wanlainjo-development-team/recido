import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Alert, Platform, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'

import { MaterialIcons, Feather } from '@expo/vector-icons'
import color from '../../style/color'
import { useNavigation } from '@react-navigation/native'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../hooks/firebase'
import { BlurView } from 'expo-blur'
import AutoHeightImage from 'react-native-auto-height-image'
import bg from '../../../assets/images/bg.png'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('screen')

import * as NavigationBar from 'expo-navigation-bar'

const ForgotPassword = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (() => {
      if (Platform.OS == 'ios') return
      NavigationBar.setBackgroundColorAsync(color.dark)
      NavigationBar.setButtonStyleAsync('light')
    })()
  }, [])

  const sendMail = () => {
    setLoading(true)

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Email sent', 'An email has been sent to your inbox')
        setLoading(false)
      })
      .catch(() => {
        Alert.alert('Error !!!', 'THere was an error sending your email. Check your email address and try again.')
        setLoading(false)
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.ball} />
      <BlurView intensity={200} tint='dark' style={styles.blur}>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{ flex: 1, width: width - 40 }} showsVerticalScrollIndicator={false}>
              <AutoHeightImage source={bg} width={width - 90} style={{ marginTop: 30, alignSelf: 'center' }} />

              <View style={styles.contentView}>
                <Text style={styles.appName}>Recover password</Text>

                <View style={{ ...styles.inputView, marginBottom: 0 }}>
                  <TextInput value={email} onChangeText={setEmail} style={styles.input} autoComplete='email' keyboardType='email-address' autoCapitalize='none' placeholder='Email' placeholderTextColor={color.mainBackground} />
                  <View style={styles.inputIcon}>
                    <MaterialIcons name="email" size={24} color={color.mainBackground} />
                  </View>
                </View>

                <Text style={styles.lastText}>Don't have an account? <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={styles.lastTextButtonText}>Register</Text></TouchableOpacity></Text>

                <TouchableOpacity onPress={sendMail} style={styles.button}>
                  <LinearGradient
                    style={styles.gragient}
                    colors={['#0047FF90', '#00A8E390', '#E1A20050', '#CE007C90']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.overlay}>
                      {
                        loading ? <ActivityIndicator color={color.mainBackground} size='small' /> :
                          <Text style={styles.buttonText}>Send</Text>
                      }
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </BlurView>
    </View>
  )
}

export default ForgotPassword