import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../hooks/firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import styles from './styles'
import { SwipeListView } from 'react-native-swipe-list-view'
import Loading from './Loading'
import CountInvoices from './components/CountInvoices'
import TotalBilling from './components/TotalBilling'
import color from '../../style/color'
import { Feather } from '@expo/vector-icons';
import { setInventoryList } from '../../features/inventorySlice'

const InventoryList = () => {
  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const [newInventoryList, setNewInventoryList] = useState([])

  useEffect(() => {
    (async () => {

      const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

      let q = query(collection(db, "users", id, 'inventory'), orderBy('name', 'asc'))

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let inventory = []
        querySnapshot.forEach((doc) => {
          inventory.push({
            inventoryId: doc.id,
            ...doc.data()
          })
        })
        setNewInventoryList(inventory)
        dispatch(setInventoryList(inventory))
      })

      return unsubscribe
    })()
  }, [db])

  const handleArchive = async (inventory) => {
    // const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    // let inventories = (await getDoc(doc(db, 'users', id, 'inventory', inventoryId))).data()

    // await setDoc(doc(db, 'users', id, 'inventoryArchive', inventoryId),
    //   {
    //     ...inventories,
    //     archivedAt: serverTimestamp()
    //   }
    // )

    // await deleteDoc(doc(db, 'users', id, 'inventory', inventoryId))

    // Alert.alert('Contact has been moved to your archive successfully 🎉🎉')
  };

  const list = item =>
    <Pressable key={item.id} onPress={() => navigate('ViewItem', { viewItem: item })} style={{ ...styles.list, paddingTop: 10 }}>
      <View style={styles.left}>
        <Text style={styles.boldText}>{item?.name}</Text>
        <Text>{item?.quantity} Left</Text>
      </View>
      <View style={styles.right}>
        <Text>${item?.price}</Text>
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
        newInventoryList.length >= 1 ?
          <View style={styles.container}>
            <SwipeListView
              data={newInventoryList}
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