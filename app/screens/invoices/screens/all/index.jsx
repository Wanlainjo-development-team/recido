import { View } from 'react-native'
import React from 'react'
import Invoices from '../../../../components/invoices'
import style from './style';
import { useSelector } from 'react-redux';
import color from '../../../../style/color';

const All = () => {
  const { theme } = useSelector(state => state.user)

  return (
    <View style={{ ...style.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <Invoices numOfClice={false} fetchScale='all' showLabel={false} currentTab='all' />
    </View>
  )
}

export default All