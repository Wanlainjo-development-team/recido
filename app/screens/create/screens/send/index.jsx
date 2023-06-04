import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Linking } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import { Ionicons, AntDesign, Fontisto } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer'
import { useSelector } from 'react-redux';
import * as Contacts from 'expo-contacts'

const Send = () => {
  const { profile } = useSelector(state => state.user)
  const { invoiceId } = useSelector(state => state.invoices)
  const { invoiceContact } = useSelector(state => state.form)

  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);
  const [emailMessage, setEmailMessage] = useState('Thank you for your bussiness.');
  const [emailAmount, setEmailAmount] = useState(`Amount Due: $39,995.00`);

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
        body: `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${invoiceId}`,
      });

      Alert.alert('Email sent successfully 🎉🎉')
    } else {
      Alert.alert('Device mailing is not available 😢😢');
    }
  };

  const shareOnWhatsApp = async () => {
    const message = `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${invoiceId}`;

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
    const message = `${emailMessage}\n${emailAmount}\n\nhttps://recidoshare.netlify.app/${profile?.id}/${invoiceId}`;
    const phoneNumber = invoiceContact.phoneNumbers[0].digits;

    const smsUrl = `sms:${phoneNumber}`;
    const encodedMessage = encodeURIComponent(message);
    const bodyParam = encodedMessage ? `&body=${encodedMessage}` : '';

    try {
      await Linking.openURL(smsUrl + bodyParam);
    } catch (error) {
      console.log('Error opening SMS:', error);
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

          <TouchableOpacity style={styles.headButton}>
            <Ionicons name="paper-plane-outline" size={20} color="black" />
          </TouchableOpacity>

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

      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>

      <View style={styles.actionView}>
        <TouchableOpacity onPress={shareOnWhatsApp} style={styles.actionButton}>
          <Ionicons name="logo-whatsapp" size={20} color="black" />
          <Text style={styles.actionButtonText}>Whatsapp</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={shareAsSMS} style={styles.actionButton}>
          <AntDesign name="message1" size={18} color="black" />
          <Text style={styles.actionButtonText}>SMS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={openMailComposer} style={styles.actionButton}>
          <Fontisto name="email" size={18} color="black" />
          <Text style={styles.actionButtonText}>Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name="sharealt" size={18} color="black" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Send