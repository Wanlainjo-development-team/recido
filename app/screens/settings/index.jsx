import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import style from './style'
import Header from '../../components/Header'

import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const Settings = () => {
  const { profile } = useSelector(state => state.user)

  const [newProfile, setNewProfile] = useState({
    name: profile?.name,
    email: profile?.email
  })

  return (
    <KeyboardAvoidingView style={style.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={style.profileImageView}>
            <TouchableOpacity style={style.profileImage}>
              <Feather name="image" size={24} color="black" />
            </TouchableOpacity>
            <Text>Add Logo</Text>
          </View>

          <View style={style.formView}>
            <View style={style.inputView}>
              <Text style={style.inputText}>Please enter a business name</Text>
              <TextInput style={style.input} value={newProfile?.name} placeholder='Business name' />
            </View>
            <View style={style.inputView}>
              <Text style={style.inputText}>Your business email</Text>
              <TextInput style={style.input} editable={false} value={newProfile?.email} placeholder='Business name' />
            </View>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Settings