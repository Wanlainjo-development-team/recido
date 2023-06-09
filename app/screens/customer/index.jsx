import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import CustomerList from '../../components/customer'
import { useNavigation } from '@react-navigation/native'
import color from '../../style/color'
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux'

const CustomersScreen = () => {
  const { navigate } = useNavigation()

  const { theme } = useSelector(state => state.user)

  return (
    <View style={{ ...styles.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <View style={styles.head}>
        <Text style={{ color: theme ? color.white : color.dark }}>Name</Text>
        <Text style={{ color: theme ? color.white : color.dark }}>Total billed</Text>
      </View>

      <CustomerList />

      <TouchableOpacity onPress={() => navigate('AddContact')} style={styles.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default CustomersScreen