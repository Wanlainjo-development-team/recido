import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import style from './style'

import { MaterialIcons } from '@expo/vector-icons'
import color from '../../style/color'
import { useNavigation } from '@react-navigation/native'

const ForgotPassword = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const signinUser = () => { }

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

          <TouchableOpacity onPress={signinUser} style={style.submitButton}>
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