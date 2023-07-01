import { View, Text, Alert, Switch, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect } from 'react'

import Header from '../../../../components/Header'
import styles from './styles'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { TextInput } from 'react-native'
import color from '../../../../style/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import app from '../../../../style/app'

const Tax = () => {
  const { goBack } = useNavigation()

  const { profile } = useSelector(state => state.user)

  const [taxType, setTaxType] = useState({ type: 'None' })
  const [taxInclusive, setTaxInclusive] = useState(false)
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    if (profile?.taxType)
      setTaxType(profile?.taxType)
  }, [profile])

  const openPrompt = () => {
    Alert.alert('Tax', 'Select taxation type', [
      {
        text: 'None',
        onPress: () => setTaxType({ ...taxType, type: 'None' })
      },
      {
        text: 'On the Total',
        onPress: () => setTaxType({ ...taxType, type: 'On the Total' })
      },
      {
        text: 'Deducted',
        onPress: () => setTaxType({ ...taxType, type: 'Deducted' })
      },
      {
        text: 'Per Item',
        onPress: () => setTaxType({ ...taxType, type: 'Per Item' })
      },
      {
        text: 'Cancel',
        style: 'destructive'
      }
    ], { cancelable: false })
  }

  const toggleSwitch = () => setTaxInclusive(previousState => !previousState)

  const saveSetting = async () => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user?.uid

    if (!taxType.tax) return

    setLoading(true)

    await updateDoc(doc(db, 'users', id), {
      taxType: {
        ...taxType,
        taxInclusive
      }
    })

    setLoading(false)

    goBack()
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ ...styles.conttainer, paddingHorizontal: 0 }}>
      <Header title='Tax' />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.conttainer}>
        <TouchableOpacity onPress={openPrompt} style={styles.typeButton}>
          <Text>Tax:</Text>
          <Text>{taxType.type}</Text>
        </TouchableOpacity>

        {
          taxType.type == 'On the Total' &&
          <>
            <View style={{ marginTop: 20, ...app.inputView }}>
              <Text style={app.inputText}>Tax</Text>
              <TextInput placeholder='Tax' value={taxType.tax} onChangeText={text => setTaxType({ ...taxType, tax: text })} style={app.input} />
            </View>
            <View style={app.inputView}>
              <Text style={app.inputText}>Rate</Text>
              <TextInput placeholder='Rate' value={taxType.rate} onChangeText={text => setTaxType({ ...taxType, rate: text })} style={app.input} />
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.inputViewText}>Inclusive</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={taxInclusive ? color.accent : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={taxInclusive}
                />
              </View>
              <Text>Turn on if prices already include Tax</Text>
            </View>
          </>
        }
        {
          taxType.type == 'Deducted' &&
          <>
            <View style={app.inputView}>
              <Text style={app.inputText}>Tax</Text>
              <TextInput placeholder='Tax' value={taxType.tax} onChangeText={text => setTaxType({ ...taxType, tax: text })} style={app.input} />
            </View>
            <View style={app.inputView}>
              <Text style={app.inputText}>Rate</Text>
              <TextInput placeholder='Rate' value={taxType.rate} onChangeText={text => setTaxType({ ...taxType, rate: text })} style={app.input} />
            </View>
          </>
        }
        {
          taxType.type == 'Per Item' &&
          <>
            <View style={app.inputView}>
              <Text style={app.inputText}>Tax</Text>
              <TextInput placeholder='Tax' value={taxType.tax} onChangeText={text => setTaxType({ ...taxType, tax: text })} style={app.input} />
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.inputViewText}>Inclusive</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={taxInclusive ? color.accent : '#f4f3f4'}
                  ios_backgroundColor={color.mainBackground}
                  onValueChange={toggleSwitch}
                  value={taxInclusive}
                />
              </View>
              <Text>Turn on if prices already include Tax</Text>
            </View>
          </>
        }
      </ScrollView>
      <TouchableOpacity onPress={saveSetting} style={styles.saveButton}>
        {
          loading ? <ActivityIndicator color={color.accent} size='small' /> :
            <Text style={styles.saveButtonText}>Save tax settings</Text>
        }
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default Tax