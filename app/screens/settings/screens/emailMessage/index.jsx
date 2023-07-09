import React, { useState, useLayoutEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import Header from '../../../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../hooks/firebase';
import { useNavigation } from '@react-navigation/native';
import color from '../../../../style/color';
import styles from './styles';
import app from '../../../../style/app';

const DefaultEmailMessage = () => {
  const { goBack } = useNavigation()
  const { profile, theme } = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [inputValue, setInputValue] = useState('')

  useLayoutEffect(() => {
    setMessage(profile?.defaultEmailMessage)
  }, [profile])

  const handleContentSizeChange = ({ nativeEvent: { contentSize } }) => {
    setInputValue(contentSize.height);
  }

  const saveEmailMessaage = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

    if (message == '') return

    setLoading(true)

    await updateDoc(doc(db, 'users', id), {
      defaultEmailMessage: message
    })

    setLoading(false)

    goBack()
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ ...styles.conttainer, paddingHorizontal: 0, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <Header title='Default messages' />
      <ScrollView showsVerticalScrollIndicator={false} style={{ ...styles.conttainer, backgroundColor: theme ? color.dark : color.mainBackground }}>
        <View style={{ marginTop: 20, ...app.inputView }}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Default message</Text>
          <TextInput placeholder='message' placeholderTextColor={theme ? color.white : color.dark} multiline onContentSizeChange={handleContentSizeChange} style={{ ...app.input, color: theme ? color.white : color.dark }} value={message} onChangeText={text => setMessage(text)} />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={saveEmailMessaage} style={styles.saveButton}>
        {
          loading ? <ActivityIndicator color={color.accent} size='small' /> :
            <Text style={styles.saveButtonText}>Save email message</Text>
        }
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default DefaultEmailMessage