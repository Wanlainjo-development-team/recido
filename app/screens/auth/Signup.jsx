import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Keyboard, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import style from './style'

import { MaterialIcons, Feather } from '@expo/vector-icons'
import color from '../../style/color'
import { useNavigation } from '@react-navigation/native'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../hooks/firebase'
import { useDispatch } from 'react-redux'

import { setUser } from '../../features/userSlice'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import AsyncStorage from '@react-native-async-storage/async-storage'


const Signup = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [peek, setPeek] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const signupUser = async () => {
    if (!email.match(regex) && password == '') {
      Alert.alert('Sign Up error', 'Please complete the form and try again 🙂')
    } else {

      setLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then(async user => {

          let id = user?.uid != undefined ? user?.uid : user?.user?.uid

          await setDoc(doc(db, 'users', id), {
            id,
            name,
            email,
            tries: 25,
            invoice: 0,
            timestamp: serverTimestamp()
          })

          await AsyncStorage.setItem('recido_user', JSON.stringify(user))

          dispatch(setUser(user))
          setLoading(false)
        }).catch(async error => {
          if (error.message.includes('email-already-in-use'))
            Alert.alert('Sign Up error', 'Seems this email is already in use. \nTry another 🙂')
          else if (error.message.includes('weak-password'))
            Alert.alert('Sign Up error', 'weak-password\nPassword should be at least 6 characters')

          await AsyncStorage.setItem('recido_user', null)
          setLoading(false)
        })
    }
  }

  return (
    <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={style.subContainer}>
        <View style={style.card}>
          <Text style={style.headText}>Sign Up to continue</Text>
          <View style={style.inputView}>
            <TextInput value={name} onChangeText={setName} autoComplete='name' keyboardType='default' style={style.input} placeholder='Organisation name' />
            <View style={style.inputIcon}>
              <Feather name="at-sign" size={24} color={color.accent} />
            </View>
          </View>

          <View style={style.inputView}>
            <TextInput value={email} onChangeText={setEmail} autoComplete='email' keyboardType='email-address' autoCapitalize='none' style={style.input} placeholder='Email' />
            <View style={style.inputIcon}>
              <MaterialIcons name="email" size={24} color={color.accent} />
            </View>
          </View>

          <View style={style.inputView}>
            <TextInput value={password} onChangeText={setPassword} autoComplete='new-password' autoCapitalize='none' style={style.input} secureTextEntry={peek ? true : false} placeholder='Password' />
            <TouchableOpacity onPress={() => setPeek(!peek)} style={style.inputIcon}>
              <Feather name={peek ? 'eye' : 'eye-off'} size={24} color={color.accent} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity disabled={(name == '' || email == '' || password == '') ? true : false} onPress={signupUser} style={style.submitButton}>
            {
              loading ? <ActivityIndicator color={color.white} />
                : <Text style={style.submitButtonText}>Sign Up</Text>
            }
          </TouchableOpacity>
        </View>
      </Pressable>
      <Text style={style.lastText}>Already have an account? <TouchableOpacity onPress={() => navigation.navigate('Signin')}><Text style={style.lastTextButtonText}>Sign In</Text></TouchableOpacity></Text>
    </KeyboardAvoidingView>
  )
}

export default Signup