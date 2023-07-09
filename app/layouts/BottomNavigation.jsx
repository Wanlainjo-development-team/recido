import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import color from '../style/color';
import Home from '../screens/home';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveRoute } from '../features/userSlice';
import Invoice from '../screens/invoices';
import CustomersScreen from '../screens/customer';
import InventoryScreen from '../screens/inventory';
import * as NavigationBar from 'expo-navigation-bar';

const { Navigator, Screen } = createMaterialBottomTabNavigator()

const BottomNavigation = () => {
  const dispatch = useDispatch()

  const { theme } = useSelector(state => state.user)

  useEffect(() => {
    (() => {
      if (Platform.OS == 'ios') return
      NavigationBar.setBackgroundColorAsync(theme ? color.dark : color.mainBackground)
      NavigationBar.setButtonStyleAsync(theme ? 'light' : 'dark')
    })()
  }, [])

  return (
    <Navigator
      barStyle={{
        backgroundColor: theme ? color.dark : color.mainBackground,
        borderTopWidth: 1,
        borderTopColor: theme ? `${color.white}10` : `${color.accent}30`
      }}
      activeColor={color.accent}
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