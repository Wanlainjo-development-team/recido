import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from '../../../../components/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TextInput } from 'react-native'
import styles from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { collection, deleteDoc, doc, getDoc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'
import { Pressable } from 'react-native'

import { MaterialIcons, Feather } from '@expo/vector-icons';
import color from '../../../../style/color'

const ViewCustomer = () => {
  const { viewCustomer } = useRoute().params
  const { navigate } = useNavigation()

  const [contact, setContact] = useState({ ...viewCustomer })
  const [invoices, setInvoices] = useState([])
  const [archiveLoading, setArchiveLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)


  useEffect(() => {
    (async () => {
      const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user?.uid

      const q = query(collection(db, "users", id, 'invoices'), where("invoiceContact.name", "==", contact?.name))

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const invoices = [];
        querySnapshot.forEach((doc) => {
          invoices.push({
            id: doc.id,
            ...doc.data()
          });
        });

        setInvoices(invoices)
      });

      return unsubscribe
    })()
  }, [db])

  const calculateTotal = prop => {

    // Access the "items" array from the data
    const items = prop?.items;

    // Calculate the subtotal for each object in the "items" array
    const subtotals = items.map(item => parseFloat(item.quantity) * parseFloat(item.price));

    // Calculate the grand total by summing up the subtotals
    const grandTotal = subtotals.reduce((total, subtotal) => total + subtotal, 0);

    return grandTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const handleArchive = async () => {
    let customerId = viewCustomer?.customerId

    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user?.uid

    setArchiveLoading(true)

    let customers = (await getDoc(doc(db, 'users', id, 'customers', customerId))).data()

    await setDoc(doc(db, 'users', id, 'customerArchive', customerId),
      {
        ...customers,
        archivedAt: serverTimestamp()
      }
    )

    await deleteDoc(doc(db, 'users', id, 'customers', customerId))

    setArchiveLoading(false)

    Alert.alert('Contact has been moved to your archive successfully 🎉🎉')
  };

  const handleUpdate = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user?.uid
    let customerId = viewCustomer?.customerId

    setUpdateLoading(true)

    await updateDoc(doc(db, 'users', id, 'customers', customerId), {
      ...contact
    })

    setUpdateLoading(false)

    Alert.alert('Contact has been updated successfully 🎉🎉')
  }

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}>Invoices</Text>
        {
          invoices?.map((item, index) => (
            <Pressable key={index} onPress={() => navigate('Create', { viewInvoice: item })} style={{ ...styles.list, paddingTop: 10 }}>
              <View style={styles.left}>
                <Text style={styles.boldText}>{item?.invoiceContact?.name}</Text>
                <Text>#{item?.invoiceId}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.boldText}>{new Date(item?.date).toDateString()}</Text>
                <Text>{calculateTotal(item)}</Text>
              </View>
            </Pressable>
          ))
        }

        <View style={styles.headingView}>
          <Text style={styles.headingText}>Contact</Text>
          <View style={styles.actionsView}>
            {
              archiveLoading ?
                <ActivityIndicator color={color.blue} size='small' /> :
                <TouchableOpacity onPress={handleArchive} style={styles.action}>
                  <Feather name="archive" size={24} color={color.accent} />
                </TouchableOpacity>
            }

            {
              updateLoading ?
                <ActivityIndicator color={color.blue} size='small' /> :
                <TouchableOpacity onPress={handleUpdate} style={styles.action}>
                  <Feather name="upload-cloud" size={24} color={color.accent} />
                </TouchableOpacity>
            }
          </View>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputViewText}>Name</Text>
          <TextInput
            placeholder='Name'
            value={contact?.name}
            onChangeText={name => setContact({ ...contact, name })}
            style={styles.inputViewTextInput}
            editable={false}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputViewText}>Email</Text>
          <TextInput
            placeholder='Email'
            style={styles.inputViewTextInput}
            value={contact?.email}
            onChangeText={email => setContact({ ...contact, email })}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputViewText}>Mobile</Text>
          <TextInput
            placeholder='Mobile'
            style={styles.inputViewTextInput}
            value={contact?.phoneNumbers[0]?.digits}
            onChangeText={digits => setContact({ ...contact, phoneNumbers: [{ ...contact.phoneNumbers[0], digits }] })}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputViewText}>Phone</Text>
          <TextInput
            placeholder='Phone'
            style={styles.inputViewTextInput}
            value={contact?.phoneNumbers[0]?.number}
            onChangeText={number => setContact({ ...contact, phoneNumbers: [{ ...contact.phoneNumbers[0], number }] })}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputViewText}>Fax</Text>
          <TextInput
            placeholder='Fax'
            style={styles.inputViewTextInput}
            value={contact?.fax}
            onChangeText={fax => setContact({ ...contact, fax })}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputViewText}>Country</Text>
          <TextInput
            placeholder='Country'
            style={styles.inputViewTextInput}
            value={contact?.country}
            onChangeText={country => setContact({ ...contact, country })}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputViewText}>State</Text>
          <TextInput
            placeholder='State'
            style={styles.inputViewTextInput}
            value={contact?.country}
            onChangeText={state => setContact({ ...contact, state })}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputViewText}>City</Text>
          <TextInput
            placeholder='City'
            style={styles.inputViewTextInput}
            value={contact?.country}
            onChangeText={city => setContact({ ...contact, city })}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputViewText}>Zip</Text>
          <TextInput
            placeholder='Zip'
            style={styles.inputViewTextInput}
            value={contact?.country}
            onChangeText={zip => setContact({ ...contact, zip })}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default ViewCustomer