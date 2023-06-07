import { View, ScrollView } from 'react-native'
import React from 'react'
import style from './style'

import { useNavigation } from '@react-navigation/native';
import PerformanceChart from '../../components/performanceChart';
import Invoices from '../../components/invoices';

const Home = () => {
  return (
    <View style={style.container}>
      <PerformanceChart />
      <Invoices numOfClice={25} />
    </View>
  )
}

export default Home