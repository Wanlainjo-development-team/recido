import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const { Navigator, Screen } = createMaterialTopTabNavigator()

import Template from './screens/Templates'
import Style from './screens/Style'
import color from '../../../../style/color'

const Templates = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header title='Templates' />

      <Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: color.transparent,
            elevation: 0
          }
        }}
      >
        <Screen name="Template" component={Template} />
        <Screen name="Style" component={Style} />
      </Navigator>
    </View>
  )
}

export default Templates