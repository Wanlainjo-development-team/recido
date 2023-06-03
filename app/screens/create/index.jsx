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
import { EvilIcons } from '@expo/vector-icons';


const { Navigator, Screen } = createMaterialBottomTabNavigator()

const Create = () => {
  const { viewInvoice } = useRoute().params
  const dispatch = useDispatch()

  if (viewInvoice == undefined || viewInvoice == null || viewInvoice == '') return

  dispatch(setOrder(viewInvoice?.order))
  dispatch(setDate(viewInvoice?.date))
  dispatch(updateItems(viewInvoice?.items))
  dispatch(setInvoiceContact(viewInvoice?.invoiceContact))
  dispatch(setNote(viewInvoice?.note))

  return (
    <View style={{ flex: 1, backgroundColor: color.mainBackground }}>
      <Header screen='createInvoice' />
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
        barStyle={[
          { backgroundColor: color.mainBackground }
        ]}
      >
        <Screen
          name='CreateNewInvoice'
          component={CreateInvoice}
          options={{
            title: 'Invoice',
            tabBarIcon: () => <EvilIcons name="pencil" size={26} color="black" />,
          }}
        />
        <Screen
          name='PreviewNewInvoice'
          component={Preview}
          options={{
            title: 'Preview',
            tabBarIcon: () => <EvilIcons name="eye" size={26} color="black" />,
          }}
        />
      </Navigator>
    </View>
  )
}

export default Create