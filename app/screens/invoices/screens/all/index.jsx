import { View } from 'react-native'
import React from 'react'
import Invoices from '../../../../components/invoices'
import style from './style';

const All = () => {
  return (
    <View style={style.container}>
      <Invoices numOfClice={false} fetchScale='all' showLabel={false} currentTab='all' />
    </View>
  )
}

export default All