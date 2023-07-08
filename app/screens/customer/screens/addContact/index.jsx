import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { AntDesign } from '@expo/vector-icons';
import color from '../../../../style/color';
import * as Contacts from 'expo-contacts'
import styles from './styles';

const AddContact = () => {
    const { goBack, navigate } = useNavigation()

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
        <View style={styles.container}>
            <View style={styles.head}>
                <View />
                <Text>👨‍🦱 Add customer</Text>
                <TouchableOpacity onPress={goBack}>
                    <Text style={styles.headText}>Done</Text>
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