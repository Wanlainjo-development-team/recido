import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../hooks/firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './styles'
import { SwipeListView } from 'react-native-swipe-list-view'
import Loading from './Loading'
import color from '../../style/color'
import { Feather } from '@expo/vector-icons';
import { setInventoryList } from '../../features/inventorySlice'
import { setItems } from '../../features/useFormSlice'

const InventoryList = ({ selectItem }) => {
  const dispatch = useDispatch()

  const { navigate } = useNavigation()
  const route = useRoute()

  const { inventoryList } = useSelector(state => state.inventory)

  const handleArchive = async (inventoryId) => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    let inventories = (await getDoc(doc(db, 'users', id, 'inventory', inventoryId))).data()

    await setDoc(doc(db, 'users', id, 'inventoryArchive', inventoryId),
      {
        ...inventories,
        archivedAt: serverTimestamp()
      }
    )

    await deleteDoc(doc(db, 'users', id, 'inventory', inventoryId))

    Alert.alert('Item has been moved to your archive successfully 🎉🎉')
  };

  const addItem = item => {
    if (item.quantity >= 1)
      dispatch(setItems({
        ...item,
        name: item.name,
        price: item.price,
        quantity: JSON.stringify(item.quantity),
        description: item.description
      }))
    else
      Alert.alert('Seems this item is sold out 😕😕')
  }

  const list = item =>
    <Pressable key={item.id} onPress={() => selectItem ? addItem(item) : navigate('AddInventory', { viewItem: item })} style={{ ...styles.list, paddingTop: 10 }}>
      <View style={styles.left}>
        <Text style={styles.boldText}>{item?.name}</Text>
        <Text>{item?.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Left</Text>
      </View>
      <View style={styles.right}>
        <Text>${item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
      </View>
    </Pressable>

  const renderItem = ({ item }) => <View>{list(item)}</View>

  const renderHiddenItem = ({ item }) =>
    <View style={styles.hiddenItem}>
      <TouchableOpacity onPress={() => handleArchive(item.inventoryId)} style={styles.archiveButton}>
        <Feather name="archive" size={24} color={color.white} />
      </TouchableOpacity>
    </View>

  return (
    <>
      {
        inventoryList.length >= 1 ?
          <View style={{ ...styles.container, paddingBottom: route.name == 'Items' ? 0 : 80 }}>
            <SwipeListView
              data={inventoryList}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-70}
              showsVerticalScrollIndicator={false}
            />
          </View> :
          <Loading text='Loading inventory' />
      }
    </>
  )
}

export default InventoryList