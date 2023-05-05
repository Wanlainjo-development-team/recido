import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import style from './style'
import Header from '../../components/Header'

import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
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

const Settings = () => {
  const { profile } = useSelector(state => state.user)
  const { selectedTemplatePreview } = useSelector(state => state.form)

  const navigation = useNavigation()

  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const [newProfile, setNewProfile] = useState({
    name: profile?.name,
    address: profile?.address,
    email: profile?.email,
    contact: profile?.contact,
    salesRep: profile?.salesRep
  })

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

  const saveSettings = () => { }

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
                <TextInput style={style.input} value={newProfile?.name} placeholder='Business name' />
              </View>
              <View style={style.inputView}>
                <Text style={style.inputText}>Please enter a business address</Text>
                <TextInput style={style.input} value={newProfile?.address} placeholder='Business address' />
              </View>
              <View style={style.inputView}>
                <Text style={style.inputText}>Your business email</Text>
                <TextInput style={style.input} editable={false} value={newProfile?.email} placeholder='Business email' />
              </View>
              <View style={style.inputView}>
                <Text style={style.inputText}>Your business contact</Text>
                <TextInput style={style.input} editable={false} value={newProfile?.contact} placeholder='Business contact' />
              </View>
              <View style={style.inputView}>
                <Text style={style.inputText}>Your business Sales Rep</Text>
                <TextInput style={style.input} editable={false} value={newProfile?.salesRep} placeholder='Sales Rep' />
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