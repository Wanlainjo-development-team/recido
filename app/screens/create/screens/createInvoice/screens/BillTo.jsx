import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { billTo } from './styles'
import { useNavigation } from '@react-navigation/native'

import { AntDesign } from '@expo/vector-icons';
import color from '../../../../../style/color';
import * as Contacts from 'expo-contacts'
import app from '../../../../../style/app';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoiceContact } from '../../../../../features/useFormSlice';

const BillTo = () => {
  const { goBack, navigate } = useNavigation()
  const { customersList } = useSelector(state => state.customer)
  const { theme } = useSelector(state => state.user)

  const dispatch = useDispatch()

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
    <View style={{ ...billTo.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <View style={app.head}>
        <Text style={{ ...app.title1, color: theme ? color.white : color.dark }}>👨‍🦱 Add customer</Text>
        <TouchableOpacity onPress={goBack} style={app.doneButton}>
          <Text style={app.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 20 }}>
        {
          customersList?.length >= 1 &&
          <FlatList
            data={customersList}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ height: 50, flex: null }}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setInvoiceContact({ ...item }))
                  goBack()
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: `${color.accent}30`,
                  marginRight: 10,
                  borderRadius: 12,
                  paddingVertical: 10,
                  paddingHorizontal: 5
                }}
              >
                <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: `${color.accent}90` }}>
                  <Text style={{ color: color.white, fontWeight: '900', fontSize: 25 }}>{item?.name.charAt(0)}</Text>
                </View>
                <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', marginHorizontal: 10, color: color.accent }}>{item?.name}</Text>
              </TouchableOpacity>
            )}
          />
        }
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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