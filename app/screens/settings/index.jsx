import { View, Text } from 'react-native'
import React from 'react'
import style from './style'
import Header from '../../components/Header'

const Settings = () => {
  return (
    <View style={style.container}>
      <Header />
      <Text>Settings</Text>
    </View>
  )
}

export default Settings