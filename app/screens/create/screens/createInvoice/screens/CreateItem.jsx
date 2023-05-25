import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { itemsStyle } from './styles'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItems, setItems } from '../../../../../features/useFormSlice'
import { useLayoutEffect } from 'react'

const CreateItem = () => {
    const { goBack } = useNavigation()
    const dispatch = useDispatch()
    const { editItem } = useRoute().params

    const { items } = useSelector(state => state.form)

    const [item, setItem] = useState({
        name: '',
        price: '',
        quantity: '',
        discounts: '',
        discription: ''
    })

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
                discounts: item.discounts,
                discription: item.discription
            }))

            goBack()
        } else {
            goBack()
        }
    }

    const deleteItem = () => {
        dispatch(deleteItems(editItem.index))

        goBack()

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

            <ScrollView showsVerticalScrollIndicator={false} style={itemsStyle.scrollView}>
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
                <TextInput
                    placeholder='Discounts'
                    inputMode='numeric'
                    value={item.discounts}
                    onChangeText={text =>
                        setItem({
                            ...item,
                            discounts: text
                        })
                    }
                    style={itemsStyle.input} />
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