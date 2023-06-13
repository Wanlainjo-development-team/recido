import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import color from '../../style/color';
import InventoryList from '../../components/inventory'

const InventoryScreen = () => {
  const { navigate } = useNavigation()

  return (
    <View style={styles.container}>
      <InventoryList />

      <TouchableOpacity onPress={() => navigate('AddInventory')} style={styles.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default InventoryScreen