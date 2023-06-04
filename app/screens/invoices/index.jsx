import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from './styles'

import Invoices from '../../components/invoices'

import { Feather } from '@expo/vector-icons';
import color from '../../style/color';
import { useNavigation } from '@react-navigation/native';

const Invoice = () => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <ScrollView>
        <Invoices numOfClice={false} />
      </ScrollView>

      <TouchableOpacity onPress={() => navigate('Create', { viewInvoice: null })} style={styles.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default Invoice