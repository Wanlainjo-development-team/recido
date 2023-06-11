import { View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Keyboard, Alert, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'

import styles from './styles'

import { AntDesign, Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'

import {
  setSubTotal,
  setVat,
  setTotal,
} from '../../../../features/useFormSlice'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import color from '../../../../style/color'

import { itemsStyle } from './screens/styles'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { db } from '../../../../hooks/firebase';

const CreateInvoice = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const { profile } = useSelector(state => state.user)

  const {
    invoiceId,
    date,
    invoiceContact,
    city,
    state,
    zip,
    country,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    items,
    note,
    vat
  } = useSelector(state => state.form)

  const [totalCalculation, setTotalCalculation] = useState({})
  const [loading, setLoading] = useState(false)

  const calculateSubTotalPromise = arr => {
    return new Promise((resolve, reject) => {
      let total = 0;

      for (let i = 0; i < arr.length; i++) {
        const prop = arr[i];
        let price = prop?.price * prop?.quantity;
        total += price;
      }

      const formattedResult = {
        subTotal: total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        totalVAT: 'N/A',
        finalPrice: total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      };

      resolve(formattedResult);
    });
  };

  useFocusEffect(
    useCallback(() => {
      calculateSubTotalPromise(items)
        .then(result => {
          setTotalCalculation({ ...result });
          dispatch(setSubTotal(result.subTotal));
          dispatch(setVat(result.totalVAT));
          dispatch(setTotal(result.finalPrice));
        });

      return () => { };
    }, [items])
  );

  const saveInvoice = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    // console.log(invoiceContact)
    // console.log(items.length)

    if (!invoiceContact) {
      Alert.alert('Customer information is required')

      return
    }

    if (items.length < 1) {
      Alert.alert('Items are required')

      return
    }


    else if (invoiceContact && items.length >= 1) {
      setLoading(true)

      await addDoc(collection(db, 'users', id, 'invoices'), {
        invoiceId,
        date,
        invoiceContact,
        city,
        state,
        zip,
        country,
        shippingCity,
        shippingState,
        shippingZip,
        shippingCountry,
        items,
        invoiceState: 'outstanding',
        note: note != '' ? note : profile?.disclaimer,
        vat,
        createdAt: serverTimestamp()
      })

      await addDoc(collection(db, 'users', id, 'inventory'), {
        invoiceId,
        date,
        invoiceContact,
        city,
        state,
        zip,
        country,
        shippingCity,
        shippingState,
        shippingZip,
        shippingCountry,
        items,
        invoiceState: 'outstanding',
        note: note != '' ? note : profile?.disclaimer,
        vat,
        createdAt: serverTimestamp()
      })

      const querySnapshot = await getDocs(query(collection(db, "users", id, 'customers'), where("name", "==", invoiceContact?.name)))

      if (querySnapshot.docs.length <= 0)
        await addDoc(collection(db, 'users', id, 'customers'), {
          ...invoiceContact,
          invoiceId,
          city,
          state,
          zip,
          country,
          createdAt: serverTimestamp()
        })

      Alert.alert('Invoice was saved successfully 🎉🎉')

      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.group}>
              <TouchableOpacity style={{ ...styles.setInvoiceView, marginBottom: 0 }} onPress={() => navigate('SetInvoice')}>
                <View style={styles.setInvoiceLeftView}>
                  <Text style={styles.setInvoiceLeftViewBoldText}>{new Date(date).toDateString()}</Text>
                </View>
                <Text style={styles.setInvoiceLeftViewBoldText}>{invoiceId}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.group}>
              <View style={{ ...styles.setInvoiceView, marginBottom: 0 }}>
                <View style={{ ...styles.setInvoiceLeftView, width: '100%' }}>
                  <Text style={{ ...styles.setInvoiceLeftViewBoldText, marginBottom: 10 }}>Items</Text>
                  {
                    items.length >= 1 &&
                    <>
                      {
                        items.map((item, index) => (
                          <View key={index}>
                            <TouchableOpacity onPress={() => navigate('CreateItem', { editItem: { ...item, index } })} style={itemsStyle.group}>
                              <View style={itemsStyle.section1}>
                                <Text style={itemsStyle.groupOpacityText}>Item</Text>
                                <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{item?.name}</Text>
                              </View>
                              <View style={itemsStyle.section2}>
                                <Text style={itemsStyle.groupOpacityText}>Quantity</Text>
                                <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{(item?.quantity)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                              </View>
                              <View style={itemsStyle.section3}>
                                <Text style={itemsStyle.groupOpacityText}>Unit Price</Text>
                                <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{(item?.price)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                              </View>
                            </TouchableOpacity>

                            <View style={{ ...styles.divider, marginVertical: 10 }} />
                          </View>
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
              <TouchableOpacity style={{ ...styles.setInvoiceView, marginBottom: 0 }} onPress={() => invoiceContact ? navigate('AddNewCustomer', { directSave: false, invoiceContact }) : navigate('BillTo', { directSave: false })}>
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
              <View style={{ ...styles.setInvoiceView, marginBottom: 0 }}>
                <View style={{ ...styles.setInvoiceLeftView, width: '100%' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.setInvoiceLeftViewBoldText}>Total</Text>
                  </View>
                  <View style={{ ...styles.list, marginTop: 10 }}>
                    <Text>Subtotal</Text>
                    <Text>${totalCalculation.subTotal}</Text>
                  </View>
                  <View style={styles.list}>
                    <Text>TAX ({vat}%)</Text>
                    <Text>${totalCalculation.totalVAT}</Text>
                  </View>
                  <View style={styles.list}>
                    <Text>Total</Text>
                    <Text>${totalCalculation.finalPrice}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ ...styles.group, marginBottom: 80 }}>
              <TouchableOpacity onPress={() => navigate('Note', { editNote: null })} style={styles.plusView}>
                <AntDesign name="pluscircleo" size={22} color={color.accent} />
                <Text style={styles.plusViewText}>Notes</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Note', { editNote: note })} style={{ ...itemsStyle.group, height: null }}>
                <Text>{note != '' ? note : profile?.disclaimer}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={saveInvoice} style={styles.floatingButton}>
            {
              loading ?
                <ActivityIndicator color={color.white} /> :
                <Feather name="upload-cloud" size={24} color={color.white} />
            }
          </TouchableOpacity>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default CreateInvoice