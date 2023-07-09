import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getCountFromServer, query, where } from 'firebase/firestore';
import { db } from '../../../hooks/firebase';
import { useSelector } from 'react-redux';
import color from '../../../style/color';

const CountInvoices = ({ prop }) => {
    const [count, setCount] = useState(0)

    const { theme } = useSelector(state => state.user)

    useEffect(() => {
        (async () => {
            const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

            const coll = query(collection(db, "users", id, 'invoices'), where('invoiceContact.name', '==', prop?.name))

            const snapshot = await getCountFromServer(coll)

            setCount(snapshot.data().count)
        })()
    }, [])

    return <Text style={{ color: theme ? color.white : color.dark }}>{count} invoices</Text>
}

export default CountInvoices