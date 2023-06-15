import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import style from './style'

import { MaterialIcons, Feather } from '@expo/vector-icons'
import color from '../../style/color'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../hooks/firebase'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/userSlice'
import { Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const Signin = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [peek, setPeek] = useState(true)
  const [email, setEmail] = useState('rukkiecodes@gmail.com')
  const [password, setPassword] = useState('amagboro')
  const [loading, setLoading] = useState(false)

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const signinUser = () => {
    if (!email.match(regex) && password == '') {
      Alert.alert('Sign Up error', 'Please complete the form and try again 🙂')
    } else {
      setLoading(true)

      signInWithEmailAndPassword(auth, email, password)
        .then(async user => {
          await AsyncStorage.setItem('recido_user', JSON.stringify(user))
          setLoading(false)
          dispatch(setUser(user))
        }).catch(async error => {
          if (error.message.includes('wrong-password'))
            Alert.alert('Sign In error', 'Wrong password. Check your passwod then try again. 🙂')
          else if (error.message.includes('user-not-found'))
            Alert.alert('Sign In error', 'Seems like tou do not have an account with us \n Please create an account 🙂')
          await AsyncStorage.setItem('recido_user', null)
          setLoading(false)
        })
    }
  }

  return (
    <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={style.subContainer}>
        <View style={style.card}>
          <Text style={style.headText}>Sign In to continue</Text>
          <View style={style.inputView}>
            <TextInput value={email} onChangeText={setEmail} autoComplete='email' keyboardType='email-address' autoCapitalize='none' style={style.input} placeholder='Email' />
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