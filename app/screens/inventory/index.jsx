import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import { Feather } from '@expo/vector-icons';
import color from '../../style/color';
import InventoryList from '../../components/inventory'
import { useSelector } from 'react-redux';

const InventoryScreen = () => {
  const { navigate } = useNavigation()

  const { theme } = useSelector(state => state.user)

  return (
    <View style={{ ...styles.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <InventoryList />

      <TouchableOpacity onPress={() => navigate('AddInventory', { viewItem: null })} style={styles.floatingButton}>
        <Feather name="plus" size={24} color={color.white} />
      </TouchableOpacity>
    </View>
  )
}

export default InventoryScreen