import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CreateInvoice from './screens/createInvoice'
import Preview from './screens/preview'

import Header from '../../components/Header'
import color from '../../style/color'


const { Navigator, Screen } = createMaterialTopTabNavigator()

const Create = () => {
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