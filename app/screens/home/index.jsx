import { View, ScrollView } from 'react-native'
import React from 'react'
import style from './style'

import { useNavigation } from '@react-navigation/native';
import PerformanceChart from '../../components/performanceChart';
import Invoices from '../../components/invoices';

const Home = () => {
  return (
    <View style={style.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PerformanceChart />
        <Invoices numOfClice={25} />
      </ScrollView>
    </View>
  )
}

export default Home