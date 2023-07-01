import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef } from 'react'

import Header from '../../../../components/Header'
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import color from '../../../../style/color';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../hooks/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import uuid from 'uuid-random'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { setSetup } from '../../../../features/userSlice';
import app from '../../../../style/app'
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const BussinessDetails = () => {
  const storage = getStorage()
  const { navigate } = useNavigation()

  const dispatch = useDispatch()

  const { profile } = useSelector(state => state.user)

  const [image, setImage] = useState(profile?.photoURL == undefined ? null : profile?.photoURL)
  const [loading, setLoading] = useState(false)
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [newProfile, setNewProfile] = useState({
    ...profile,
    disclaimer: profile?.disclaimer ? profile?.disclaimer : 'All products are tested and trusted in good working condition. No returns. Products can only be exchanged with the same cash value. All sales are final.'
  })

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const pickImage = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user?.uid

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let image = result.assets[0].uri
      // setImage(result.assets[0].uri);
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
                })
                dispatch(setSetup(false))
                await schedulePushNotification('Profile update', 'Bussiness logo successfully uploaded 🎉🎉')
                // Alert.alert('Bussiness profile successfully uploaded')
              })
          })
      }

      if (profile?.photoURL == undefined) {
        uploadProfile()
      } else {
        const desertRef = ref(storage, profile?.photoLink)

        deleteObject(desertRef).then(() => uploadProfile())
      }
    }
  };

  const saveSettings = async () => {
    setLoading(true)

    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user?.uid

    await updateDoc(doc(db, 'users', id), {
      setup: true,
      ...newProfile
    })

    dispatch(setSetup(false))

    setLoading(false)

    await schedulePushNotification('Profile update', 'Bussiness details successfully uploaded 🎉🎉')
  }

  return (
    <View style={{ ...styles.container, paddingHorizontal: 0 }}>
      <Header title='Bussiness details' />

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileImageView}>
            <TouchableOpacity onPress={pickImage} style={styles.profileImage}>
              {
                !image ?
                  <Feather name="image" size={24} color="black" /> :
                  <Image source={{ uri: profile?.photoURL == undefined ? null : profile?.photoURL }} style={{ width: 150, height: 150 }} />
              }
            </TouchableOpacity>
          </View>

          <Text style={{ ...styles.title, marginTop: 50 }}>Bussiness Information</Text>
          <View style={{ ...app.inputView, marginTop: 20 }}>
            <Text style={app.inputText}>Business name</Text>
            <TextInput
              style={app.input}
              value={newProfile?.name}
              onChangeText={(text) => {
                setNewProfile({
                  ...newProfile,
                  name: text
                })
              }}
              placeholder='Business name' />
          </View>
          <View style={{ ...app.inputView }}>
            <Text style={app.inputText}>Business owner's name</Text>
            <TextInput
              style={app.input}
              value={newProfile?.ownerName}
              onChangeText={(text) => {
                setNewProfile({
                  ...newProfile,
                  ownerName: text
                })
              }}
              placeholder="Business owner's name" />
          </View>
          <View style={{ ...app.inputView }}>
            <Text style={app.inputText}>Business number</Text>
            <TextInput
              style={app.input}
              value={newProfile?.bussinessNumer}
              onChangeText={(text) => {
                setNewProfile({
                  ...newProfile,
                  bussinessNumer: text
                })
              }}
              placeholder="Business number" />
          </View>
          <View style={{ ...app.inputView }}>
            <Text style={app.inputText}>Currency denomination</Text>
            <TouchableOpacity onPress={() => navigate('Currency')} style={{ ...app.input, justifyContent: 'center' }}>
              <Text>
                {
                  profile?.denom ? `${profile?.denom?.country} -- ${profile?.denom?.denomination}(${profile?.denom?.sign})` : 'Currency'
                }
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={{ ...styles.title, marginTop: 30 }}>Bussiness address</Text>
          <View style={{ ...app.inputView, marginTop: 20 }}>
            <Text style={app.inputText}>Business address 1</Text>
            <TextInput
              style={app.input}
              value={newProfile?.address}
              onChangeText={(text) => {
                setNewProfile({
                  ...newProfile,
                  address: text
                })
              }}
              placeholder='Business address 1'
            />
          </View>
          <View style={app.inputView}>
            <Text style={app.inputText}>Business address 2</Text>
            <TextInput
              style={app.input}
              value={newProfile?.address2}
              onChangeText={(text) => {
                setNewProfile({
                  ...newProfile,
                  address2: text
                })
              }}
              placeholder='Business address 2'
            />
          </View>
          <View style={app.inputView}>
            <Text style={app.inputText}>Business address 3</Text>
            <TextInput
              style={app.input}
              value={newProfile?.address3}
              onChangeText={(text) => {
                setNewProfile({
                  ...newProfile,
                  address3: text
                })
              }}
              placeholder='Business address 3'
            />
          </View>


          <Text style={{ ...styles.title, marginTop: 30 }}>Bussiness contact</Text>
          <View style={{ ...app.inputView, marginTop: 20 }}>
            <Text style={app.inputText}>Business email</Text>
            <TextInput style={app.input} editable={false} value={newProfile?.email} placeholder='Business email' />
          </View>
          <View style={app.inputView}>
            <Text style={app.inputText}>Business contact</Text>
            <TextInput
              style={app.input}
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
          <View style={app.inputView}>
            <Text style={app.inputText}>Business Sales Rep</Text>
            <TextInput
              style={app.input}
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

          <TouchableOpacity onPress={saveSettings} style={styles.saveButton}>
            {
              loading ?
                <ActivityIndicator color={color.accent} size='small' /> :
                <Text style={styles.saveButtonText}>Save Bussiness details</Text>
            }
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

async function schedulePushNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default BussinessDetails