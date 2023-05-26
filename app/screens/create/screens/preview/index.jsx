import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

import { WebView } from 'react-native-webview'
import styles from './styles'

import { useSelector } from 'react-redux';

import { FontAwesome5 } from '@expo/vector-icons';
import color from '../../../../style/color';
import { useNavigation } from '@react-navigation/native';
import { IV1 } from './templates/IV1';

const PreviewInvoice = () => {
    const { order, date, dueDate, removeDueDate, invoiceContact, customerName, customerEmail, contact, salesRep, paymentTerms, items, subTotal, vat, total, note } = useSelector(state => state.form)
    const { profile } = useSelector(state => state.user)

    const navigation = useNavigation()

    let html = ``

    switch (profile?.selectedTemplatePreview?.id) {
        case 1: html = IV1(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note) // emove later
            break
        case 2: html = IV1(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note) // emove later
            break
        case 3: html = IV1(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note) // emove later
            break
        case 4: html = IV1(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note)
            break
        default: IV1(profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note)
    }

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
                <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>Template</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.goBackBytton}>
                    <FontAwesome5 name="paper-plane" size={24} color={color.accent} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PreviewInvoice