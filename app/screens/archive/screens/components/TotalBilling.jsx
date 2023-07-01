import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../../../hooks/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

const TotalBilling = ({ prop }) => {
    const [total, setTotal] = useState(0)

    const { profile } = useSelector(state => state.user)

    const calculateTotal = prop => {
        let sum = 0
        prop.forEach((item) => {
            item.items.forEach((x) => {
                sum += parseFloat(x.quantity) * parseFloat(x.price)
            })
        })
        return sum
    }

    useEffect(() => {
        (async () => {
            const id = JSON.parse(await AsyncStorage.getItem('recido_user')).user?.uid

            const q = query(
                collection(db, 'users', id, 'invoices'),
                where('invoiceContact.name', '==', prop?.name)
            )

            const unsub = onSnapshot(q, (querySnapshot) => {
                let invoices = []
                querySnapshot.forEach((doc) => {
                    invoices.push({
                        id: doc.id,
                        ...doc.data()
                    })
                })

                const calculatedTotal = calculateTotal(invoices)
                setTotal(calculatedTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
            })

            return unsub
        })()
    }, [])

    return <Text>{profile?.denom?.sign || '$'}{total}</Text>
}

export default TotalBilling