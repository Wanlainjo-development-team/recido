import { View, Text } from 'react-native'
import React, { useState } from 'react'

import styles from './styles'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'

import { FontAwesome } from '@expo/vector-icons';
import { TextInput, Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import {
  setOrder,
  setDate,
  setCustomerEmail,
  setCustomerName,
  setContact,
  setSalesRep,
  setPaymentTerms,
  setItems,
  setSubTotal,
  setVat,
  setTotal,
  setUseVAT,
  deleteTerm,
  deleteItem
} from '../../../../features/useFormSlice'
import { useNavigation } from '@react-navigation/native'

import { AntDesign } from '@expo/vector-icons';

import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'
import color from '../../../../style/color'

import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'

const CreateInvoice = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const { profile } = useSelector(state => state.user)
  const { order, date, customerName, customerEmail, contact, salesRep, paymentTerms, items, subTotal, vat, total, useVAT } = useSelector(state => state.form)

  const [loading, setLoading] = useState(false)
  const [initialTerm, setInitialTerm] = useState('')

  const saveInvoice = async () => {
    let calcSubTotal = 0
    let calcVat = 0
    let calcTotal = 0

    items.forEach(item => {
      calcSubTotal = calcSubTotal + parseFloat(item.subTotal)
    })

    calcVat = calcSubTotal * 0.075
    calcTotal = calcSubTotal + (useVAT ? calcVat : 0)

    dispatch(setSubTotal(calcSubTotal))
    dispatch(setVat(useVAT ? calcVat : 0))
    dispatch(setTotal(calcTotal))

    setLoading(true)
    await addDoc(collection(db, 'invoices'), {
      order,
      date,
      customerName,
      customerEmail,
      contact,
      salesRep,
      paymentTerms,
      items,
      subTotal,
      vat,
      total
    })
    setLoading(false)
    navigate('Modal', {
      title: 'Invoice saved successfully',
      body: 'Your invoice has been saved successfully'
    })
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.group}>
              <TouchableOpacity style={styles.setInvoiceView} onPress={() => navigate('SetInvoice')}>
                <View style={styles.setInvoiceLeftView}>
                  <Text style={styles.setInvoiceLeftViewBoldText}>May 11, 2023</Text>
                  <Text>Due on May 18, 2023</Text>
                </View>
                <Text style={styles.setInvoiceLeftViewBoldText}>#INV0002</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default CreateInvoice