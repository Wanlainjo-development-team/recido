import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../hooks/firebase'
import styles from './styles'
import { SwipeListView } from 'react-native-swipe-list-view'
import Loading from './Loading'
import color from '../../style/color'
import { Feather } from '@expo/vector-icons';

const InventoryList = () => {

  const { navigate } = useNavigation()
  const route = useRoute()

  const { inventoryList } = useSelector(state => state.inventory)

  const { profile, theme } = useSelector(state => state.user)

  const handleArchive = async (inventoryId) => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

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

  const list = item =>
    <Pressable key={item.id} onPress={() => navigate('AddInventory', { viewItem: item })} style={{ ...styles.list, paddingTop: 10, backgroundColor: theme ? color.black : color.white }}>
      <View style={styles.left}>
        <Text style={{ ...styles.boldText, color: theme ? color.white : color.dark }}>{item?.name}</Text>
        <Text style={{ color: theme ? color.white : color.dark }}>{item?.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Left</Text>
      </View>
      <View style={styles.right}>
        <Text style={{ color: theme ? color.white : color.dark }}>{profile?.denom?.sign || '$'}{item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
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