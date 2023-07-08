import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../components/Header'
import styles from './styles'
import { useSelector } from 'react-redux'
import color from '../../../../style/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'
import { useNavigation } from '@react-navigation/native'
import app from '../../../../style/app'

const Customize = () => {
  const { goBack } = useNavigation()

  const { profile } = useSelector(state => state.user)

  const [data, setData] = useState({ ...profile })
  const [loading, setLoading] = useState(false)

  const saveChanges = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

    setLoading(true)

    await updateDoc(doc(db, 'users', id), {
      ...data
    })

    setLoading(false)

    goBack()
  }

  return (
    <KeyboardAvoidingView style={{ ...styles.conttainer, paddingHorizontal: 0 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header title='Customize' />

      <ScrollView style={styles.conttainer} showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: 20, ...app.inputView }}>
          <Text style={app.inputText}>Invoice title</Text>
          <TextInput placeholder='Invoice title' style={app.input} value={data.invoiceTitle} onChangeText={text => setData({ ...data, invoiceTitle: text })} />
        </View>
        <View style={app.inputView}>
          <Text style={app.inputText}>Business number</Text>
          <TextInput placeholder='Business number' style={app.input} value={data.bussinessNumer} onChangeText={text => setData({ ...data, bussinessNumer: text })} />
        </View>
        <View style={app.inputView}>
          <Text style={app.inputText}>Quantity label</Text>
          <TextInput placeholder='QTY' style={app.input} value={data.quantityLabel} onChangeText={text => setData({ ...data, quantityLabel: text })} />
        </View>
        <View style={app.inputView}>
          <Text style={app.inputText}>Unit price label</Text>
          <TextInput placeholder='RATE' style={app.input} value={data.unitPriceLabel} onChangeText={text => setData({ ...data, unitPriceLabel: text })} />
        </View>
      </ScrollView>

      <TouchableOpacity onPress={saveChanges} style={styles.saveButton}>
        {
          loading ? <ActivityIndicator color={color.accent} size='small' /> :
            <Text style={styles.saveButtonText}>Save changes</Text>
        }
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Customize