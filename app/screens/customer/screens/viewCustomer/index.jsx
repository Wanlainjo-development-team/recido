import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, TextInput, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { collection, deleteDoc, doc, getDoc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../hooks/firebase';

import { Feather } from '@expo/vector-icons';
import color from '../../../../style/color';
import Header from '../../../../components/Header'
import { useSelector } from 'react-redux';

import app from '../../../../style/app'


const ViewCustomer = () => {
  const { viewCustomer } = useRoute().params
  const { navigate } = useNavigation()

  const { theme } = useSelector(state => state.user)

  const [contact, setContact] = useState({ ...viewCustomer })
  const [invoices, setInvoices] = useState([])
  const [archiveLoading, setArchiveLoading] = useState(false)
  const [updateLoading, setUpdateLoading] = useState(false)


  useEffect(() => {
    (async () => {
      const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

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

  const handleArchive = () => {
    Alert.alert('Archive customer', 'Are you sure you want to move this customer to your archive?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Move to archive',
        onPress: async () => {
          let customerId = viewCustomer?.customerId

          const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

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
        }
      }
    ])
  };

  const handleUpdate = async () => {
    Alert.alert('Customer update', 'Some changes have been made to this customer.\nDo you want to save?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Update customer',
        onPress: async () => {
          const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid
          let customerId = viewCustomer?.customerId

          setUpdateLoading(true)

          await updateDoc(doc(db, 'users', id, 'customers', customerId), {
            ...contact
          })

          setUpdateLoading(false)

          Alert.alert('Contact has been updated successfully 🎉🎉')
        }
      }
    ])
  }

  return (
    <View style={{ ...styles.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <Header title='Customers' />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={{ ...styles.headingText, color: theme ? color.white : color.dark }}>{`${invoices[0]?.invoiceContact?.name}'s`} invoices ({invoices?.length})</Text>
        {
          invoices?.map((item, index) => (
            <Pressable key={index} onPress={() => navigate('Create', { viewInvoice: item })} style={{ ...styles.list, paddingTop: 10, backgroundColor: theme ? color.black : color.white }}>
              <View style={styles.left}>
                <Text style={{ ...styles.boldText, color: theme ? color.white : color.dark }}>{item?.invoiceContact?.name}</Text>
                <Text style={{ color: theme ? color.white : color.dark }}>#{item?.invoiceId}</Text>
              </View>
              <View style={styles.right}>
                <Text style={{ ...styles.boldText, color: theme ? color.white : color.dark }}>{new Date(item?.date).toDateString()}</Text>
                <Text style={{ color: theme ? color.white : color.dark }}>{calculateTotal(item)}</Text>
              </View>
            </Pressable>
          ))
        }

        <View style={styles.headingView}>
          <Text style={{ ...styles.headingText, color: theme ? color.white : color.dark }}>Contact</Text>
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
        <View style={app.inputView}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Name</Text>
          <TextInput
            placeholder='Name'
            placeholderTextColor={theme ? color.white : color.dark}
            value={contact?.name}
            onChangeText={name => setContact({ ...contact, name })}
            style={{ ...app.input, color: theme ? color.white : color.dark }}
            editable={false}
          />
        </View>
        <View style={app.inputView}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Email</Text>
          <TextInput
            placeholder='Email'
            placeholderTextColor={theme ? color.white : color.dark}
            style={{ ...app.input, color: theme ? color.white : color.dark }}
            value={contact?.email}
            onChangeText={email => setContact({ ...contact, email })}
            />
        </View>
        <View style={app.inputView}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Mobile</Text>
          <TextInput
            placeholder='Mobile'
            placeholderTextColor={theme ? color.white : color.dark}
            style={{ ...app.input, color: theme ? color.white : color.dark }}
            value={contact?.phoneNumbers != undefined ? contact?.phoneNumbers[0]?.digits : contact?.phone}
            onChangeText={digits => setContact(contact?.phoneNumbers != undefined ? { ...contact, phoneNumbers: [{ ...contact.phoneNumbers[0], digits }] } : { ...contact, phone: digits })}
          />
        </View>
        <View style={app.inputView}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Phone</Text>
          <TextInput
            placeholder='Phone'
            placeholderTextColor={theme ? color.white : color.dark}
            style={{ ...app.input, color: theme ? color.white : color.dark }}
            value={contact?.phoneNumbers != undefined ? contact?.phoneNumbers[0]?.number : contact?.number}
            onChangeText={number => setContact(contact?.phoneNumbers != undefined ? { ...contact, phoneNumbers: [{ ...contact.phoneNumbers[0], number }] } : { ...contact, number })}
          />
        </View>
        <View style={app.inputView}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Fax</Text>
          <TextInput
            placeholder='Fax'
            placeholderTextColor={theme ? color.white : color.dark}
            style={{ ...app.input, color: theme ? color.white : color.dark }}
            value={contact?.fax}
            onChangeText={fax => setContact({ ...contact, fax })}
          />
        </View>
        <View style={app.inputView}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Country</Text>
          <TextInput
            placeholder='Country'
            placeholderTextColor={theme ? color.white : color.dark}
            style={{ ...app.input, color: theme ? color.white : color.dark }}
            value={contact?.country}
            onChangeText={country => setContact({ ...contact, country })}
          />
        </View>
        <View style={app.inputView}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>State</Text>
          <TextInput
            placeholder='State'
            placeholderTextColor={theme ? color.white : color.dark}
            style={{ ...app.input, color: theme ? color.white : color.dark }}
            value={contact?.country}
            onChangeText={state => setContact({ ...contact, state })}
            />
        </View>
        <View style={app.inputView}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>City</Text>
          <TextInput
            placeholder='City'
            placeholderTextColor={theme ? color.white : color.dark}
            style={{ ...app.input, color: theme ? color.white : color.dark }}
            value={contact?.country}
            onChangeText={city => setContact({ ...contact, city })}
          />
        </View>
        <View style={app.inputView}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Zip</Text>
          <TextInput
            placeholder='Zip'
            placeholderTextColor={theme ? color.white : color.dark}
            style={{ ...app.input, color: theme ? color.white : color.dark }}
            value={contact?.country}
            onChangeText={zip => setContact({ ...contact, zip })}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default ViewCustomer