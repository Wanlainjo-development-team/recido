import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CreateInvoice from './screens/createInvoice'
import Preview from './screens/preview'

import Header from '../../components/Header'
import color from '../../style/color'
import { useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setInvoiceContact, setNote, setOrder, updateItems } from '../../features/useFormSlice'
import { setDate } from '../../features/useFormSlice'


const { Navigator, Screen } = createMaterialTopTabNavigator()

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
        tabBarPosition='bottom'
        screenOptions={{
          tabBarStyle: {
            backgroundColor: color.mainBackground,
            elevation: 0
          }
        }}>
        <Screen name='CreateNewInvoice' component={CreateInvoice} options={{ title: 'Create' }} />
        <Screen name='PreviewNewInvoice' component={Preview} options={{ title: 'Preview' }} />
      </Navigator>
    </View>
  )
}

export default Create