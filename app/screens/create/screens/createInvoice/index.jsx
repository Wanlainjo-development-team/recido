import { View, Text } from 'react-native'
import React, { useState } from 'react'

import styles from './styles'
import { Image } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'

import { AntDesign, Ionicons } from '@expo/vector-icons';
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

import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'
import color from '../../../../style/color'

import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { itemsStyle } from './screens/styles'

const CreateInvoice = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const { profile } = useSelector(state => state.user)
  const {
    order,
    date,
    dueDate,
    invoiceContact,

    removeDueDate, customerName, customerEmail, contact, salesRep, paymentTerms, items, subTotal, vat, total, useVAT } = useSelector(state => state.form)

  const [loading, setLoading] = useState(false)

  console.log(invoiceContact)

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

  const calculateDiscount = prop => {
    let number = prop?.price
    let percentage = prop?.discounts

    let result = number - (number * percentage / 100)

    return (result).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.group}>
              <TouchableOpacity style={styles.setInvoiceView} onPress={() => navigate('SetInvoice')}>
                <View style={styles.setInvoiceLeftView}>
                  <Text style={styles.setInvoiceLeftViewBoldText}>{new Date(date).toDateString()}</Text>
                  {
                    removeDueDate ?
                      <Text>Due on {new Date(dueDate).toDateString()}</Text> :
                      <Text>No Due date</Text>
                  }
                </View>
                <Text style={styles.setInvoiceLeftViewBoldText}>#{order}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.group}>
              <TouchableOpacity style={styles.setInvoiceView} onPress={() => invoiceContact ? navigate('AddNewCustomer', invoiceContact) : navigate('BillTo')}>
                <View style={styles.setInvoiceLeftView}>
                  <Text style={styles.setInvoiceLeftViewBoldText}>Bill To</Text>
                  {
                    invoiceContact ?
                      <Text style={{ marginTop: 10 }}>{invoiceContact?.name}</Text> :
                      <View style={styles.plusView}>
                        <AntDesign name="pluscircleo" size={22} color={color.accent} />
                        <Text style={styles.plusViewText}>Add customer</Text>
                      </View>
                  }
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.group}>
              <View style={styles.setInvoiceView}>
                <View style={{ ...styles.setInvoiceLeftView, width: '100%' }}>
                  <Text style={styles.setInvoiceLeftViewBoldText}>Items</Text>
                  {
                    items.length >= 1 &&
                    <>
                      {
                        items.map((item, index) => (
                          <TouchableOpacity key={index} style={itemsStyle.group}>
                            <View style={itemsStyle.groupLeft}>
                              <Text>{item?.name}</Text>
                              <Text style={itemsStyle.groupOpacityText} numberOfLines={1}>{(item?.discription).slice(0, 20)}</Text>
                            </View>
                            <View style={itemsStyle.groupRight}>
                              <Text style={itemsStyle.groupOpacityText}>{(item?.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} x {(item?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                              <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{calculateDiscount(item)}</Text>
                            </View>
                          </TouchableOpacity>
                        ))
                      }
                    </>
                  }
                  <TouchableOpacity onPress={() => navigate('Items')} style={styles.plusView}>
                    <AntDesign name="pluscircleo" size={22} color={color.accent} />
                    <Text style={styles.plusViewText}>Add items</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.group}>
              <View style={styles.setInvoiceView}>
                <View style={{ ...styles.setInvoiceLeftView, width: '100%' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.setInvoiceLeftViewBoldText}>Total</Text>
                  </View>
                  <View style={{ ...styles.list, marginTop: 10 }}>
                    <Text>Subtotal</Text>
                    <Text>$0.00</Text>
                  </View>
                  <View style={styles.list}>
                    <Text>TAX (0%)</Text>
                    <Text>$0.00</Text>
                  </View>
                  <View style={styles.list}>
                    <Text>Total</Text>
                    <Text>$0.00</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default CreateInvoice