import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import style from './style';

import Invoices from '../../components/invoices';
import Summary from '../../components/performanceChart/Summary';
import app from '../../style/app';
import { useSelector } from 'react-redux';
import color from '../../style/color';

const Home = () => {
  const { theme } = useSelector(state => state.user)

  return (
    <ScrollView style={{ ...style.container, backgroundColor: theme ? color.dark : color.mainBackground }} showsVerticalScrollIndicator={false}>
      <Summary />

      <Text style={{ ...app.title2, color: theme ? color.white : color.dark }}>Invoices</Text>
      <Invoices numOfClice={5} fetchScale='all' showLabel={false} currentTab='home' />
      <View style={{ marginTop: 50 }} />
    </ScrollView>
  )
}

export default Home