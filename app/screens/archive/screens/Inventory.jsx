import { View, Text, TouchableOpacity, Pressable, Alert } from 'react-native'
import React from 'react'
import styles from '../styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../../hooks/firebase'
import Loading from './Loading'
import color from '../../../style/color'
import { AntDesign } from '@expo/vector-icons';
import { SwipeListView } from 'react-native-swipe-list-view'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const Inventory = () => {
  const { inventoryArchiveList } = useSelector(state => state.form)
  const { profile, theme } = useSelector(state => state.user)

  const { navigate } = useNavigation()

  const handleArchive = async (invoiceId) => {
    Alert.alert('Restore item', 'Restored items will appear in your inventory.\nAre you sure you want to restore this item?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Restore item',
        onPress: async () => {
          const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

          let invoice = (await getDoc(doc(db, 'users', id, 'inventoryArchive', invoiceId))).data()

          await setDoc(doc(db, 'users', id, 'invoices', invoiceId),
            {
              ...invoice,
              archivedAt: serverTimestamp()
            }
          )

          await deleteDoc(doc(db, 'users', id, 'inventoryArchive', invoiceId))

          Alert.alert('Archive has been moved to your inventory successfully 🎉🎉')
        }
      }
    ])
  };

  const handlePermananetDelete = (invoiceId) => {
    Alert.alert('Delete invoice', 'This invoice will be permanently deleted Would you like to proceed',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

            await deleteDoc(doc(db, 'users', id, 'inventoryArchive', invoiceId))

            Alert.alert('Item has been permanently deleted 🎉🎉')
          }
        }
      ])
  }

  const list = (item, index) =>
    <Pressable key={item.id} onPress={() => navigate('AddInventory', { viewItem: item })} style={{ ...styles.list, paddingTop: 10, backgroundColor: theme ? color.black : color.white }}>
      <View style={styles.left}>
        <Text style={{ ...styles.boldText, color: theme ? color.white : color.dark }}>{item?.name}</Text>
        <Text style={{ color: theme ? color.white : color.dark }}>{item?.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Left</Text>
      </View>
      <View style={styles.right}>
        <Text style={{ color: theme ? color.white : color.dark }}>{profile?.denom?.sign || '$'}{item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
      </View>
    </Pressable>

  const renderItem = ({ item, index }) => <View style={{ paddingBottom: (index + 1) == inventoryArchiveList.length ? 80 : 0 }}>{list(item, index)}</View>

  const renderHiddenItem = ({ item }) =>
    <View style={styles.hiddenItem}>
      <TouchableOpacity onPress={() => handlePermananetDelete(item.id)} style={{ ...styles.archiveButton, marginRight: 10, backgroundColor: color.red }}>
        <AntDesign name="delete" size={24} color={color.white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleArchive(item.id)} style={styles.archiveButton}>
        <AntDesign name="reload1" size={24} color={color.white} />
      </TouchableOpacity>
    </View>

  return (
    <View style={{ ...styles.container, paddingTop: 20, backgroundColor: theme ? color.dark : color.mainBackground }}>
      {
        inventoryArchiveList.length >= 1 ?
          <SwipeListView
            data={inventoryArchiveList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-120}
            showsVerticalScrollIndicator={false}
          /> :
          <Loading text='Loading inventory' />
      }
    </View>
  )
}

export default Inventory