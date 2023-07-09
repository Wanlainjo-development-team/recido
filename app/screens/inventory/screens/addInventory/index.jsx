import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableOpacity, ActivityIndicator, Alert, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDoc, collection, deleteDoc, doc, getDocs, increment, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../hooks/firebase'
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../../../components/Header';
import styles from './styles';
import color from '../../../../style/color';
import app from '../../../../style/app'

const AddInventory = () => {
    const { goBack } = useNavigation()
    const { viewItem } = useRoute().params
    const { profile, theme } = useSelector(state => state.user)

    const [loading, setLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [inventoryData, setInventoryData] = useState({
        description: '',
        name: '',
        price: '0',
        quantity: '0'
    })

    useEffect(() => {
        (() => {
            if (viewItem) setInventoryData({ ...viewItem, quantity: JSON.stringify(viewItem.quantity) })
            return
        })()
    }, [viewItem])

    const saveInventory = async () => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

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

    const updateItem = async () => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

        setUpdateLoading(true)

        await updateDoc(doc(db, 'users', id, 'inventory', viewItem?.inventoryId), {
            ...inventoryData,
            quantity: parseFloat(inventoryData.quantity),
            updatedAt: serverTimestamp()
        })

        setUpdateLoading(false)
        goBack()
    }

    const deleteItem = async () => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

        setDeleteLoading(true)

        await setDoc(doc(db, 'users', id, 'inventoryArchive', viewItem?.inventoryId),
            {
                ...inventoryData,
                archivedAt: serverTimestamp()
            }
        )

        await deleteDoc(doc(db, 'users', id, 'inventory', viewItem?.inventoryId))

        setDeleteLoading(false)

        goBack()
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ ...styles.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <Header title={inventoryData?.name} />


            <ScrollView style={styles.scrollView}>
                <View style={styles.inputView}>
                    <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Name</Text>
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={theme ? color.white : color.dark}
                        style={{ ...app.input, color: theme ? color.white : color.dark }}
                        value={inventoryData.name}
                        onChangeText={name => setInventoryData({ ...inventoryData, name })}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Description</Text>
                    <TextInput
                        placeholder='Description'
                        placeholderTextColor={theme ? color.white : color.dark}
                        style={{ ...app.input, color: theme ? color.white : color.dark }}
                        value={inventoryData.description}
                        onChangeText={description => setInventoryData({ ...inventoryData, description })}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Unit cost</Text>
                    <TextInput
                        placeholder={`${profile?.denom?.sign}0.00` || `$0.00`}
                        placeholderTextColor={theme ? color.white : color.dark}
                        style={{ ...app.input, color: theme ? color.white : color.dark }}
                        value={inventoryData.price}
                        onChangeText={price => setInventoryData({ ...inventoryData, price })}
                    />
                </View>
                <View style={styles.inputView}>
                    <Text style={{ ...app.inputText, color: theme ? color.white : color.dark }}>Units</Text>
                    <TextInput
                        placeholder='0'
                        placeholderTextColor={theme ? color.white : color.dark}
                        style={{ ...app.input, color: theme ? color.white : color.dark }}
                        value={inventoryData.quantity}
                        onChangeText={quantity => setInventoryData({ ...inventoryData, quantity })}
                    />
                </View>
            </ScrollView>

            <View style={styles.actionButtons}>
                {
                    !viewItem &&
                    <TouchableOpacity onPress={saveInventory} style={styles.saveButton}>
                        {
                            loading ? <ActivityIndicator color={color.white} size='small' /> :
                                <Text style={styles.saveButtonText}>Save</Text>
                        }
                    </TouchableOpacity>
                }

                {
                    viewItem &&
                    <View style={styles.controls}>
                        <TouchableOpacity onPress={deleteItem} style={{ ...styles.deleteButton, flex: 1, marginLeft: 0 }}>
                            {
                                deleteLoading ? <ActivityIndicator color={color.red} size='small' /> :
                                    <Text style={{ ...styles.deleteButtonText, color: color.red }}>Move to archive</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={updateItem} style={{ ...styles.deleteButton, flex: 1, backgroundColor: `${color.accent}40` }}>
                            {
                                updateLoading ? <ActivityIndicator color={color.accent} size='small' /> :
                                    <Text style={{ ...styles.deleteButtonText, color: color.accent }}>Update item</Text>
                            }
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddInventory