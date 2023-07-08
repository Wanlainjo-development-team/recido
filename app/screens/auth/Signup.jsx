import { TouchableWithoutFeedback, View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Alert, Platform, Image, FlatList, Modal, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'

import { Feather } from '@expo/vector-icons'
import color from '../../style/color'
import { useNavigation } from '@react-navigation/native'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../hooks/firebase'
import { useDispatch } from 'react-redux'

import { setProfile, setSetup, setUser } from '../../features/userSlice'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { BlurView } from 'expo-blur'

const { width } = Dimensions.get('screen')
import { LinearGradient } from 'expo-linear-gradient'

import * as ImagePicker from 'expo-image-picker'

import uuid from 'uuid-random'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import app from '../../style/app'

import allCurrencies from '../../components/fragments/currency'

import * as NavigationBar from 'expo-navigation-bar'


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
    password: '',
    image: null
  })
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    (() => {
      if (Platform.OS == 'ios') return
      NavigationBar.setBackgroundColorAsync(color.dark)
      NavigationBar.setButtonStyleAsync('light')
    })()
  }, [])

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
      Alert.alert('Please choose your business logo')
      return
    }
    if (form.name == '') {
      Alert.alert('Please enter a business name')
      return
    }
    if (form.bussinessNumer == '') {
      Alert.alert('Please enter a business phone number')
      return
    }
    if (form.address == '') {
      Alert.alert('Please enter your business address')
      return
    }
    if (form.denom == undefined) {
      Alert.alert('Please select your preferred currency')
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
                    denom: form.denom,
                    disclaimer: 'All products are tested and trusted in good working condition. No returns.\nProducts can only be exchanged with the same cash value. All sales are final.',
                    defaultEmailMessage: 'Thank you for your business',
                    tries: 25,
                    invoice: 1,
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

                  let profile = await (await getDoc(doc(db, 'users', id))).data()

                  dispatch(setProfile(profile))
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <BlurView intensity={50} tint='dark' style={styles.modalContainer}>
            <View style={styles.head}>
              <Text style={{ ...app.title1, color: color.mainBackground, opacity: 1 }}>Select your country</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.headText}>Done</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={allCurrencies}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setForm({ ...form, denom: item })
                    setModalVisible(false)
                  }}
                  style={styles.group}
                >
                  <Text style={{ ...styles.groupText, textAlign: 'left' }}>{item.country}</Text>
                  <Text style={styles.groupText}>{item.denomination}</Text>
                  <Text style={styles.groupText}>{item.sign}</Text>
                </TouchableOpacity>
              )}
            />
          </BlurView>
        </Modal>


        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={{ flex: 1, width: width - 40 }} showsVerticalScrollIndicator={false}>

              <View style={styles.contentView}>
                <Text style={styles.appName}>Sign up</Text>

                <TouchableOpacity onPress={pickImage} style={styles.logoButton}>
                  {
                    form.image ? <Image source={{ uri: form.image }} style={{ width: 150, height: 150, borderRadius: 100 }} /> :
                      <Text style={{ color: color.mainBackground }}>Set business logo</Text>
                  }
                </TouchableOpacity>

                <View style={styles.inputView}>
                  <TextInput value={form.name} onChangeText={name => setForm({ ...form, name })} style={styles.input} placeholder='Business name' placeholderTextColor={color.mainBackground} />
                </View>
                <View style={styles.inputView}>
                  <TextInput value={form.bussinessNumer} onChangeText={bussinessNumer => setForm({ ...form, bussinessNumer })} keyboardType='phone-pad' style={styles.input} placeholder='Office phone' placeholderTextColor={color.mainBackground} />
                </View>
                <View style={styles.inputView}>
                  <TextInput value={form.address} onChangeText={address => setForm({ ...form, address })} style={styles.input} placeholder='Business address' placeholderTextColor={color.mainBackground} />
                </View>
                <View style={styles.inputView}>
                  <TouchableOpacity onPress={() => setModalVisible(true)} style={{ ...styles.input, justifyContent: 'center' }}>
                    <Text style={{ color: color.mainBackground }}>
                      {form.denom ? `${form.denom.country}, ${form.denom.denomination}(${form.denom.sign})` : 'Currency'}
                    </Text>
                  </TouchableOpacity>
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
  )
}

export default Signup