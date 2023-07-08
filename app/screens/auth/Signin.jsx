import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Platform, Keyboard, ActivityIndicator, ScrollView, Alert, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'

import { MaterialIcons, Feather } from '@expo/vector-icons'
import color from '../../style/color'
import { useNavigation } from '@react-navigation/native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../hooks/firebase'
import { useDispatch } from 'react-redux'
import { setUser } from '../../features/userSlice'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { BlurView } from 'expo-blur'
import AutoHeightImage from 'react-native-auto-height-image'
import { LinearGradient } from 'expo-linear-gradient'

import bg from '../../../assets/images/bg.png'

const { width } = Dimensions.get('screen')

import * as NavigationBar from 'expo-navigation-bar'
import { StatusBar } from 'expo-status-bar'

const Signin = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const [peek, setPeek] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (() => {
      if (Platform.OS == 'ios') return
      NavigationBar.setBackgroundColorAsync(color.dark)
      NavigationBar.setButtonStyleAsync('light')
    })()
  }, [])

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
            Alert.alert('Sign In error', 'Wrong password. Check your password then try again. 🙂')
          else if (error.message.includes('user-not-found'))
            Alert.alert('Sign In error', 'Seems like tou do not have an account with us \n Please create an account 🙂')
          await AsyncStorage.setItem('recido_user', null)
          setLoading(false)
        })
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.ball} />
      <BlurView intensity={200} tint='dark' style={styles.blur}>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{ flex: 1, width: width - 40 }} showsVerticalScrollIndicator={false}>
              <AutoHeightImage source={bg} width={width - 90} style={{ marginTop: 30, alignSelf: 'center' }} />

              <View style={styles.contentView}>
                <Text style={styles.appName}>Sign in</Text>

                <View style={styles.inputView}>
                  <TextInput value={email} onChangeText={setEmail} autoComplete='email' keyboardType='email-address' autoCapitalize='none' style={styles.input} placeholder='Email' placeholderTextColor={color.mainBackground} />
                  <View style={styles.inputIcon}>
                    <MaterialIcons name="email" size={24} color={color.mainBackground} />
                  </View>
                </View>

                <View style={{ ...styles.inputView, marginBottom: 0 }}>
                  <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry={peek ? true : false} placeholder='Password' placeholderTextColor={color.mainBackground} />
                  <TouchableOpacity onPress={() => setPeek(!peek)} style={styles.inputIcon}>
                    <Feather name={peek ? 'eye' : 'eye-off'} size={24} color={color.mainBackground} />
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Text style={styles.lastText}>Don't have an account? <TouchableOpacity onPress={() => navigate('Signup')}><Text style={styles.lastTextButtonText}>Sign Up</Text></TouchableOpacity></Text>

                  <TouchableOpacity onPress={() => navigate('ForgotPassword')}>
                    <Text style={{ fontWeight: '900', color: color.mainBackground }}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={signinUser} style={styles.button}>
                  <LinearGradient
                    style={styles.gragient}
                    colors={['#0047FF90', '#00A8E390', '#E1A20050', '#CE007C90']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.overlay}>
                      {
                        loading ? <ActivityIndicator color={color.mainBackground} size='small' /> :
                          <Text style={styles.buttonText}>Sign in</Text>
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

export default Signin