import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { itemsStyle } from './styles'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItems, editItems, setItems } from '../../../../../features/useFormSlice'
import { useLayoutEffect } from 'react'
import color from '../../../../../style/color'
import { addDoc, doc, collection, serverTimestamp, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../../hooks/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import app from '../../../../../style/app'

const CreateItem = () => {
    const { goBack } = useNavigation()
    const dispatch = useDispatch()
    const { editItem } = useRoute().params

    const { items } = useSelector(state => state.form)

    const [item, setItem] = useState(editItem ? { ...editItem } : { price: 0 })
    const [loading, setLoading] = useState(false)

    const setNewItem = () => {
        if (editItem == null || editItem == undefined) {
            dispatch(setItems({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                description: item.description
            }))

            goBack()
        } else {
            dispatch(editItems({ index: editItem.index, item }))
            goBack()
        }
    }

    const deleteItem = () => {
        dispatch(deleteItems(editItem.index))

        goBack()

    }

    const saveItem = async () => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid


        let look = await getDocs(query(collection(db, 'users', id, 'inventory')), where('name', '==', item.name))

        if (look.docs.length >= 1)
            Alert.alert('Duplicate Item ⚠️⚠️⚠️', 'THis item already exists in your inventory.')

        else {
            setLoading(true)

            await addDoc(collection(db, 'users', id, 'inventory'), {
                name: item.name,
                price: parseFloat(item.price),
                quantity: parseFloat(item.quantity),
                description: item.description,
                createdAt: serverTimestamp()
            })

            Alert.alert('Item added successfully 🎉🎉')

            setLoading(false)
        }
    }

    return (
        <View style={itemsStyle.container}>
            <View style={itemsStyle.head}>
                <TouchableOpacity style={itemsStyle.headButton} onPress={goBack}>
                    <Text style={itemsStyle.headText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={app.title1}>📦 Items</Text>
                <TouchableOpacity style={itemsStyle.headButton} onPress={setNewItem}>
                    <Text style={itemsStyle.headText}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={app.inputView}>
                    <Text style={app.inputText}>Name</Text>
                    <TextInput
                        placeholder='Name'
                        value={item.name}
                        onChangeText={text => {
                            setItem({
                                ...item,
                                name: text
                            })
                        }}
                        style={app.input}
                    />
                </View>

                <View style={app.inputView}>
                    <Text style={app.inputText}>Price</Text>
                    <TextInput
                        placeholder='Price'
                        inputMode='numeric'
                        value={String(item.price)}
                        onChangeText={text => {
                            setItem({
                                ...item,
                                price: text
                            })
                        }}
                        style={app.input}
                    />
                </View>

                <View style={app.inputView}>
                    <Text style={app.inputText}>Quantity</Text>
                    <TextInput
                        placeholder='Quantity'
                        inputMode='numeric'
                        value={item.quantity}
                        onChangeText={text => {
                            setItem({
                                ...item,
                                quantity: text
                            })
                        }}
                        style={app.input}
                    />
                </View>

                <View style={app.inputView}>
                    <Text style={app.inputText}>description</Text>
                    <TextInput
                        placeholder='description'
                        value={item.description}
                        onChangeText={text => {
                            setItem({
                                ...item,
                                description: text
                            })
                        }}
                        style={app.input}
                    />
                </View>


                <TouchableOpacity onPress={saveItem} style={{ ...itemsStyle.deleteItemButton, marginBottom: 10, backgroundColor: color.accent }}>
                    {
                        loading ?
                            <ActivityIndicator color={color.white} size='small' /> :
                            <Text style={{ ...itemsStyle.deleteItemButtonText, color: color.white }}>Save for future invoices</Text>
                    }
                </TouchableOpacity>

                {
                    editItem &&
                    <TouchableOpacity onPress={deleteItem} style={itemsStyle.deleteItemButton}>
                        <Text style={itemsStyle.deleteItemButtonText}>Remove item</Text>
                    </TouchableOpacity>
                }
            </ScrollView>
        </View>
    )
}

export default CreateItem