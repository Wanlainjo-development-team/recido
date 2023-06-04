import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import color from '../style/color'
import Home from '../screens/home'
import History from '../screens/history'

import { Feather, Ionicons, Octicons, FontAwesome5 } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { setActiveRoute } from '../features/userSlice'
import Invoice from '../screens/invoices'

const { Navigator, Screen } = createMaterialBottomTabNavigator()

const BottomNavigation = () => {
  const dispatch = useDispatch()

  return (
    <Navigator
      barStyle={[
        { backgroundColor: color.mainBackground }
      ]}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => <Feather name="home" size={24} color={color.accent} />,
          title: 'Home'
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.jumpTo('Home')
            dispatch(setActiveRoute('Home'))
          }
        })}
      />
      <Screen
        name="Invoices"
        component={Invoice}
        options={{
          tabBarIcon: () => <FontAwesome5 name="file-invoice-dollar" size={24} color={color.accent} />,
          title: 'Invoices'
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.jumpTo('Invoices')
            dispatch(setActiveRoute('Invoices'))
          }
        })}
      />
    </Navigator>
  )
}

export default BottomNavigation