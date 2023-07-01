import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Pressable, Keyboard, ActivityIndicator, Alert, Platform, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './style'

import { MaterialIcons, Feather } from '@expo/vector-icons'
import color from '../../style/color'
import { useNavigation } from '@react-navigation/native'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../hooks/firebase'
import { useDispatch } from 'react-redux'

import { setSetup, setUser } from '../../features/userSlice'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { BlurView } from 'expo-blur'
import { TouchableWithoutFeedback } from 'react-native'
import { ScrollView } from 'react-native'

const { width } = Dimensions.get('screen')
import bg from '../../../assets/images/bg.png'
import AutoHeightImage from 'react-native-auto-height-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import uuid from 'uuid-random'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'


const Signup = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const storage = getStorage()

  const [peek, setPeek] = useState(true)
  const [form, setForm] = useState({
    name: '',
    email: '',
    bussinessNumer: '',
    address: '',
    image: null
  })
  const [loading, setLoading] = useState(false)

  const [, setDoneWithSetup] = useState(false)

  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

  const pickImage = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let image = result.assets[0].uri

      setForm({ ...form, image })
    }
  };

  const signupUser = async () => {
    if (!form.image) {
      Alert.alert('Please choose your bussiness logo')
      return
    }
    if (form.name == '') {
      Alert.alert('Please enter a bussiness name')
      return
    }
    if (form.bussinessNumer == '') {
      Alert.alert('Please enter a bussiness phone number')
      return
    }
    if (form.address == '') {
      Alert.alert('Please enter your bussiness address')
      return
    }
    if (!form.email.match(regex)) {
      Alert.alert('Please enter a valid email address')
      return
    }
    if (form.password.length <= 3) {
      Alert.alert('Please enter a valid password')
      return
    }
    else {
      setLoading(true)
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(async user => {

          let id = user?.uid != undefined ? user?.uid : user?.user?.uid

          if (!form.image) return

          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => resolve(xhr.response)

            xhr.responseType = 'blob'
            xhr.open('GET', form.image, true)
            xhr.send(null)
          })

          const link = `logos/${id}/${uuid()}`
          const photoRef = ref(storage, link)

          uploadBytes(photoRef, blob)
            .then(snapshot => {
              getDownloadURL(snapshot?.ref)
                .then(async downloadURL => {
                  await setDoc(doc(db, 'users', id), {
                    id,
                    name: form.name,
                    email: form.email,
                    bussinessNumer: form.bussinessNumer != '' ? form.bussinessNumer : '',
                    address: form.address != '' ? form.address : '',
                    tries: 25,
                    invoice: 0,
                    invoiceColor: '555555',
                    orderBy: 'desc',
                    quantityLabel: 'QTY',
                    searchBy: 'invoiceContact.name',
                    setup: false,
                    sortBy: 'invoiceId',
                    unitPriceLabel: 'RATE',
                    photoURL: downloadURL,
                    photoLink: link,
                    setup: true,
                    timestamp: serverTimestamp(),
                  })

                  await AsyncStorage.setItem('recido_user', JSON.stringify(user))

                  dispatch(setSetup(false))
                  dispatch(setUser(user))
                  setLoading(false)
                })
            })
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
    <View style={styles.container}>
      <View style={styles.ball} />
      <BlurView intensity={200} tint='dark' style={styles.blur}>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{ flex: 1, width: width - 40 }} showsVerticalScrollIndicator={false}>

              <View style={styles.contentView}>
                <Text style={styles.appName}>Sign up</Text>

                <TouchableOpacity onPress={pickImage} style={styles.logoButton}>
                  {
                    form.image ? <Image source={{ uri: form.image }} style={{ width: 150, height: 150, borderRadius: 100 }} /> :
                      <Text style={{ color: color.mainBackground }}>Set bussiness logo</Text>
                  }
                </TouchableOpacity>

                <View style={styles.inputView}>
                  <TextInput value={form.name} onChangeText={name => setForm({ ...form, name })} style={styles.input} placeholder='Bussiness name' placeholderTextColor={color.mainBackground} />
                </View>
                <View style={styles.inputView}>
                  <TextInput value={form.bussinessNumer} onChangeText={bussinessNumer => setForm({ ...form, bussinessNumer })} keyboardType='phone-pad' style={styles.input} placeholder='Office phone' placeholderTextColor={color.mainBackground} />
                </View>
                <View style={styles.inputView}>
                  <TextInput value={form.address} onChangeText={address => setForm({ ...form, address })} style={styles.input} placeholder='Business address' placeholderTextColor={color.mainBackground} />
                </View>
                <View style={styles.inputView}>
                  <TextInput value={form.email} onChangeText={email => setForm({ ...form, email })} autoComplete='email' keyboardType='email-address' autoCapitalize='none' style={styles.input} placeholder='Signup email' placeholderTextColor={color.mainBackground} />
                </View>
                <View style={{ ...styles.inputView, marginBottom: 0 }}>
                  <TextInput value={form.password} onChangeText={password => setForm({ ...form, password })} style={styles.input} secureTextEntry={peek ? true : false} placeholder='Password' placeholderTextColor={color.mainBackground} />
                  <TouchableOpacity onPress={() => setPeek(!peek)} style={styles.inputIcon}>
                    <Feather name={peek ? 'eye' : 'eye-off'} size={24} color={color.mainBackground} />
                  </TouchableOpacity>
                </View>


                <Text style={styles.lastText}>Already have an account? <TouchableOpacity onPress={() => navigation.navigate('Signin')}><Text style={styles.lastTextButtonText}>Sign In</Text></TouchableOpacity></Text>

                <TouchableOpacity onPress={signupUser} style={styles.button}>
                  <LinearGradient
                    style={styles.gragient}
                    colors={['#0047FF90', '#00A8E390', '#E1A20050', '#CE007C90']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <View style={styles.overlay}>
                      {
                        loading ? <ActivityIndicator color={color.mainBackground} size='small' /> :
                          <Text style={styles.buttonText}>Sign up</Text>
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
    // <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    //   <Pressable onPress={Keyboard.dismiss} style={styles.subContainer}>
    //     <View style={styles.card}>
    //       <Text style={styles.headText}>Sign Up to continue</Text>
    //       <View style={styles.inputView}>
    //         <TextInput value={name} onChangeText={setName} autoComplete='name' keyboardType='default' style={styles.input} placeholder='Bussiness name' />
    //         <View style={styles.inputIcon}>
    //           <Feather name="at-sign" size={24} color={color.accent} />
    //         </View>
    //       </View>

    //       <View style={styles.inputView}>
    //         <TextInput value={email} onChangeText={setEmail} autoComplete='email' keyboardType='email-address' autoCapitalize='none' style={styles.input} placeholder='Email' />
    //         <View style={styles.inputIcon}>
    //           <MaterialIcons name="email" size={24} color={color.accent} />
    //         </View>
    //       </View>

    //       <View style={styles.inputView}>
    //         <TextInput value={password} onChangeText={setPassword} autoComplete='new-password' autoCapitalize='none' style={styles.input} secureTextEntry={peek ? true : false} placeholder='Password' />
    //         <TouchableOpacity onPress={() => setPeek(!peek)} style={styles.inputIcon}>
    //           <Feather name={peek ? 'eye' : 'eye-off'} size={24} color={color.accent} />
    //         </TouchableOpacity>
    //       </View>

    //       <TouchableOpacity disabled={(name == '' || email == '' || password == '') ? true : false} onPress={signupUser} style={styles.submitButton}>
    //         {
    //           loading ? <ActivityIndicator color={color.white} />
    //             : <Text style={styles.submitButtonText}>Sign Up</Text>
    //         }
    //       </TouchableOpacity>
    //     </View>
    //   </Pressable>
    //   <Text style={styles.lastText}>Already have an account? <TouchableOpacity onPress={() => navigation.navigate('Signin')}><Text style={styles.lastTextButtonText}>Sign In</Text></TouchableOpacity></Text>
    // </KeyboardAvoidingView>
  )
}

export default Signup