import { View } from 'react-native'
import React, { useEffect } from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import CreateInvoice from './screens/createInvoice'
import Preview from './screens/preview'

import Header from '../../components/Header'
import color from '../../style/color'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceContact, setNote, setInvoiceId, updateItems } from '../../features/useFormSlice'
import { setDate } from '../../features/useFormSlice'
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import Send from './screens/send'
import { setCurrentInvoiceId } from '../../features/invoicesSlice'


const { Navigator, Screen } = createMaterialBottomTabNavigator()

const Create = () => {
  const { viewInvoice } = useRoute().params
  const dispatch = useDispatch()

  const { profile } = useSelector(state => state.user)

  useEffect(() => {
    (() => {
      if (viewInvoice) {
        dispatch(setInvoiceId(String(viewInvoice?.invoiceId).padStart(6, '0')))
        dispatch(setDate(viewInvoice?.date))
        dispatch(updateItems(viewInvoice?.items))
        dispatch(setInvoiceContact(viewInvoice?.invoiceContact))
        dispatch(setNote(viewInvoice?.note))
        dispatch(setCurrentInvoiceId(viewInvoice?.id))
      } else {
        // dispatch(setInvoiceId(String(profile?.invoice).padStart(6, '0')))
        // dispatch(setDate(`${new Date()}`))
        // dispatch(updateItems([]))
        // dispatch(setInvoiceContact(null))
        // dispatch(setNote(''))
        // dispatch(setCurrentInvoiceId(null))
      }
    })()
  }, [])



  return (
    <View style={{ flex: 1, backgroundColor: color.mainBackground }}>
      <Header screen='createInvoice' title='Create invoice' />
      <Navigator
        barStyle={{ backgroundColor: color.mainBackground }}
        activeColor={color.accent}
      >
        <Screen
          name='CreateNewInvoice'
          component={CreateInvoice}
          options={{
            tabBarIcon: ({ color }) => <EvilIcons name="pencil" size={26} color={color} />,
            tabBarActiveTintColor: color.accent,
            title: 'Invoice'
          }}
          initialParams={{
            currentInvoiceId: viewInvoice ? viewInvoice?.id : false
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
          initialParams={{
            currentInvoiceId: viewInvoice ? viewInvoice?.id : false
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
          initialParams={{
            currentInvoiceId: viewInvoice ? viewInvoice?.id : false
          }}
        />
      </Navigator>
    </View>
  )
}

export default Create