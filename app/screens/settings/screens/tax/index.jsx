import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Alert, Switch, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../hooks/firebase';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import styles from './styles';
import color from '../../../../style/color';
import app from '../../../../style/app';

const Tax = () => {
  const { goBack } = useNavigation()

  const { profile, theme } = useSelector(state => state.user)

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
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ ...styles.conttainer, paddingHorizontal: 0, backgroundColor: theme ? color.dark : color.mainBackground }}>
      <Header title='Tax' />
      <ScrollView showsVerticalScrollIndicator={false} style={{ ...styles.conttainer, backgroundColor: theme ? color.dark : color.mainBackground }}>
        <TouchableOpacity onPress={openPrompt} style={{ ...styles.typeButton, backgroundColor: theme ? color.black : color.white }}>
          <Text style={{ color: theme ? color.white : color.dark }}>Tax:</Text>
          <Text style={{ color: theme ? color.white : color.dark }}>{taxType.type}</Text>
        </TouchableOpacity>

        {
          taxType.type == 'On the Total' &&
          <>
            <View style={{ marginTop: 20, ...app.inputView }}>
              <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Tax</Text>
              <TextInput placeholder='Tax' placeholderTextColor={theme ? color.white : color.dark} value={taxType.tax} onChangeText={text => setTaxType({ ...taxType, tax: text })} style={{ ...app.input, color: theme ? color.white : color.dark }} />
            </View>
            <View style={app.inputView}>
              <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Rate</Text>
              <TextInput placeholder='Rate' placeholderTextColor={theme ? color.white : color.dark} value={taxType.rate} onChangeText={text => setTaxType({ ...taxType, rate: text })} style={{ ...app.input, color: theme ? color.white : color.dark }} />
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ ...styles.inputViewText, color: theme ? color.white : color.dark }}>Inclusive</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={taxInclusive ? color.accent : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={taxInclusive}
                />
              </View>
              <Text style={{ color: theme ? color.white : color.dark }}>Turn on if prices already include Tax</Text>
            </View>
          </>
        }
        {
          taxType.type == 'Deducted' &&
          <>
            <View style={{ ...app.inputView, marginTop: 20 }}>
              <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Tax</Text>
              <TextInput placeholder='Tax' placeholderTextColor={theme ? color.white : color.dark} value={taxType.tax} onChangeText={text => setTaxType({ ...taxType, tax: text })} style={{ ...app.input, color: theme ? color.white : color.dark }} />
            </View>
            <View style={app.inputView}>
              <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Rate</Text>
              <TextInput placeholder='Rate' placeholderTextColor={theme ? color.white : color.dark} value={taxType.rate} onChangeText={text => setTaxType({ ...taxType, rate: text })} style={{ ...app.input, color: theme ? color.white : color.dark }} />
            </View>
          </>
        }
        {
          taxType.type == 'Per Item' &&
          <>
            <View style={{ ...app.inputView, marginTop: 20 }}>
              <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Tax</Text>
              <TextInput placeholder='Tax' placeholderTextColor={theme ? color.white : color.dark} value={taxType.tax} onChangeText={text => setTaxType({ ...taxType, tax: text })} style={{ ...app.input, color: theme ? color.white : color.dark }} />
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ ...styles.inputViewText, color: theme ? color.white : color.dark }}>Inclusive</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={taxInclusive ? color.accent : '#f4f3f4'}
                  ios_backgroundColor={color.mainBackground}
                  onValueChange={toggleSwitch}
                  value={taxInclusive}
                />
              </View>
              <Text style={{ color: theme ? color.white : color.dark }}>Turn on if prices already include Tax</Text>
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