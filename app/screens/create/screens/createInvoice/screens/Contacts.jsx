import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { contact } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceContact } from '../../../../../features/useFormSlice'

const Contacts = () => {
    const { goBack } = useNavigation()
    const { allContact } = useRoute().params
    const dispatch = useDispatch()

    const { invoiceContact } = useSelector(state => state.form)

    const setContact = prop => {
        dispatch(setInvoiceContact(prop))
        if (invoiceContact) goBack()
    }

    return (
        <View style={contact.container}>
            <View style={contact.head}>
                <View />
                <Text>👨‍🦱 Select contact</Text>
                <TouchableOpacity onPress={goBack}>
                    <Text style={contact.headText}>Done</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={allContact}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setContact(item)} style={contact.group}>
                        <Text>{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Contacts