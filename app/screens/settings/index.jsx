import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import style from './style'
import Header from '../../components/Header'

import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native';
import color from '../../style/color';
import templatesPreview from '../../components/fragments/templatesPreview';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image'
import { imageWidth } from '../selectTemplate/style';
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'uuid-random'
import { setSetup } from '../../features/userSlice'

import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../hooks/firebase';
import { Alert } from 'react-native';
import { useLayoutEffect } from 'react';
import { setSelectedTemplatePreview } from '../../features/useFormSlice';

const Settings = () => {
  const { profile } = useSelector(state => state.user)
  const { selectedTemplatePreview } = useSelector(state => state.form)

  const navigation = useNavigation()

  const storage = getStorage()

  const dispatch = useDispatch()

  const [image, setImage] = useState(profile?.photoURL == undefined ? null : profile?.photoURL)
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const [newProfile, setNewProfile] = useState({
    name: profile?.name,
    address: profile?.address,
    email: profile?.email,
    contact: profile?.contact,
    salesRep: profile?.salesRep,
    disclaimer: profile?.disclaimer ? profile?.disclaimer : 'All products are tested and trusted in good working condition. No returns. Products can only be exchanged with the same cash value. All sales are final.'
  })

  useLayoutEffect(() => {
    dispatch(setSelectedTemplatePreview(profile?.selectedTemplatePreview))
  }, [profile])

  const handleContentSizeChange = ({ nativeEvent: { contentSize } }) => {
    setInputValue(contentSize.height);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveSettings = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    setLoading(true)

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = () => resolve(xhr.response)

      xhr.responseType = 'blob'
      xhr.open('GET', image, true)
      xhr.send(null)
    })

    const link = `logos/${id}/${uuid()}`
    const photoRef = ref(storage, link)

    const uploadProfile = () => {
      uploadBytes(photoRef, blob)
        .then(snapshot => {
          getDownloadURL(snapshot?.ref)
            .then(async downloadURL => {
              await updateDoc(doc(db, 'users', id), {
                photoURL: downloadURL,
                photoLink: link,
                setup: true,
                selectedTemplatePreview,
                ...newProfile
              })
              setLoading(false)
              dispatch(setSetup(false))
              Alert.alert('Bussiness profile successfully uploaded')
              navigation.goBack()
            }).catch((e) => setLoading(false))
        })
    }

    if (profile.photoURL == undefined) {
      uploadProfile()
    } else {
      const desertRef = ref(storage, profile?.photoLink)

      deleteObject(desertRef).then(() => uploadProfile())
    }
  }

  return (
    <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={style.profileImageView}>
              <TouchableOpacity onPress={pickImage} style={style.profileImage}>
                {
                  !image ?
                    <Feather name="image" size={24} color="black" /> :
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
              </TouchableOpacity>
              <Text>Add Logo</Text>
            </View>

            <View style={style.formView}>
              <View style={style.inputView}>
                <Text style={style.inputText}>Please enter a business name</Text>
                <TextInput
                  style={style.input}
                  value={newProfile?.name}
                  onChangeText={(text) => {
                    setNewProfile({
                      ...newProfile,
                      name: text
                    })
                  }}
                  placeholder='Business name' />
              </View>
              <View style={style.inputView}>
                <Text style={style.inputText}>Please enter a business address</Text>
                <TextInput
                  style={style.input}
                  value={newProfile?.address}
                  onChangeText={(text) => {
                    setNewProfile({
                      ...newProfile,
                      address: text
                    })
                  }}
                  placeholder='Business address'
                />
              </View>
              <View style={style.inputView}>
                <Text style={style.inputText}>Your business email</Text>
                <TextInput style={style.input} editable={false} value={newProfile?.email} placeholder='Business email' />
              </View>
              <View style={style.inputView}>
                <Text style={style.inputText}>Your business contact</Text>
                <TextInput
                  style={style.input}
                  value={newProfile?.contact}
                  onChangeText={(text) => {
                    setNewProfile({
                      ...newProfile,
                      contact: text
                    })
                  }}
                  placeholder='Business contact'
                />
              </View>
              <View style={style.inputView}>
                <Text style={style.inputText}>Your business Sales Rep</Text>
                <TextInput
                  style={style.input}
                  value={newProfile?.salesRep}
                  onChangeText={(text) => {
                    setNewProfile({
                      ...newProfile,
                      salesRep: text
                    })
                  }}
                  placeholder='Sales Rep'
                />
              </View>
              <View style={style.inputView}>
                <Text style={style.inputText}>Disclaimer</Text>
                <TextInput
                  style={{ ...style.input, paddingVertical: 10, height: 100 }}
                  value={newProfile?.disclaimer}
                  onChangeText={(text) => {
                    setNewProfile({
                      ...newProfile,
                      disclaimer: text
                    })
                  }}
                  placeholder='Disclaimer'
                  multiline
                  onContentSizeChange={handleContentSizeChange}
                />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('SelectTemplate', { templatesPreview })} style={style.invoicePlaceholderButton}>
                {
                  !selectedTemplatePreview ?
                    <Text style={style.invoicePlaceholderButtonText}>Select invoice template</Text> :
                    <AutoHeightImage
                      width={imageWidth}
                      source={{ uri: selectedTemplatePreview?.preview }}
                    />
                }
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={saveSettings} style={style.saveButton}>
            {
              loading ?
                <ActivityIndicator size='small' color={color.white} /> :
                <Text style={style.saveButtonText}>Save Settings</Text>
            }
          </TouchableOpacity>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Settings