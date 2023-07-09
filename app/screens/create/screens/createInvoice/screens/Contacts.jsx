import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { contact } from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceContact } from '../../../../../features/useFormSlice'
import app from '../../../../../style/app'
import color from '../../../../../style/color'

const Contacts = () => {
    const { goBack, navigate } = useNavigation()
    const { allContact, directSave } = useRoute().params
    const dispatch = useDispatch()

    const { invoiceContact } = useSelector(state => state.form)
    const { theme } = useSelector(state => state.user)

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredContacts, setFilteredContacts] = useState(allContact);

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

    const filterContacts = (query) => {
        const filtered = allContact.filter((contact) =>
            contact?.name?.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredContacts(filtered);
    };

    return (
        <View style={{ ...contact.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <View style={app.head}>
                <Text style={{ ...app.title1, color: theme ? color.white : color.dark }}>👨‍🦱 Select contact</Text>
                <TouchableOpacity onPress={goBack} style={app.doneButton}>
                    <Text style={app.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                placeholder='Search contacts...'
                placeholderTextColor={theme ? color.white : color.dark}
                style={{ ...app.input, color: theme ? color.white : color.dark, marginBottom: 20 }}
                value={searchQuery}
                onChangeText={(text) => {
                    setSearchQuery(text);
                    filterContacts(text);
                }}
            />

            <FlatList
                data={filteredContacts}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => setContact(item)}
                        style={{
                            ...contact.group,
                            borderBottomWidth: index + 1 === filteredContacts.length ? 0 : 1,
                        }}
                    >
                        <Text style={{ color: theme ? color.white : color.dark }}>
                            {item?.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default Contacts