import { View } from 'react-native'
import React from 'react'
import Invoices from '../../../../components/invoices'
import style from './style';

const Outstanding = () => {
  return (
    <View style={style.container}>
      <Invoices numOfClice={false} fetchScale='outstanding' />
    </View>
  )
}

export default Outstanding