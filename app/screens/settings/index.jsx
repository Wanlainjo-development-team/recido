import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import style from './style'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons'
import color from '../../style/color'

const Settings = () => {
  const { navigate } = useNavigation()

  return (
    <View style={{ ...style.container, paddingHorizontal: 0 }}>
      <Header title='Account settings' />
      <ScrollView style={style.container}>
        <View style={{ ...style.group, marginTop: 50 }}>
          <Text style={style.title}>Invoice</Text>

          <TouchableOpacity onPress={() => navigate('BussinessDetails')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Bussiness details</Text>
            <Text style={style.actionButtonSubTitle}>Logo, name, contact information</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Templates')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Template</Text>
            <Text style={style.actionButtonSubTitle}>Select your prefared invoice design</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('Tax')} style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Tax</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Default notes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Invoice number</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Export as spreadsheet</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Customize</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Default Email message</Text>
          </TouchableOpacity>
        </View>

        <View style={{ ...style.group, marginTop: 50 }}>
          <Text style={style.title}>Information</Text>

          <TouchableOpacity style={style.actionButton}>
            <Text style={style.actionButtonTitle}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Terms of use</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.actionButton}>
            <Text style={style.actionButtonTitle}>Privacy policy</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={style.logoutButton}>
          <SimpleLineIcons name="logout" size={20} color={color.red} style={{ marginRight: 15 }} />
          <Text style={style.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default Settings