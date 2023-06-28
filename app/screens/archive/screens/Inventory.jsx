import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import styles from '../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { collection, deleteDoc, doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../hooks/firebase'
import { useState } from 'react'
import Loading from './Loading'
import color from '../../../style/color'
import { Feather } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view'
import { useDispatch } from 'react-redux'
import { setInventoryArchiveList } from '../../../features/useFormSlice'
import { Alert } from 'react-native'

const Inventory = () => {
  const dispatch = useDispatch()

  const [newArchiveList, setNewArchiveList] = useState([])

  useEffect(() => {
    (async () => {
      const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

      const q = collection(db, "users", id, 'inventoryArchive')
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
          cities.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setNewArchiveList(cities)
        dispatch(setInventoryArchiveList(cities))
      });
    })()
  }, [])

  const handleArchive = async (invoiceId) => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    let invoice = (await getDoc(doc(db, 'users', id, 'inventoryArchive', invoiceId))).data()

    await setDoc(doc(db, 'users', id, 'invoices', invoiceId),
      {
        ...invoice,
        archivedAt: serverTimestamp()
      }
    )

    await deleteDoc(doc(db, 'users', id, 'inventoryArchive', invoiceId))

    Alert.alert('Archive has been moved to your inventory successfully 🎉🎉')
  };

  const list = (item, index) =>
    <Pressable key={item.id} onPress={() => navigate('Create', { viewInvoice: item })} style={{ ...styles.list, paddingTop: 10 }}>
      <View style={styles.left}>
        <Text style={styles.boldText}>{item?.name}</Text>
        <Text>{item?.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Left</Text>
      </View>
      <View style={styles.right}>
        <Text>${item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
      </View>
    </Pressable>

  const renderItem = ({ item, index }) => <View style={{ paddingBottom: (index + 1) == newArchiveList.length ? 80 : 0 }}>{list(item, index)}</View>

  const renderHiddenItem = ({ item }) =>
    <View style={styles.hiddenItem}>
      <TouchableOpacity onPress={() => handleArchive(item.id)} style={styles.archiveButton}>
        <Feather name="archive" size={24} color={color.white} />
      </TouchableOpacity>
    </View>

  return (
    <View style={{ ...styles.container, paddingTop: 20 }}>
      {
        newArchiveList.length >= 1 ?
          <SwipeListView
            data={newArchiveList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-70}
            showsVerticalScrollIndicator={false}
          /> :
          <Loading text='Loading inventory' />
      }
    </View>
  )
}

export default Inventory