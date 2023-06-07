import { View } from 'react-native'
import React from 'react'
import Invoices from '../../../../components/invoices'
import style from './style';

const Paid = () => {
  return (
    <View style={style.container}>
      <Invoices numOfClice={false} fetchScale='paid' />
    </View>
  )
}

export default Paid