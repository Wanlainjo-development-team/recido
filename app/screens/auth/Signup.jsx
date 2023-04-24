import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import style from './style'

import { MaterialIcons, Feather } from '@expo/vector-icons';
import color from '../../style/color';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation()

  const [peek, setPeek] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signupUser = () => { }

  return (
    <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Pressable onPress={Keyboard.dismiss} style={style.subContainer}>
        <View style={style.card}>
          <Text style={style.headText}>Sign Up to continue</Text>
          <View style={style.inputView}>
            <TextInput value={name} onChangeText={setName} style={style.input} placeholder='Organisation name' />
            <View style={style.inputIcon}>
              <Feather name="at-sign" size={24} color={color.accent} />
            </View>
          </View>

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

          <TouchableOpacity onPress={signupUser} style={style.submitButton}>
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