import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../components/Header';
import style from './style';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import color from '../../style/color';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuth, setUser } from '../../features/userSlice';
const appJson = require('../../../app.json');

const version = appJson.expo.version;

const Settings = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const logoutUser = async () => {
    await AsyncStorage.removeItem('recido_user')
    dispatch(setAuth(null))
    dispatch(setUser(null))
  }

  return (
    <View style={{ ...style.container, paddingHorizontal: 0 }}>
      <Header title='Account settings' />
      <ScrollView style={style.container}>
        <View style={{ ...style.group, marginTop: 50 }}>
          <Text style={style.title}>Invoice</Text>

          <TouchableOpacity onPress={() => navigate('BussinessDetails')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Business details</Text>
            <Text style={style.actionButtonSubTitle}>Logo, name, contact information</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Templates')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Template</Text>
            <Text style={style.actionButtonSubTitle}>Select your prefared invoice design</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Tax')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Tax</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('DefaultNotes')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Default notes</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Customize')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Customize</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('DefaultEmailMessage')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Default Email message</Text>
          </TouchableOpacity>
        </View>

        <View style={{ ...style.group, marginTop: 50 }}>
          <Text style={style.title}>Information</Text>

          <TouchableOpacity onPress={() => navigate('About')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('TermsOfUse')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Terms of use</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('PrivacyPolicy')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Privacy policy</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={logoutUser} style={style.logoutButton}>
          <SimpleLineIcons name="logout" size={20} color={color.red} style={{ marginRight: 15 }} />
          <Text style={style.logoutButtonText}>Log out</Text>
        </TouchableOpacity>

        <View style={style.versionView}>
          <Text style={style.versionAppName}>Recido</Text>
          <Text>Version - {version}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default Settings