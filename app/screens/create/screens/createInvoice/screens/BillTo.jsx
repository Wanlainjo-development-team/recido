import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { billTo } from './styles'
import { useNavigation } from '@react-navigation/native'

import { AntDesign } from '@expo/vector-icons';
import color from '../../../../../style/color';
import * as Contacts from 'expo-contacts'
import app from '../../../../../style/app';

const BillTo = () => {
  const { goBack, navigate } = useNavigation()

  const openContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();

      if (data.length > 0) {
        const contact = data;

        navigate('Contacts', { allContact: contact, directSave: false })
      }
    }
  }

  return (
    <View style={billTo.container}>
      <View style={billTo.head}>
        <View />
        <Text style={app.title1}>👨‍🦱 Add customer</Text>
        <TouchableOpacity onPress={goBack}>
          <Text style={billTo.headText}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <TouchableOpacity onPress={() => navigate('AddNewCustomer', { directSave: false })} style={billTo.group}>
          <AntDesign name="pluscircleo" size={22} color={color.accent} />
          <Text style={billTo.groupText}>Add new customer</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openContact} style={billTo.group}>
          <AntDesign name="contacts" size={22} color={color.accent} />
          <Text style={billTo.groupText}>Import from your contact</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default BillTo