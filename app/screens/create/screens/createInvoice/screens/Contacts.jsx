import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { contact } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceContact } from '../../../../../features/useFormSlice'
import app from '../../../../../style/app'

const Contacts = () => {
    const { goBack, navigate } = useNavigation()
    const { allContact, directSave } = useRoute().params
    const dispatch = useDispatch()

    const { invoiceContact } = useSelector(state => state.form)

    const setContact = async prop => {
        if (directSave) {
            dispatch(setInvoiceContact(prop))

            navigate('AddNewCustomer', { directSave: true, invoiceContact: prop })
        }
        else {
            dispatch(setInvoiceContact(prop))

            goBack()
            goBack()
        }
    }

    return (
        <View style={contact.container}>
            <View style={contact.head}>
                <View />
                <Text style={app.title1}>👨‍🦱 Select contact</Text>
                <TouchableOpacity onPress={goBack}>
                    <Text style={contact.headText}>Done</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={allContact}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
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