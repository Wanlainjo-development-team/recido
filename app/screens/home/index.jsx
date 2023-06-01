import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import style from './style'

import { Feather } from '@expo/vector-icons';
import color from '../../style/color';
import { useNavigation } from '@react-navigation/native';
import PerformanceChart from '../../components/performanceChart';
import Invoices from '../../components/invoices';

const Home = () => {
  const { navigate } = useNavigation()
  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PerformanceChart />
        <Invoices />
      </ScrollView>

      <TouchableOpacity onPress={() => navigate('Create')} style={style.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default Home