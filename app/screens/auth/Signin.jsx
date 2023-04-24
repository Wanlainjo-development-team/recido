import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import style from './style'

import { MaterialIcons, Feather } from '@expo/vector-icons';
import color from '../../style/color';
import { useNavigation } from '@react-navigation/native';

const Signin = () => {
  const navigation = useNavigation()

  const [peek, setPeek] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signinUser = () => { }

  return (
    <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={style.subContainer}>
        <View style={style.card}>
          <Text style={style.headText}>Sign In to continue</Text>
          <View style={style.inputView}>
            <TextInput value={email} onChangeText={setEmail} style={style.input} placeholder='Email' />
            <View style={style.inputIcon}>
              <MaterialIcons name="email" size={24} color={color.accent} />
            </View>
          </View>

          <View style={style.inputView}>
            <TextInput value={password} onChangeText={setPassword} style={style.input} secureTextEntry={peek ? true : false} placeholder='Password' />
            <TouchableOpacity onPress={() => setPeek(!peek)} style={style.inputIcon}>
              <Feather name={peek ? 'eye' : 'eye-off'} size={24} color={color.accent} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={signinUser} style={style.submitButton}>
            {
              loading ? <ActivityIndicator color={color.white} />
                : <Text style={style.submitButtonText}>Sign In</Text>
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={style.buttomButton}>
            <Text style={style.buttomButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <Text style={style.lastText}>Don't have an account? <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text style={style.lastTextButtonText}>Register</Text></TouchableOpacity></Text>
    </KeyboardAvoidingView>
  )
}

export default Signin