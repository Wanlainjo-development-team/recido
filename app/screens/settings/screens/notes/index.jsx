import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../../../components/Header'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import styles from './styles'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ActivityIndicator } from 'react-native'
import color from '../../../../style/color'
import { useState } from 'react'
import { TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { useLayoutEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'
import { useNavigation } from '@react-navigation/native'
import input from '../../../../style/input'

const DefaultNotes = () => {
  const { goBack } = useNavigation()
  const { profile } = useSelector(state => state.user)

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
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

    if (note == '') return

    setLoading(true)

    await updateDoc(doc(db, 'users', id), {
      disclaimer: note
    })

    setLoading(false)

    goBack()
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ ...styles.conttainer, paddingHorizontal: 0 }}>
      <Header title='Default notes' />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.conttainer}>
        <View style={{ marginTop: 20 }}>
          <Text style={input.inputText}>Default note</Text>
          <TextInput placeholder='Note' multiline onContentSizeChange={handleContentSizeChange} style={{
            ...input.input,
            height: null,
            minHeight: 45,
            borderBottomWidth: 1,
            borderBottomColor: `${color.accent}40`,
            marginTop: 10,
            paddingVertical: 10
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