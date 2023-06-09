import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'

import { WebView } from 'react-native-webview'
import styles from './styles'

import { useSelector } from 'react-redux';

import { useNavigation, useRoute } from '@react-navigation/native';
import { IV1 } from '../../../../components/fragments/templates/IV1';
import { IV2 } from '../../../../components/fragments/templates/IV2';
import { IV3 } from '../../../../components/fragments/templates/IV3';
import { IV4 } from '../../../../components/fragments/templates/IV4';
import templatesPreview from '../../../../components/fragments/templatesPreview'

import { doc, onSnapshot } from "firebase/firestore"
import { db } from '../../../../hooks/firebase'

import AsyncStorage from '@react-native-async-storage/async-storage'
import color from '../../../../style/color';

const PreviewInvoice = () => {
    const { invoiceId, date, invoiceContact, items, subTotal, vat, total, note } = useSelector(state => state.form)
    const { theme } = useSelector(state => state.user)

    const { navigate } = useNavigation()

    const { currentInvoiceId } = useRoute().params

    const [profile, setProfile] = useState(null)
    const [html, setHtml] = useState(``)

    useLayoutEffect(() => {
        (async () => {
            const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

            const unsub = onSnapshot(doc(db, "users", id), (doc) => {
                setProfile(doc.data())
            })

            return unsub
        })()
    }, [])

    useEffect(() => {
        if (!profile) return
        (() => {
            if (!profile) return
            switch (profile?.selectedTemplatePreview?.id) {
                case 1: setHtml(IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId))
                    break
                case 2: setHtml(IV2(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId))
                    break
                case 3: setHtml(IV3(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId))
                    break
                case 4: setHtml(IV4(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId))
                    break
                default: setHtml(IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId))
            }
        })()
    }, [profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note])

    return (
        <View style={{ ...styles.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <WebView source={{ html }} scalesPageToFit style={{ flex: 1 }} />
            <View style={styles.bottom}>
                <TouchableOpacity onPress={() => navigate('SelectTemplate', { templatesPreview })} style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>Change template</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PreviewInvoice