import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import style from './style'

import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import color from '../../style/color';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../hooks/firebase';

const Header = ({ screen }) => {
    const navigation = useNavigation()
    const { profile } = useSelector(state => state.user)

    const {
        order,
        date,
        invoiceContact,
        city,
        state,
        zip,
        country,
        shippingCity,
        shippingState,
        shippingZip,
        shippingCountry,
        items,
        note,
        vat
    } = useSelector(state => state.form)

    const [loading, setLoading] = useState(false)

    const saveInvoice = async () => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

        setLoading(true)

        await addDoc(collection(db, 'users', id, 'invoices'), {
            order,
            date,
            invoiceContact,
            city,
            state,
            zip,
            country,
            shippingCity,
            shippingState,
            shippingZip,
            shippingCountry,
            items,
            note: note != '' ? note : profile?.disclaimer,
            vat,
            createdAt: serverTimestamp()
        })

        await addDoc(collection(db, 'users', id, 'inventory'), {
            order,
            date,
            invoiceContact,
            city,
            state,
            zip,
            country,
            shippingCity,
            shippingState,
            shippingZip,
            shippingCountry,
            items,
            note: note != '' ? note : profile?.disclaimer,
            vat,
            createdAt: serverTimestamp()
        })

        await addDoc(collection(db, 'users', id, 'customers'), {
            ...invoiceContact,
            order,
            city,
            state,
            zip,
            country,
            createdAt: serverTimestamp()
        })

        Alert.alert('Invoice was saved successfully 🎉🎉')

        setLoading(false)
    }

    return (
        <View style={style.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={style.backButton}>
                <AntDesign name="back" size={22} color={color.accent} />
            </TouchableOpacity>

            {/* {
                screen == 'createInvoice' &&
                <TouchableOpacity onPress={saveInvoice} style={{ paddingHorizontal: 10, height: 40, backgroundColor: color.accent, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
                    {
                        loading ?
                            <ActivityIndicator color={color.white} size='small' /> :
                            <Text style={{ fontWeight: '600', color: color.white }}>Save</Text>
                    }
                </TouchableOpacity>
            } */}
        </View>
    )
}

export default Header