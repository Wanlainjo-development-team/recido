import { View, Text } from 'react-native'
import React, { useCallback, useState } from 'react'

import styles from './styles'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { Keyboard } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import {
  setSubTotal,
  setVat,
  setTotal,
} from '../../../../features/useFormSlice'
import { useIsFocused, useNavigation, useFocusEffect } from '@react-navigation/native'

import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'
import color from '../../../../style/color'

import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { itemsStyle } from './screens/styles'

const CreateInvoice = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const focused = useIsFocused()

  const { profile } = useSelector(state => state.user)

  const {
    order,
    date,
    invoiceContact,
    customerName,
    customerEmail,
    contact, salesRep,
    paymentTerms,
    items,
    subTotal,
    vat,
    total,
    useVAT,
    note
  } = useSelector(state => state.form)

  const [loading, setLoading] = useState(false)
  const [totalCalculation, setTotalCalculation] = useState({})

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
    let price = prop?.price * prop?.quantity
    let percentage = prop?.discounts

    let result = price - (price * percentage / 100)

    return (result).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const calculateSubTotalPromise = arr => {
    return new Promise((resolve, reject) => {
      let total = 0;
      let totalVAT = 0; // Variable to keep track of VAT

      for (let i = 0; i < arr.length; i++) {
        const prop = arr[i];
        let price = prop?.price * prop?.quantity;
        let percentage = prop?.discounts;

        let result = price - (price * percentage / 100);
        total += result;

        let _vat = result * vat; // VAT calculation with 0 percentage
        totalVAT += _vat;
      }

      let finalPrice = parseFloat(total) + (useVAT ? parseFloat(totalVAT) : 0);

      const formattedResult = {
        subTotal: total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        totalVAT: totalVAT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        finalPrice: finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
                <Text style={styles.setInvoiceLeftViewBoldText}>#{order}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.group}>
              <View style={{ ...styles.setInvoiceView, marginBottom: 0 }}>
                <View style={{ ...styles.setInvoiceLeftView, width: '100%' }}>
                  <Text style={styles.setInvoiceLeftViewBoldText}>Items</Text>
                  {
                    items.length >= 1 &&
                    <>
                      {
                        items.map((item, index) => (
                          <TouchableOpacity key={index} onPress={() => navigate('CreateItem', { editItem: { ...item, index } })} style={itemsStyle.group}>
                            <View style={itemsStyle.groupLeft}>
                              <Text>{item?.name}</Text>
                              <Text style={itemsStyle.groupOpacityText} numberOfLines={1}>{(item?.discription)?.slice(0, 20)}</Text>
                            </View>
                            <View style={itemsStyle.groupRight}>
                              {
                                item?.quantity != undefined &&
                                <Text style={itemsStyle.groupOpacityText}>{(item?.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} x {(item?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                              }
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

            <View style={styles.divider} />

            <View style={styles.group}>
              <TouchableOpacity style={{ ...styles.setInvoiceView, marginBottom: 0 }} onPress={() => invoiceContact ? navigate('AddNewCustomer', invoiceContact) : navigate('BillTo')}>
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

            <View style={styles.divider} />

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

            <View style={styles.divider} />

            <View style={styles.group}>
              <TouchableOpacity onPress={() => navigate('Note', { editNote: null })} style={styles.plusView}>
                <AntDesign name="pluscircleo" size={22} color={color.accent} />
                <Text style={styles.plusViewText}>Notes</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Note', { editNote: note })} style={{ ...itemsStyle.group, height: null }}>
                <Text>{note != '' ? note : profile?.disclaimer}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default CreateInvoice