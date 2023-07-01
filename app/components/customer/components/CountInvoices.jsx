import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, getCountFromServer, query, where } from 'firebase/firestore'
import { db } from '../../../hooks/firebase'

const CountInvoices = ({ prop }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        (async () => {
            const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user?.uid

            const coll = query(collection(db, "users", id, 'invoices'), where('invoiceContact.name', '==', prop?.name))

            const snapshot = await getCountFromServer(coll)

            setCount(snapshot.data().count)
        })()
    }, [])

    return <Text>{count} invoices</Text>
}

export default CountInvoices