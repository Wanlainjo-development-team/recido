import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'

import Header from '../../../../components/Header'
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const BussinessDetails = () => {
  const { profile } = useSelector(state => state.user)

  const [image, setImage] = useState(profile?.photoURL == undefined ? null : profile?.photoURL)

  const [newProfile, setNewProfile] = useState({
    name: profile?.name,
    address: profile?.address,
    email: profile?.email,
    contact: profile?.contact,
    salesRep: profile?.salesRep,
    disclaimer: profile?.disclaimer ? profile?.disclaimer : 'All products are tested and trusted in good working condition. No returns. Products can only be exchanged with the same cash value. All sales are final.'
  })

  const pickImage = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }
  };

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
                  <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
              }
            </TouchableOpacity>
          </View>

          <View style={{ ...styles.inputView, marginTop: 30 }}>
            <Text style={styles.inputText}>Business name</Text>
            <TextInput
              style={styles.input}
              value={newProfile?.name}
              onChangeText={(text) => {
                setNewProfile({
                  ...newProfile,
                  name: text
                })
              }}
              placeholder='Business name' />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputText}>Business address</Text>
            <TextInput
              style={styles.input}
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
          <View style={styles.inputView}>
            <Text style={styles.inputText}>Business email</Text>
            <TextInput style={styles.input} editable={false} value={newProfile?.email} placeholder='Business email' />
          </View>
          <View style={styles.inputView}>
            <Text style={styles.inputText}>Business contact</Text>
            <TextInput
              style={styles.input}
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
          <View style={styles.inputView}>
            <Text style={styles.inputText}>Business Sales Rep</Text>
            <TextInput
              style={styles.input}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default BussinessDetails