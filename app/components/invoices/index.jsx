import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../hooks/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceList } from '../../features/invoicesSlice'
import { useState } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'

const Invoices = ({ numOfClice }) => {
    const dispatch = useDispatch()
    const { navigate } = useNavigation()

    const { search } = useSelector(state => state.invoices)
    const { profile } = useSelector(state => state.user)

    const [invoiceList, setNewInvoiceList] = useState([])

    useEffect(() => {
        (async () => {
            const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user.uid

            const q = query(collection(db, "users", id, 'invoices'), orderBy(profile?.sortBy ? profile?.sortBy : 'createdAt', profile?.orderBy == undefined ? 'desc' : profile?.orderBy))

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

    const filteredInvoices = invoiceList.filter((item) =>
        item?.invoiceId?.includes(search)
    );

    const list = item => (
        <TouchableOpacity key={item.id} onPress={() => navigate('Create', { viewInvoice: item })} style={styles.list}>
            <View style={styles.left}>
                <Text style={styles.boldText}>{item?.invoiceContact?.name}</Text>
                <Text>#{item?.invoiceId}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.boldText}>{new Date(item?.date).toDateString()}</Text>
                <Text>{calculateTotal(item)}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <>
                {
                    numOfClice ?
                        <>
                            {
                                filteredInvoices.slice(0, 25).map(item => (
                                    list(item)
                                ))
                            }
                        </> :
                        <>
                            {
                                filteredInvoices.map(item => (
                                    list(item)
                                ))
                            }
                        </>
                }
            </>
        </View>
    )
}

export default Invoices