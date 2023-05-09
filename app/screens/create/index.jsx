import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CreateInvoice from './screens/createInvoice'
import Preview from './screens/preview'


const { Navigator, Screen } = createMaterialTopTabNavigator()

const Create = () => {
  return (
    <Navigator>
      <Screen name='CreateNewInvoice' component={CreateInvoice} options={{ title: 'Create' }} />
      <Screen name='PreviewNewInvoice' component={Preview} options={{ title: 'Preview' }} />
    </Navigator>
  )
}

export default Create