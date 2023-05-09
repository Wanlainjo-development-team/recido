import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import color from '../style/color'
import Home from '../screens/home'
import CreateInvoice from '../screens/createInvoice'
import History from '../screens/history'

import { Feather, Ionicons, Octicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { setActiveRoute } from '../features/userSlice'

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
        name="CreateInvoice"
        component={CreateInvoice}
        options={{
          tabBarIcon: () => <Ionicons name="create-outline" size={24} color={color.accent} />,
          title: 'Create'
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.navigate('Create')
            dispatch(setActiveRoute('CreateInvoice'))
          }
        })}
      />
      <Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: () => <Octicons name="history" size={24} color={color.accent} />,
          title: 'History'
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.jumpTo('History')
            dispatch(setActiveRoute('History'))
          }
        })}
      />
    </Navigator>
  )
}

export default BottomNavigation