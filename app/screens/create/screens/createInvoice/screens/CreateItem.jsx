import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { itemsStyle } from './styles'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItems, editItems, setItems } from '../../../../../features/useFormSlice'
import { useLayoutEffect } from 'react'
import color from '../../../../../style/color'
import { addDoc, doc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../../../../../hooks/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateItem = () => {
    const { goBack } = useNavigation()
    const dispatch = useDispatch()
    const { editItem } = useRoute().params

    const { items } = useSelector(state => state.form)

    const [item, setItem] = useState({
        name: '',
        price: '',
        quantity: '',
        discription: ''
    })
    const [loading, setLoading] = useState(false)

    useLayoutEffect(() => {
        if (editItem == null || editItem == undefined) return
        setItem({
            ...editItem,
            item
        })
    }, [])

    const setNewItem = () => {
        if (editItem == null || editItem == undefined) {
            dispatch(setItems({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                discription: item.discription
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
        const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

        setLoading(true)

        await addDoc(collection(db, 'users', id, 'items'), {
            ...item,
            createdAt: serverTimestamp()
        })

        Alert.alert('Item added successfully 🎉🎉')

        setLoading(false)
    }

    return (
        <View style={itemsStyle.container}>
            <View style={itemsStyle.head}>
                <TouchableOpacity onPress={goBack}>
                    <Text style={itemsStyle.headText}>Cancel</Text>
                </TouchableOpacity>
                <Text>📦 Items</Text>
                <TouchableOpacity onPress={setNewItem}>
                    <Text style={itemsStyle.headText}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10 }}>Name</Text>
                <TextInput
                    placeholder='Name'
                    value={item.name}
                    onChangeText={text =>
                        setItem({
                            ...item,
                            name: text
                        })
                    }
                    style={itemsStyle.input} />

                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 20 }}>Price</Text>
                <TextInput
                    placeholder='Price'
                    inputMode='numeric'
                    value={item.price}
                    onChangeText={text =>
                        setItem({
                            ...item,
                            price: text
                        })
                    }
                    style={itemsStyle.input} />

                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 20 }}>Quantity</Text>
                <TextInput
                    placeholder='Quantity'
                    inputMode='numeric'
                    value={item.quantity}
                    onChangeText={text =>
                        setItem({
                            ...item,
                            quantity: text
                        })
                    }
                    style={itemsStyle.input} />

                <Text style={{ fontSize: 12, fontWeight: '600', marginLeft: 10, marginTop: 20 }}>Discription</Text>
                <TextInput
                    placeholder='Discription'
                    value={item.discription}
                    onChangeText={text =>
                        setItem({
                            ...item,
                            discription: text
                        })
                    }
                    style={itemsStyle.input} />


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