import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import CreateInvoice from './screens/createInvoice'
import Preview from './screens/preview'

import Header from '../../components/Header'
import color from '../../style/color'
import { useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setInvoiceContact, setNote, setOrder, updateItems } from '../../features/useFormSlice'
import { setDate } from '../../features/useFormSlice'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import Send from './screens/send'
import { setInvoiceId } from '../../features/invoicesSlice'


const { Navigator, Screen } = createMaterialBottomTabNavigator()

const Create = () => {
  const { viewInvoice } = useRoute().params
  const dispatch = useDispatch()

  if (viewInvoice) {
    dispatch(setOrder(viewInvoice?.order))
    dispatch(setDate(viewInvoice?.date))
    dispatch(updateItems(viewInvoice?.items))
    dispatch(setInvoiceContact(viewInvoice?.invoiceContact))
    dispatch(setNote(viewInvoice?.note))
    dispatch(setInvoiceId(viewInvoice?.id))
  }



  return (
    <View style={{ flex: 1, backgroundColor: color.mainBackground }}>
      <Header screen='createInvoice' />
      <Navigator
        barStyle={{ backgroundColor: color.mainBackground }}
        activeColor={color.accent}
        inactiveColor={`${color.black}40`}
        shifting={true}
      >
        <Screen
          name='CreateNewInvoice'
          component={CreateInvoice}
          options={{
            tabBarIcon: ({ color }) => <EvilIcons name="pencil" size={26} color={color} />,
            tabBarActiveTintColor: color.accent,
            title: 'Invoice'
          }}
        />
        <Screen
          name='PreviewNewInvoice'
          component={Preview}
          options={{
            tabBarIcon: ({ color }) => <EvilIcons name="eye" size={26} color={color} />,
            tabBarActiveTintColor: color.accent,
            title: 'Preview',
          }}
        />
        <Screen
          name='SendInvoice'
          component={Send}
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="paper-plane-outline" size={20} color={color} />,
            tabBarActiveTintColor: color.accent,
            title: 'Send',
          }}
        />
      </Navigator>
    </View>
  )
}

export default Create