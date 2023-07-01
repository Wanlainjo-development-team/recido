import { Text } from 'react-native'
import React from 'react'
import style from './style'

import Invoices from '../../components/invoices';
import { ScrollView } from 'react-native';
import Summary from '../../components/performanceChart/Summary';
import app from '../../style/app';

const Home = () => {
  return (
    <ScrollView style={style.container} showsVerticalScrollIndicator={false}>
      <Summary />

      <Text style={app.title2}>Invoices</Text>
      <Invoices numOfClice={5} fetchScale='all' showLabel={false} currentTab='home' />
    </ScrollView>
  )
}

export default Home