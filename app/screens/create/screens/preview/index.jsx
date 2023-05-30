import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { WebView } from 'react-native-webview'
import styles from './styles'

import { useSelector } from 'react-redux';

import { FontAwesome5 } from '@expo/vector-icons';
import color from '../../../../style/color';
import { useNavigation } from '@react-navigation/native';
import { IV1 } from './templates/IV1';
import { IV2 } from './templates/IV2';
import { IV3 } from './templates/IV3';
import { IV4 } from './templates/IV4';
import templatesPreview from '../../../../components/fragments/templatesPreview'

import { doc, onSnapshot } from "firebase/firestore"
import { db } from '../../../../hooks/firebase'

import AsyncStorage from '@react-native-async-storage/async-storage'

const PreviewInvoice = () => {
    const { order, date, invoiceContact, customerName, customerEmail, contact, salesRep, paymentTerms, items, subTotal, vat, total, note } = useSelector(state => state.form)
    const { navigate } = useNavigation()

    const [profile, setProfile] = useState(null)

    useLayoutEffect(() => {
        (async () => {
            const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

            const unsub = onSnapshot(doc(db, "users", id), (doc) => {
                setProfile(doc.data())
            })

            return unsub
        })()
    }, [])


    let html = ``

    useEffect(() => { }, [
        (() => {
            switch (profile?.selectedTemplatePreview?.id) {
                case 1: html = IV1(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note)
                    break
                case 2: html = IV2(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note)
                    break
                case 3: html = IV3(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note)
                    break
                case 4: html = IV4(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note)
                    break
                default: IV1(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note)
            }
        })()
    ])


    let sharePDF = async () => {
        let { uri } = await printToFileAsync({
            html,
            base64: false
        })

        await shareAsync(uri)
    }

    return (
        <View style={styles.container}>
            <WebView source={{ html: html }} scalesPageToFit style={{ flex: 1 }} />
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => navigate('SelectTemplate', { templatesPreview })} style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>Change template</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.goBackBytton}>
                    <FontAwesome5 name="paper-plane" size={24} color={color.accent} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PreviewInvoice