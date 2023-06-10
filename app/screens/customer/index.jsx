import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import CustomerList from '../../components/customer'

const CustomersScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text>Name</Text>
        <Text>Total billed</Text>
      </View>

      <CustomerList />
    </View>
  )
}

export default CustomersScreen