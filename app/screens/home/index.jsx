import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import style from './style'

import { Feather } from '@expo/vector-icons';
import color from '../../style/color';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const { navigate } = useNavigation()
  return (
    <View style={style.container}>
      <Text>Home</Text>

      <TouchableOpacity onPress={() => navigate('Create')} style={style.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default Home