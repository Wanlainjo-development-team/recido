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
import { useRoute } from '@react-navigation/native';

const Send = () => {
  const { currentInvoiceId } = useRoute().params

  const { profile } = useSelector(state => state.user)
  const { invoiceId, date, invoiceContact, items, subTotal, vat, total, note } = useSelector(state => state.form)

  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [emailMessage, setEmailMessage] = useState(profile?.defaultEmailMessage ? profile?.defaultEmailMessage : 'Thank you for your bussiness.');
  const [emailAmount, setEmailAmount] = useState(`Amount Due: ${profile?.denom?.sign || '$'}${total}`);
  const [invoiceExist, setInvoiceExist] = useState(false);

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

  useEffect(() => { }, [
    (async () => {
      const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

      const q = query(collection(db, 'users', id, 'invoices'), where("invoiceId", "==", invoiceId));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          setInvoiceExist(true)
        } else {
          setInvoiceExist(false)
        }
      });
    })()
  ])

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

      Alert.alert('Email sent successfully 🎉🎉')
    } else {
      Alert.alert('Device mailing is not available 😢😢');
    }
  };

  const shareOnWhatsApp = async () => {
    const message = `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${currentInvoiceId}`;

    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;

    try {
      await Linking.openURL(whatsappUrl);

      Alert.alert('Message sent successfully 🎉🎉')
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
      Alert.alert('Message sent successfully 🎉🎉')
    } catch (error) {
      console.log('Error opening SMS:', error);
      Alert.alert('Error opening SMS:', error);
    }
  };

  let sharePDF = async () => {
    try {
      let { uri } = await printToFileAsync({
        html,
        base64: false
      })

      await shareAsync(uri)
    } catch (error) {
      Alert.alert('Error occurred while sharing PDF')
    }
  }

  const handlePrint = async () => {
    try {
      await Print.selectPrinterAsync({ html });
    } catch (error) {
      Alert.alert('Failed to open printer screen');
    }
  };

  const openAlert = () => {
    Alert.alert('Action not available', 'Please save the invoice and try again')
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.head}>
          <View>
            <Text style={styles.headHeadingText}>Recipient</Text>
            <Text style={styles.headSubtitleText}>Use commas(,) for multiple recipient</Text>
          </View>

          <TextInput
            value={email}
            onChangeText={handleEmailChange}
            onSubmitEditing={handleEmailSubmit}
            style={styles.headTextInput}
            placeholder='someone@somewhere.com'
            autoCompleteType='email'
            keyboardType='email-address'
            autoCapitalize='none'
          />

          <View style={styles.headChipView}>
            {emailList.map((emailItem, index) => (
              <TouchableOpacity onPress={() => removeEmail(index)} key={index} style={styles.headChips}>
                <Text style={styles.headChipText}>{emailItem}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.bodyTitle}>Message</Text>
          <TextInput placeholder='Email message' value={emailMessage} onChangeText={setEmailMessage} />
          <TextInput placeholder='Amount' value={emailAmount} onChangeText={setEmailAmount} />
        </View>
      </ScrollView>

      <View style={styles.actionView}>
        <TouchableOpacity onPress={() => invoiceExist ? shareOnWhatsApp() : openAlert()} style={styles.actionButton}>
          <Ionicons name="logo-whatsapp" size={20} color={color.black} />
          <Text style={styles.actionButtonText}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => invoiceExist ? shareAsSMS() : openAlert()} style={styles.actionButton}>
          <AntDesign name="message1" size={18} color={color.black} />
          <Text style={styles.actionButtonText}>SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => invoiceExist ? openMailComposer() : openAlert()} style={styles.actionButton}>
          <Fontisto name="email" size={18} color={color.black} />
          <Text style={styles.actionButtonText}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => invoiceExist ? sharePDF() : openAlert()} style={styles.actionButton}>
          <AntDesign name="sharealt" size={18} color={color.black} />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => invoiceExist ? handlePrint() : openAlert()} style={styles.actionButton}>
          <Ionicons name="print-outline" size={24} color={color.black} />
          <Text style={styles.actionButtonText}>Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Send