import { View, Text, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../../hooks/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceList } from '../../features/invoicesSlice'
import { useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { SwipeListView } from 'react-native-swipe-list-view'

const Invoices = ({ numOfClice, fetchScale }) => {
    const dispatch = useDispatch()
    const { navigate } = useNavigation()

    const { search } = useSelector(state => state.invoices)
    const { profile } = useSelector(state => state.user)

    const [invoiceList, setNewInvoiceList] = useState([])

    useEffect(() => {
        (async () => {

            const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

            let q

            if (fetchScale == 'all') {
                q = query(collection(db, "users", id, 'invoices'),
                    orderBy(profile?.sortBy ? profile?.sortBy : 'createdAt', profile?.orderBy == undefined ? 'desc' : profile?.orderBy)
                )
            }
            else if (fetchScale == 'outstanding') {
                q = query(collection(db, "users", id, 'invoices'),
                    where('invoiceState', '==', fetchScale),
                    orderBy(profile?.sortBy ? profile?.sortBy : 'createdAt', profile?.orderBy == undefined ? 'desc' : profile?.orderBy)
                )
            }
            else if (fetchScale == 'paid') {
                q = query(collection(db, "users", id, 'invoices'),
                    where('invoiceState', '==', fetchScale),
                    orderBy(profile?.sortBy ? profile?.sortBy : 'createdAt', profile?.orderBy == undefined ? 'desc' : profile?.orderBy)
                )
            }


            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let invoices = []
                querySnapshot.forEach((doc) => {
                    invoices.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })
                setNewInvoiceList(invoices)
                dispatch(setInvoiceList(invoices))
            })

            return unsubscribe
        })()
    }, [profile])

    const calculateTotal = prop => {

        // Access the "items" array from the data
        const items = prop?.items;

        // Calculate the subtotal for each object in the "items" array
        const subtotals = items.map(item => parseFloat(item.quantity) * parseFloat(item.price));

        // Calculate the grand total by summing up the subtotals
        const grandTotal = subtotals.reduce((total, subtotal) => total + subtotal, 0);

        return grandTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const filteredInvoices = invoiceList.filter((item) => {
        if (profile.searchBy)
            switch (profile.searchBy) {
                case 'invoiceId': return item?.invoiceId?.includes(search)
                    break;

                case 'invoiceContact.name': return item?.invoiceContact.name?.includes(search)
                    break;

                default: return item?.invoiceId?.includes(search)
                    break;
            }

        else
            item?.invoiceId?.includes(search)
    });

    const handleArchive = async (invoiceId) => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

        let invoice = (await getDoc(doc(db, 'users', id, 'invoices', invoiceId))).data()

        await setDoc(doc(db, 'users', id, 'archive', invoiceId),
            {
                ...invoice,
                archivedAt: serverTimestamp()
            }
        )

        await deleteDoc(doc(db, 'users', id, 'invoices', invoiceId))

        Alert.alert('Invoice has been moved to your archive successfully 🎉🎉')
    };

    const list = item => (
        <Pressable key={item.id} onPress={() => navigate('Create', { viewInvoice: item })} style={styles.list}>
            <View style={styles.left}>
                <Text style={styles.boldText}>{item?.invoiceContact?.name}</Text>
                <Text>#{item?.invoiceId}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.boldText}>{new Date(item?.date).toDateString()}</Text>
                <Text>{calculateTotal(item)}</Text>
            </View>
        </Pressable>
    )

    const renderItem = ({ item }) => {
        return (
            <View>{list(item)}</View>
        );
    };

    const renderHiddenItem = ({ item }) => {
        return (
            <View style={styles.hiddenItem}>
                <TouchableOpacity onPress={() => handleArchive(item.id)} style={styles.archiveButton}>
                    <Text style={styles.archiveButtonText}>Cancel Invoice</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SwipeListView
                data={filteredInvoices}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-120}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Invoices