import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import style from './style';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../hooks/firebase';
import color from '../../../../../style/color';

import WebView from 'react-native-webview';

import { IV1 } from '../../../../../components/fragments/templates/IV1';
import { IV2 } from '../../../../../components/fragments/templates/IV2';
import { IV3 } from '../../../../../components/fragments/templates/IV3';
import { IV4 } from '../../../../../components/fragments/templates/IV4';

const CustomStyle = () => {
    const { theme } = useSelector(state => state.user)
    const webViewRef = useRef(null)

    const [profile, setProfile] = useState(null)

    const [colors, setColors] = useState([
        '4169e1',
        '0D1117',
        '333333',
        '555555',
        '465A65',
        '5D4038',
        'C62827',
        'D61B60',
        '7A1FA2',
        '45289F',
        '283593',
        '1564C0',
        '0277BD',
        '00695B'
    ])

    const [invoiceData, setInvoiceData] = useState(null)
    const [html, setHtml] = useState(``)

    const generateHTML = (profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId) => {
        return new Promise((resolve, reject) => {
            switch (profile?.selectedTemplatePreview?.id) {
                case 1:
                    resolve(IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
                    break;
                case 2:
                    resolve(IV2(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
                    break;
                case 3:
                    resolve(IV3(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
                    break;
                case 4:
                    resolve(IV4(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
                    break;
                default:
                    resolve(IV1(profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note, currentInvoiceId));
            }
        });
    };

    const setInvoiceColor = async item => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

        await updateDoc(doc(db, 'users', id), { invoiceColor: item })

        let profile = (await getDoc(doc(db, 'users', id))).data()

        generateHTML(profile, invoiceData?.invoiceId, invoiceData?.date, invoiceData?.invoiceContact, invoiceData?.items, invoiceData?.subTotal, invoiceData?.vat, invoiceData?.total, invoiceData?.note)
            .then(html => {
                setHtml(html)
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        (async () => {

            const snapshot = await getDocs(collection(db, 'demoInvoice'))

            setInvoiceData({ ...snapshot?.docs[0]?.data(), invoiceId: '0003334' })
        })()
    }, []);

    useState(() => {
        generateHTML(profile, invoiceData?.invoiceId, invoiceData?.date, invoiceData?.invoiceContact, invoiceData?.items, invoiceData?.subTotal, invoiceData?.vat, invoiceData?.total, invoiceData?.note)
            .then(html => {
                setHtml(html)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        (async () => {
            const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

            const unsub = onSnapshot(doc(db, "users", id), (doc) => {
                setProfile(doc.data())

                generateHTML(doc.data(), invoiceData?.invoiceId, invoiceData?.date, invoiceData?.invoiceContact, invoiceData?.items, invoiceData?.subTotal, invoiceData?.vat, invoiceData?.total, invoiceData?.note)
                    .then(html => {
                        setHtml(html)
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

            return unsub
        })()
    }, [])

    return (
        <View style={{ ...style.container, backgroundColor: theme ? color.dark : color.mainBackground }}>
            <WebView source={{ html }} ref={webViewRef} scalesPageToFit={true} style={{ flex: 1, backgroundColor: theme ? color.dark : color.mainBackground }} />

            <View style={style.buttonGrid}>
                {
                    colors.map((item, index) =>
                        <TouchableOpacity
                            key={index}
                            onPress={() => setInvoiceColor(item)}
                            style={{ ...style.button, backgroundColor: `#${item}`, borderColor: item == profile?.invoiceColor ? color.accent : color.transparent }} />
                    )
                }
            </View>
        </View>
    )
}

export default CustomStyle