import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import Header from '../../components/Header';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import color from '../../style/color';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuth, setTheme, setUser } from '../../features/userSlice';
import AutoHeightImage from 'react-native-auto-height-image';
const appJson = require('../../../app.json');

import light from '../../../assets/images/light.jpg'
import dark from '../../../assets/images/dark.jpg'

const { width } = Dimensions.get('window')

const version = appJson.expo.version;

import app from '../../style/app'

import * as NavigationBar from 'expo-navigation-bar';

const Settings = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const { theme } = useSelector(state => state.user)

  const logoutUser = async () => {
    await AsyncStorage.removeItem('recido_user')
    dispatch(setAuth(null))
    dispatch(setUser(null))
  }

  const setAppTheme = async (theme) => {
    try {
      let value = await AsyncStorage.getItem('receido_theme')

      if (value !== null) {
        if (theme == true) {
          dispatch(setTheme(true))
          await AsyncStorage.setItem('receido_theme', JSON.stringify(true))

          if (Platform.OS == 'ios') return
          NavigationBar.setBackgroundColorAsync(color.dark)
          NavigationBar.setButtonStyleAsync('light')
        } else {
          dispatch(setTheme(false))
          await AsyncStorage.setItem('receido_theme', JSON.stringify(false))

          if (Platform.OS == 'ios') return
          NavigationBar.setBackgroundColorAsync(color.mainBackground)
          NavigationBar.setButtonStyleAsync('dark')
        }
      } else {
        dispatch(setTheme(false))
        await AsyncStorage.setItem('receido_theme', JSON.stringify(false))

        if (Platform.OS == 'ios') return
        NavigationBar.setBackgroundColorAsync(color.mainBackground)
        NavigationBar.setButtonStyleAsync('dark')
      }
    }
    catch (e) { }
  }

  return (
    <View style={{ ...style.container, paddingHorizontal: 0, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <Header title='Account settings' />
      <ScrollView style={{ ...style.container, backgroundColor: theme ? color.dark : color.mainBackground }} showsVerticalScrollIndicator={false}>
        <View style={{ ...style.group, marginTop: 50 }}>
          <Text style={{ ...app.title2, marginBottom: 20, color: theme ? color.white : color.dark }}>Theme</Text>

          <View style={{ ...style.themeView, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <TouchableOpacity onPress={() => setAppTheme(false)} style={{ ...style.theme, borderWidth: 1, borderColor: theme ? `${color.mainBackground}30` : `${color.dark}30` }}>
              <AutoHeightImage source={light} width={(width / 2) - 20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAppTheme(true)} style={{ ...style.theme, borderWidth: 1, borderColor: theme ? `${color.mainBackground}30` : `${color.dark}30` }}>
              <AutoHeightImage source={dark} width={(width / 2) - 20} />
            </TouchableOpacity>
          </View>


          <Text style={{ ...app.title2, marginTop: 50, marginBottom: 20, color: theme ? color.white : color.dark }}>Invoice</Text>

          <TouchableOpacity onPress={() => navigate('BussinessDetails')} style={style.actionButton}>
            <Text style={{ ...style.actionButtonTitle, color: theme ? color.white : color.dark }}>Business details</Text>
            <Text style={{ ...style.actionButtonSubTitle, color: theme ? color.white : color.dark }}>Logo, name, contact information</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Templates')} style={style.actionButton}>
            <Text style={{ ...style.actionButtonTitle, color: theme ? color.white : color.dark }}>Template</Text>
            <Text style={{ ...style.actionButtonSubTitle, color: theme ? color.white : color.dark }}>Select your prefared invoice design</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Tax')} style={style.actionButton}>
            <Text style={{ ...style.actionButtonTitle, color: theme ? color.white : color.dark }}>Tax</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('DefaultNotes')} style={style.actionButton}>
            <Text style={{ ...style.actionButtonTitle, color: theme ? color.white : color.dark }}>Default notes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Customize')} style={style.actionButton}>
            <Text style={{ ...style.actionButtonTitle, color: theme ? color.white : color.dark }}>Customize</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('DefaultEmailMessage')} style={style.actionButton}>
            <Text style={{ ...style.actionButtonTitle, color: theme ? color.white : color.dark }}>Default Email message</Text>
          </TouchableOpacity>
        </View>

        <View style={{ ...style.group }}>
          <Text style={{ ...app.title2, marginTop: 50, marginBottom: 20, color: theme ? color.white : color.dark }}>Information</Text>

          <TouchableOpacity onPress={() => navigate('About')} style={style.actionButton}>
            <Text style={{ ...style.actionButtonTitle, color: theme ? color.white : color.dark }}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('TermsOfUse')} style={style.actionButton}>
            <Text style={{ ...style.actionButtonTitle, color: theme ? color.white : color.dark }}>Terms of use</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('PrivacyPolicy')} style={style.actionButton}>
            <Text style={{ ...style.actionButtonTitle, color: theme ? color.white : color.dark }}>Privacy policy</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={logoutUser} style={style.logoutButton}>
          <SimpleLineIcons name="logout" size={20} color={color.red} style={{ marginRight: 15 }} />
          <Text style={style.logoutButtonText}>Log out</Text>
        </TouchableOpacity>

        <View style={style.versionView}>
          <Text style={{ ...style.versionAppName, color: theme ? color.white : color.dark }}>Recido</Text>
          <Text style={{ color: theme ? color.white : color.dark }}>Version - {version}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Settings