import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Keyboard, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import style from './style'

import { MaterialIcons } from '@expo/vector-icons'
import color from '../../style/color'
import { useNavigation } from '@react-navigation/native'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../hooks/firebase'

const ForgotPassword = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

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
    <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={style.subContainer}>
        <View style={style.card}>
          <Text style={style.headText}>Recover your account</Text>
          <View style={style.inputView}>
            <TextInput value={email} onChangeText={setEmail} style={style.input} placeholder='Email' />
            <View style={style.inputIcon}>
              <MaterialIcons name="email" size={24} color={color.accent} />
            </View>
          </View>

          <TouchableOpacity onPress={sendMail} style={style.submitButton}>
            {
              loading ? <ActivityIndicator color={color.white} />
                : <Text style={style.submitButtonText}>Send</Text>
            }
          </TouchableOpacity>
        </View>
      </Pressable>
      <Text style={style.lastText}>Don't have an account? <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={style.lastTextButtonText}>Register</Text></TouchableOpacity></Text>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword