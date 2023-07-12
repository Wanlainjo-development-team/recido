import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer'
import { useSelector } from 'react-redux';
import * as Contacts from 'expo-contacts'
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { IV1 } from '../../../../components/fragments/templates/IV1';
import { IV2 } from '../../../../components/fragments/templates/IV2';
import { IV3 } from '../../../../components/fragments/templates/IV3';
import { IV4 } from '../../../../components/fragments/templates/IV4';

import * as Print from 'expo-print'
import color from '../../../../style/color';

import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native';
import { setCurrentInvoiceId } from '../../../../features/invoicesSlice';

import * as FileSystem from 'expo-file-system';

const Send = () => {
  const { navigate } = useNavigation()

  const { currentInvoiceId } = useSelector(state => state.invoices)

  const { profile, theme } = useSelector(state => state.user)
  const { invoiceId, date, invoiceContact, items, subTotal, vat, total, note } = useSelector(state => state.form)

  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [emailMessage, setEmailMessage] = useState(profile?.defaultEmailMessage ? profile?.defaultEmailMessage : 'Thank you for your business.');
  const [emailAmount, setEmailAmount] = useState(`Amount Due: ${profile?.denom?.sign || '$'}${total}`);
  const [invoiceExist, setInvoiceExist] = useState(false);
  const [newInvoiceId, setNewInvoiceId] = useState(currentInvoiceId)

  let html = ``

  useEffect(() => { }, [
    (() => {
      switch (profile?.selectedTemplatePreview?.id) {
        case 1: html = IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId)
          break
        case 2: html = IV2(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId)
          break
        case 3: html = IV3(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId)
          break
        case 4: html = IV4(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId)
          break
        default: IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId)
      }
    })()
  ])

  useEffect(() => {
    (async () => {
      const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

      const q = query(collection(db, 'users', id, 'invoices'), where("invoiceId", "==", invoiceId));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          setNewInvoiceId(doc.id)
          setCurrentInvoiceId(doc.id)

          setInvoiceExist(true)
        } else {
          setInvoiceExist(false)
        }
      });
    })()
  }, [])

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleEmailSubmit = () => {
    if (email.trim() !== '') {
      setEmailList([...emailList, email.trim()]);
      setEmail('');
    }
  };

  const removeEmail = (index) => {
    setEmailList(emailList.filter((_, i) => i !== index));
  };

  const openMailComposer = async () => {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      await MailComposer.composeAsync({
        recipients: emailList.length >= 1 ? emailList : email,
        subject: `Invoice from ${profile?.name}`,
        body: `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${currentInvoiceId}`,
      });

    } else {
      Alert.alert('Device mailing is not available 😢😢');
    }
  };

  const shareOnWhatsApp = async () => {
    const message = `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${currentInvoiceId}`;

    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;

    try {
      await Linking.openURL(whatsappUrl);

    } catch (error) {
      console.log('Error opening WhatsApp:', error);
      Alert.alert('Error opening WhatsApp');
    }
  };

  const shareAsSMS = async () => {
    const message = `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${currentInvoiceId}`;
    const phoneNumber = invoiceContact.phoneNumbers[0].digits;

    const smsUrl = `sms:${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    const bodyParam = encodedMessage ? `&body=${encodedMessage}` : '';

    try {
      await Linking.openURL(smsUrl + bodyParam);
    } catch (error) {
      console.log('Error opening SMS:', error);
      Alert.alert('Error opening SMS:', error);
    }
  };

  let sharePDF = async () => {
    let html = ``

    const generateHTML = (profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId) => {
      return new Promise((resolve, reject) => {
        switch (profile?.selectedTemplatePreview?.id) {
          case 1:
            resolve(IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
            break;
          case 2:
            resolve(IV2(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
            break;
          case 3:
            resolve(IV3(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
            break;
          case 4:
            resolve(IV4(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
            break;
          default:
            resolve(IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
        }
      });
    };

    // Usage:
    generateHTML(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId)
      .then(async html => {
        try {
          let { uri } = await printToFileAsync({
            html,
            base64: false
          });

          // Extract the filename from the uri
          let filename = uri.split('/').pop();

          // Rename the file
          let newPath = FileSystem.documentDirectory + `${invoiceId}-invoice.pdf`;
          await FileSystem.moveAsync({
            from: uri,
            to: newPath
          });

          await shareAsync(newPath);
        } catch (error) {
          Alert.alert('Error occurred while sharing PDF');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handlePrint = async () => {
    try {
      await Print.printAsync({ html });
    } catch (error) {
      Alert.alert('Failed to open printer screen');
    }
  };

  const openAlert = () => {
    Alert.alert('Action not available', 'This invoice can not be shared without authentication.\n\nPlease save the invoice and try again.', [
      {
        text: 'Ok'
      },
      {
        text: 'Save invoice',
        onPress: () => navigate('CreateNewInvoice', { currentInvoiceId: false })
      }
    ])
  }

  return (
    <View style={{ ...styles.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <View>
            <Text style={{ ...styles.headHeadingText, color: theme ? color.white : color.dark }}>Recipient</Text>
          </View>

          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            onSubmitEditing={handleEmailSubmit}
            style={{ ...styles.headTextInput, color: theme ? color.white : color.dark }}
            placeholder='someone@somewhere.com'
            placeholderTextColor={theme ? color.white : color.dark}
            autoCompleteType='email'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <View style={styles.headChipView}>
            {emailList.map((emailItem, index) => (
              <TouchableOpacity onPress={() => removeEmail(index)} key={index} style={styles.headChips}>
                <Text style={{ ...styles.headChipText }}>{emailItem}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.body}>
          <Text style={{ ...styles.bodyTitle, color: theme ? color.white : color.dark }}>Message</Text>
          <TextInput placeholder='Email message' placeholderTextColor={theme ? color.white : color.dark} value={emailMessage} onChangeText={setEmailMessage} style={{ color: theme ? color.white : color.dark }} />
          <TextInput placeholder='Amount' placeholderTextColor={theme ? color.white : color.dark} value={emailAmount} onChangeText={setEmailAmount} style={{ color: theme ? color.white : color.dark }} />
        </View>
      </ScrollView>

      <View style={styles.actionView}>
        <TouchableOpacity onPress={() => invoiceExist ? sharePDF() : openAlert()} style={styles.actionButton}>
          <AntDesign name="sharealt" size={18} color={theme ? color.white : color.dark} />
          <Text style={{ ...styles.actionButtonText, color: theme ? color.white : color.dark }}>Share copy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => invoiceExist ? handlePrint() : openAlert()} style={styles.actionButton}>
          <Ionicons name="print-outline" size={24} color={theme ? color.white : color.dark} />
          <Text style={{ ...styles.actionButtonText, color: theme ? color.white : color.dark }}>Print</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => invoiceExist ? shareOnWhatsApp() : openAlert()} style={styles.actionButton}>
          <Ionicons name="logo-whatsapp" size={20} color={theme ? color.white : color.dark} />
          <Text style={{ ...styles.actionButtonText, color: theme ? color.white : color.dark }}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => invoiceExist ? shareAsSMS() : openAlert()} style={styles.actionButton}>
          <AntDesign name="message1" size={18} color={theme ? color.white : color.dark} />
          <Text style={{ ...styles.actionButtonText, color: theme ? color.white : color.dark }}>SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => invoiceExist ? openMailComposer() : openAlert()} style={styles.actionButton}>
          <Fontisto name="email" size={18} color={theme ? color.white : color.dark} />
          <Text style={{ ...styles.actionButtonText, color: theme ? color.white : color.dark }}>Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Send