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
import CountInvoices from './components/CountInvoices'
import TotalBilling from './components/TotalBilling'
import { useNavigation } from '@react-navigation/native'

const Contacts = () => {
  const { contactArchiveList } = useSelector(state => state.form)
  const { theme } = useSelector(state => state.user)

  const { navigate } = useNavigation()

  const handleArchive = async (invoiceId) => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

    let invoice = (await getDoc(doc(db, 'users', id, 'customerArchive', invoiceId))).data()

    await setDoc(doc(db, 'users', id, 'invoices', invoiceId),
      {
        ...invoice,
        archivedAt: serverTimestamp()
      }
    )

    await deleteDoc(doc(db, 'users', id, 'customerArchive', invoiceId))

    Alert.alert('Archive has been moved successfully 🎉🎉')
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

            await deleteDoc(doc(db, 'users', id, 'customerArchive', invoiceId))

            Alert.alert('Customer has been permanently deleted 🎉🎉')
          }
        }
      ])
  }

  const list = (item, index) =>
    <Pressable key={item.id} onPress={() => navigate('AddNewCustomer', { directSave: true, invoiceContact: item })} style={{ ...styles.list, paddingTop: 10, backgroundColor: theme ? color.black : color.white }}>
      <View style={styles.left}>
        <Text style={{ ...styles.boldText, color: theme ? color.white : color.dark }}>{item?.name}</Text>
        <CountInvoices prop={item} />
      </View>
      <View style={styles.right}>
        <TotalBilling prop={item} />
      </View>
    </Pressable>

  const renderItem = ({ item, index }) => <View style={{ paddingBottom: (index + 1) == contactArchiveList.length ? 80 : 0 }}>{list(item, index)}</View>

  const renderHiddenItem = ({ item }) =>
    <View style={styles.hiddenItem}>
      <TouchableOpacity onPress={() => handlePermananetDelete(item.contactId)} style={{ ...styles.archiveButton, marginRight: 10, backgroundColor: color.red }}>
        <AntDesign name="delete" size={24} color={color.white} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleArchive(item.contactId)} style={styles.archiveButton}>
        <AntDesign name="reload1" size={24} color={color.white} />
      </TouchableOpacity>
    </View>

  return (
    <View style={{ ...styles.container, paddingTop: 20, backgroundColor: theme ? color.dark : color.mainBackground }}>
      {
        contactArchiveList.length >= 1 ?
          <SwipeListView
            data={contactArchiveList}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-120}
            showsVerticalScrollIndicator={false}
          /> :
          <Loading text='Loading contacts' />
      }
    </View>
  )
}

export default Contacts