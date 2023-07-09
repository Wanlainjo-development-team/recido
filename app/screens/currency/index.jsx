import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import allCurrencies from '../../components/fragments/currency'
import app from '../../style/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../hooks/firebase'

const Currency = () => {
  const { goBack } = useNavigation()

  const setCurrency = async item => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

    await updateDoc(doc(db, 'users', id), {
      denom: item
    })

    goBack()
  }

  return (
    <View style={styles.container}>
      <View style={app.head}>
        <Text style={app.title1}>Select your country</Text>
        <TouchableOpacity onPress={goBack} style={app.doneButton}>
          <Text style={app.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={allCurrencies}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setCurrency(item)} style={{ ...styles.group, borderBottomWidth: (index + 1) == allCurrencies.length ? 0 : 1 }}>
            <Text style={{ ...styles.groupText, textAlign: 'left' }}>{item.country}</Text>
            <Text style={styles.groupText}>{item.denomination}</Text>
            <Text style={styles.groupText}>{item.sign}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Currency