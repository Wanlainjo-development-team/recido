import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native'
import React, { useState } from 'react'

import { BlurView } from 'expo-blur'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import color from '../../../style/color'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore'
import { db } from '../../../hooks/firebase'
import { setInvoiceList } from '../../../features/invoicesSlice'
import { useDispatch, useSelector } from 'react-redux'

const InvoiceSearchConfig = () => {
  const { goBack } = useNavigation()
  const dispatch = useDispatch()

  const { profile } = useSelector(state => state.user)

  const [orderModalVisible, setOrderModalVisible] = useState(false)
  const [sortModalVisible, setSortModalVisible] = useState(false)

  const updateUserOrderBy = async (prop) => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    await updateDoc(doc(db, 'users', id), { orderBy: prop })

    setOrderModalVisible(false)
  }

  const updateUserSortBy = async (prop) => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    await updateDoc(doc(db, 'users', id), { sortBy: prop })

    setSortModalVisible(false)
  }

  const oederModal = () => <Modal
    animationType='fade'
    transparent={true}
    visible={orderModalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setOrderModalVisible(!orderModalVisible);
    }}>
    <BlurView intensity={50} style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.modalView}>
        <View style={styles.modalViewHead}>
          <Text style={styles.modalViewHeadText}>Order invoices by</Text>

          <TouchableOpacity
            style={{ ...styles.backButton, height: 40, width: 40 }}
            onPress={() => setOrderModalVisible(!orderModalVisible)}>
            <AntDesign name="close" size={24} color={color.accent} />
          </TouchableOpacity>
        </View>

        <View style={styles.modalViewBody}>
          <TouchableOpacity onPress={() => updateUserOrderBy('asc')} style={{ ...styles.modalButton, backgroundColor: profile?.orderBy == 'asc' ? color.accent : `${color.accent}20` }}>
            <Text style={{ ...styles.modalButtonText, color: profile?.orderBy == 'asc' ? color.white : color.accent }}>Ascending order</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateUserOrderBy('desc')} style={{ ...styles.modalButton, backgroundColor: profile?.orderBy == 'desc' ? color.accent : `${color.accent}20` }}>
            <Text style={{ ...styles.modalButtonText, color: profile?.orderBy == 'desc' ? color.white : color.accent }}>Descending order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  </Modal>

  const sortModal = () => <Modal
    animationType='fade'
    transparent={true}
    visible={sortModalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setSortModalVisible(!sortModalVisible);
    }}>
    <BlurView intensity={50} style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.modalView}>
        <View style={styles.modalViewHead}>
          <Text style={styles.modalViewHeadText}>Sort invoices by</Text>

          <TouchableOpacity
            style={{ ...styles.backButton, height: 40, width: 40 }}
            onPress={() => setSortModalVisible(!sortModalVisible)}>
            <AntDesign name="close" size={24} color={color.accent} />
          </TouchableOpacity>
        </View>

        <View style={styles.modalViewBody}>
          <TouchableOpacity onPress={() => updateUserSortBy('createdAt')} style={{ ...styles.modalButton, backgroundColor: profile?.orderBy == 'createdAt' ? color.accent : `${color.accent}20` }}>
            <Text style={{ ...styles.modalButtonText, color: profile?.orderBy == 'createdAt' ? color.white : color.accent }}>Date created</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateUserSortBy('order')} style={{ ...styles.modalButton, backgroundColor: profile?.orderBy == 'order' ? color.accent : `${color.accent}20` }}>
            <Text style={{ ...styles.modalButtonText, color: profile?.orderBy == 'order' ? color.white : color.accent }}>Invoice number</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateUserSortBy('invoiceContact.name')} style={{ ...styles.modalButton, backgroundColor: profile?.orderBy == 'invoiceContact.name' ? color.accent : `${color.accent}20` }}>
            <Text style={{ ...styles.modalButtonText, color: profile?.orderBy == 'invoiceContact.name' ? color.white : color.accent }}>Customer name</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  </Modal>



  return (
    <LinearGradient style={styles.container} colors={[color.transparent, `${color.mainBackground}80`]}>
      <TouchableOpacity style={styles.blank} onPress={goBack} />
      <BlurView intensity={100} style={styles.sheet}>
        <View style={styles.head}>
          <Text style={styles.headText}>Search option</Text>

          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <AntDesign name="back" size={24} color={color.accent} />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <TouchableOpacity style={styles.bodySortByButton} onPress={() => setOrderModalVisible(true)}>
            <Text style={styles.bodySortByButtonTitle}>Order invoice by</Text>
            <Text style={styles.bodySortByButtonText}>
              <AntDesign name={profile?.orderBy == 'asc' ? 'arrowup' : 'arrowdown'} size={15} color={color.accent} />
              {profile?.orderBy == 'asc' ? 'Ascending order' : 'Descending order'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bodySortByButton} onPress={() => setSortModalVisible(true)}>
            <Text style={styles.bodySortByButtonTitle}>Sort invoice by</Text>
            <Text style={styles.bodySortByButtonText}>
              {profile?.sortBy ? profile?.sortBy : 'Date created'}
            </Text>
          </TouchableOpacity>
          {oederModal()}
          {sortModal()}

          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </LinearGradient>
  )
}

export default InvoiceSearchConfig