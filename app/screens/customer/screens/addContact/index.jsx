import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { AntDesign } from '@expo/vector-icons';
import color from '../../../../style/color';
import * as Contacts from 'expo-contacts'
import styles from './styles';
import { useSelector } from 'react-redux';
import app from '../../../../style/app'

const AddContact = () => {
    const { goBack, navigate } = useNavigation()

    const { theme } = useSelector(state => state.user)

    const openContact = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync();

            if (data.length > 0) {
                const contact = data;

                navigate('Contacts', { allContact: contact, directSave: true })
            }
        }
    }

    return (
        <View style={{ ...styles.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <View style={app.head}>
                <Text style={{ ...app.title1, color: theme ? color.white : color.dark }}>👨‍🦱 Add customer</Text>
                <TouchableOpacity onPress={goBack} style={app.doneButton}>
                    <Text style={app.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigate('AddNewCustomer', { directSave: true, invoiceContact: null })} style={styles.group}>
                    <AntDesign name="pluscircleo" size={22} color={color.accent} />
                    <Text style={styles.groupText}>Add new customer</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={openContact} style={styles.group}>
                    <AntDesign name="contacts" size={22} color={color.accent} />
                    <Text style={styles.groupText}>Import from your contact</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default AddContact