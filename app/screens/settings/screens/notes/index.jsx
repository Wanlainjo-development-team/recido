import React, { useState, useLayoutEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import Header from '../../../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../hooks/firebase';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import color from '../../../../style/color';
import app from '../../../../style/app';

const DefaultNotes = () => {
  const { goBack } = useNavigation()
  const { profile, theme } = useSelector(state => state.user)

  const [loading, setLoading] = useState(false)
  const [note, setNote] = useState('')
  const [inputValue, setInputValue] = useState('')

  useLayoutEffect(() => {
    setNote(profile?.disclaimer)
  }, [profile])

  const handleContentSizeChange = ({ nativeEvent: { contentSize } }) => {
    setInputValue(contentSize.height);
  }

  const saveNote = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

    if (note == '') return

    setLoading(true)

    await updateDoc(doc(db, 'users', id), {
      disclaimer: note
    })

    setLoading(false)

    goBack()
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ ...styles.conttainer, paddingHorizontal: 0, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <Header title='Default notes' />
      <ScrollView showsVerticalScrollIndicator={false} style={{ ...styles.conttainer, backgroundColor: theme ? color.dark : color.mainBackground }}>
        <View style={{ marginTop: 20 }}>
          <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Default note</Text>
          <TextInput placeholder='Note' multiline onContentSizeChange={handleContentSizeChange} style={{
            ...app.input,
            height: null,
            minHeight: 45,
            borderBottomWidth: 1,
            borderBottomColor: theme ? color.white : `${color.accent}40`,
            marginTop: 10,
            paddingVertical: 10,
            color: theme ? color.white : color.dark
          }} value={note} onChangeText={text => setNote(text)} />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={saveNote} style={styles.saveButton}>
        {
          loading ? <ActivityIndicator color={color.accent} size='small' /> :
            <Text style={styles.saveButtonText}>Save default</Text>
        }
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default DefaultNotes