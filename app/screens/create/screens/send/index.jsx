import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer'
import { useSelector } from 'react-redux';
import * as Contacts from 'expo-contacts'
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { IV1 } from '../preview/templates/IV1';
import { IV2 } from '../preview/templates/IV2';
import { IV3 } from '../preview/templates/IV3';
import { IV4 } from '../preview/templates/IV4';

import * as Print from 'expo-print'
import color from '../../../../style/color';

const Send = () => {
  const { profile } = useSelector(state => state.user)
  // const { invoiceId } = useSelector(state => state.invoices)
  const { invoiceId, date, invoiceContact, items, subTotal, vat, total, note } = useSelector(state => state.form)

  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [emailMessage, setEmailMessage] = useState('Thank you for your bussiness.');
  const [emailAmount, setEmailAmount] = useState(`Amount Due: $${total}`);

  let html = ``

  useEffect(() => { }, [
    (() => {
      switch (profile?.selectedTemplatePreview?.id) {
        case 1: html = IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note)
          break
        case 2: html = IV2(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note)
          break
        case 3: html = IV3(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note)
          break
        case 4: html = IV4(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note)
          break
        default: IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note)
      }
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
        // body: `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${invoiceId}`,
      });

      Alert.alert('Email sent successfully 🎉🎉')
    } else {
      Alert.alert('Device mailing is not available 😢😢');
    }
  };

  const shareOnWhatsApp = async () => {
    // const message = `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${invoiceId}`;

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
    // const message = `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${invoiceId}`;
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

  return (
    <View style={styles.container}>
      <ScrollView>
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
        <TouchableOpacity onPress={shareOnWhatsApp} style={styles.actionButton}>
          <Ionicons name="logo-whatsapp" size={20} color={color.black} />
          <Text style={styles.actionButtonText}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={shareAsSMS} style={styles.actionButton}>
          <AntDesign name="message1" size={18} color={color.black} />
          <Text style={styles.actionButtonText}>SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openMailComposer} style={styles.actionButton}>
          <Fontisto name="email" size={18} color={color.black} />
          <Text style={styles.actionButtonText}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={sharePDF} style={styles.actionButton}>
          <AntDesign name="sharealt" size={18} color={color.black} />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePrint} style={styles.actionButton}>
          <Ionicons name="print-outline" size={24} color={color.black} />
          <Text style={styles.actionButtonText}>Print</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Send