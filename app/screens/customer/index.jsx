import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import CustomerList from '../../components/customer'
import { useNavigation } from '@react-navigation/native'
import color from '../../style/color'
import { Feather } from '@expo/vector-icons';

const CustomersScreen = () => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text>Name</Text>
        <Text>Total billed</Text>
      </View>

      <CustomerList />

      <TouchableOpacity onPress={() => navigate('AddContact')} style={styles.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default CustomersScreen