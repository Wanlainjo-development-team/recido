import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import Header from '../../../../components/Header'
import { ScrollView } from 'react-native'
import styles from './styles'
import { TextInput } from 'react-native'
import color from '../../../../style/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addDoc, collection, getDocs, increment, query, serverTimestamp, where } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'

const AddInventory = () => {
    const [loading, setLoading] = useState(false)
    const [inventoryData, setInventoryData] = useState({
        description: '',
        name: '',
        price: '0',
        quantity: '0'
    })

    const saveInventory = async () => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

        setLoading(true)

        const querySnapshot = await getDocs(query(collection(db, "users", id, 'inventory'), where("name", "==", inventoryData?.name)))

        if (querySnapshot.docs.length >= 1) {
            Alert.alert('This Item already exists in your inventory 😕😕')
            setLoading(false)
        }
        else {
            await addDoc(collection(db, 'users', id, 'inventory'), {
                ...inventoryData,
                quantity: increment(inventoryData.quantity),
                createdAt: serverTimestamp()
            })

            setLoading(false)

            Alert.alert(`${inventoryData.name} has been added to your inventory successfully 🎉🎉`)
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <Header />


            <ScrollView style={styles.scrollView}>
                <View style={styles.inputView}>
                    <Text style={styles.inputViewText}>Name</Text>
                    <TextInput
                        placeholder='Name'
                        style={styles.inputViewTextInput}
                        value={inventoryData.name}
                        onChangeText={name => setInventoryData({ ...inventoryData, name })}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputViewText}>Description</Text>
                    <TextInput
                        placeholder='Description'
                        style={styles.inputViewTextInput}
                        value={inventoryData.description}
                        onChangeText={description => setInventoryData({ ...inventoryData, description })}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputViewText}>Unit cost</Text>
                    <TextInput
                        placeholder='$0.00'
                        style={styles.inputViewTextInput}
                        value={inventoryData.price}
                        onChangeText={price => setInventoryData({ ...inventoryData, price })}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.inputViewText}>Units</Text>
                    <TextInput
                        placeholder='0'
                        style={styles.inputViewTextInput}
                        value={inventoryData.quantity}
                        onChangeText={quantity => setInventoryData({ ...inventoryData, quantity })}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity onPress={saveInventory} style={styles.saveButton}>
                {
                    loading ? <ActivityIndicator color={color.white} size='small' /> :
                        <Text style={styles.saveButtonText}>Save</Text>
                }
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default AddInventory