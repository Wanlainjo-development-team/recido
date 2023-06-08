import { View } from 'react-native'
import React from 'react'
import style from './style'

import PerformanceChart from '../../components/performanceChart';
import Invoices from '../../components/invoices';
import { useSelector } from 'react-redux';

const Home = () => {
  const { invoiceList } = useSelector(state => state.invoices)

  return (
    <View style={style.container}>
      <PerformanceChart />

      <Invoices numOfClice={25} fetchScale='all' showLabel={false} currentTab='home' />
    </View>
  )
}

export default Home