import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import color from '../style/color'
import Home from '../screens/home'

import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { setActiveRoute } from '../features/userSlice'
import Invoice from '../screens/invoices'
import CustomersScreen from '../screens/customer'
import InventoryScreen from '../screens/inventory'

const { Navigator, Screen } = createMaterialBottomTabNavigator()

import * as NavigationBar from 'expo-navigation-bar'
import { useEffect } from 'react'

const BottomNavigation = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    (() => {
      NavigationBar.setBackgroundColorAsync(color.mainBackground)
      NavigationBar.setButtonStyleAsync('dark')
    })()
  }, [])

  return (
    <Navigator
      barStyle={{ backgroundColor: color.mainBackground, borderTopWidth: 1, borderTopColor: `${color.accent}30` }}
      activeColor={color.accent}
      inactiveColor={`${color.black}40`}
      shifting={true}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
          tabBarActiveTintColor: color.accent,
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
          tabBarIcon: ({ color }) => <FontAwesome5 name="file-invoice-dollar" size={24} color={color} />,
          tabBarActiveTintColor: color.accent,
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
      <Screen
        name="Customers"
        component={CustomersScreen}
        options={{
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />,
          tabBarActiveTintColor: color.accent,
          title: 'Customers'
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.jumpTo('Customers')
            dispatch(setActiveRoute('Customers'))
          }
        })}
      />
      <Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="storefront" size={24} color={color} />,
          tabBarActiveTintColor: color.accent,
          title: 'Inventory'
        }}
        listeners={({ navigation }) => ({
          tabPress: e => {
            e.preventDefault()
            navigation.jumpTo('Inventory')
            dispatch(setActiveRoute('Inventory'))
          }
        })}
      />
    </Navigator>
  )
}

export default BottomNavigation