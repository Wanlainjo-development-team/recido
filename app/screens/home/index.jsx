import { Text, View } from 'react-native'
import React from 'react'
import style from './style'

import PerformanceChart from '../../components/performanceChart';
import Invoices from '../../components/invoices';
import InventoryList from '../../components/inventory';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import Summary from '../../components/performanceChart/Summary';
import app from '../../style/app';

const Home = () => {
  const { invoiceList } = useSelector(state => state.invoices)

  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <Summary />

      <Text style={app.title2}>Invoices</Text>
      <Invoices numOfClice={5} fetchScale='all' showLabel={false} currentTab='home' />
    </ScrollView>
  )
}

export default Home