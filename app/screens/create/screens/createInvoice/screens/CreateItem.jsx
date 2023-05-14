import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { itemsStyle } from './styles'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setItems } from '../../../../../features/useFormSlice'

const CreateItem = () => {
    const { goBack } = useNavigation()
    const dispatch = useDispatch()

    const { items } = useSelector(state => state.form)

    const [item, setItem] = useState({
        name: '',
        price: '',
        quantity: '',
        discounts: '',
        discription: ''
    })

    const setNewItem = () => {
        dispatch(setItems({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            discounts: item.discounts,
            discription: item.discription
        }))

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
                    onChangeText={text =>
                        setItem({
                            ...item,
                            discounts: text
                        })
                    }
                    style={itemsStyle.input} />
                <TextInput
                    placeholder='Discription'
                    onChangeText={text =>
                        setItem({
                            ...item,
                            discription: text
                        })
                    }
                    style={itemsStyle.input} />
            </ScrollView>
        </View>
    )
}

export default CreateItem