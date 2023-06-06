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

  const [modalVisible, setModalVisible] = useState(false)

  const fetchInvoices = async (prop) => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    await updateDoc(doc(db, 'users', id), { orderBy: prop })

    setModalVisible(false)
  }

  const sortModal = () => <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}>
    <BlurView intensity={50} style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.modalView}>
        <View style={styles.modalViewHead}>
          <Text style={styles.modalViewHeadText}>Sort By</Text>

          <TouchableOpacity
            style={{ ...styles.backButton, height: 40, width: 40 }}
            onPress={() => setModalVisible(!modalVisible)}>
            <AntDesign name="close" size={24} color={color.accent} />
          </TouchableOpacity>
        </View>

        <View style={styles.modalViewBody}>
          <TouchableOpacity onPress={() => fetchInvoices('asc')} style={{ ...styles.modalButton, backgroundColor: profile?.orderBy == 'asc' ? color.accent : `${color.accent}20` }}>
            <Text style={{ ...styles.modalButtonText, color: profile?.orderBy == 'asc' ? color.white : color.accent }}>Ascending order</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => fetchInvoices('desc')} style={{ ...styles.modalButton, backgroundColor: profile?.orderBy == 'desc' ? color.accent : `${color.accent}20` }}>
            <Text style={{ ...styles.modalButtonText, color: profile?.orderBy == 'desc' ? color.white : color.accent }}>Descending order</Text>
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
          <TouchableOpacity style={styles.bodySortByButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.bodySortByButtonTitle}>Order invoice by</Text>
            <Text style={styles.bodySortByButtonText}>
              <AntDesign name={profile?.orderBy == 'asc' ? 'arrowup' : 'arrowdown'} size={20} color="black" />
              {profile?.orderBy == 'asc' ? 'Ascending order' : 'Descending order'}
            </Text>
          </TouchableOpacity>
          {sortModal()}
        </View>
      </BlurView>
    </LinearGradient>
  )
}

export default InvoiceSearchConfig