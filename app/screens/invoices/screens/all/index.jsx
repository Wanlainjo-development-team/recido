import { View } from 'react-native'
import React from 'react'
import Invoices from '../../../../components/invoices'
import style from './style';

const All = () => {
  return (
    <View style={style.container}>
      <Invoices numOfClice={false} fetchScale='all' />
    </View>
  )
}

export default All