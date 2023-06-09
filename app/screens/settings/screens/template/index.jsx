import { View } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const { Navigator, Screen } = createMaterialTopTabNavigator()

import Template from './screens/Templates'
import CustomStyle from './screens/CustomStyle'
import color from '../../../../style/color'
import { useSelector } from 'react-redux'

const Templates = () => {
  const { theme } = useSelector(state => state.user)

  return (
    <View style={{ flex: 1, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <Header title='Templates' />

      <Navigator
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor: color.transparent,
            elevation: 0
          },
          tabBarLabelStyle: {
            color: theme ? color.white : color.dark
          }
        }}
      >
        <Screen name="Template" component={Template} />
        <Screen name="Style" component={CustomStyle} />
      </Navigator>
    </View>
  )
}

export default Templates