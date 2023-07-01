import { View, Text, TouchableOpacity, Alert, Pressable } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../../hooks/firebase'
import { useState } from 'react'
import { setCustomersList } from '../../features/customerSlice'
import { useEffect } from 'react'
import styles from './styles'
import { SwipeListView } from 'react-native-swipe-list-view'
import Loading from './Loading'
import CountInvoices from './components/CountInvoices'
import TotalBilling from './components/TotalBilling'
import color from '../../style/color'
import { Feather } from '@expo/vector-icons';

const CustomerList = () => {
    const { navigate } = useNavigation()

    const { customersList } = useSelector(state => state.customer)

    const handleArchive = async (customerId) => {
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

        let customers = (await getDoc(doc(db, 'users', id, 'customers', customerId))).data()

        await setDoc(doc(db, 'users', id, 'customerArchive', customerId),
            {
                ...customers,
                archivedAt: serverTimestamp()
            }
        )

        await deleteDoc(doc(db, 'users', id, 'customers', customerId))

        Alert.alert('Contact has been moved to your archive successfully 🎉🎉')
    };

    const list = item => (
        <Pressable key={item.id} onPress={() => navigate('ViewCustomer', { viewCustomer: item })} style={{ ...styles.list, paddingTop: 10 }}>
            <View style={styles.left}>
                <Text style={styles.boldText}>{item?.name}</Text>
                <CountInvoices prop={item} />
            </View>
            <View style={styles.right}>
                <TotalBilling prop={item} />
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
                <TouchableOpacity onPress={() => handleArchive(item.customerId)} style={styles.archiveButton}>
                    <Feather name="archive" size={24} color={color.white} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <>
            {
                customersList.length >= 1 ?
                    <View style={styles.container}>
                        <SwipeListView
                            data={customersList}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-70}
                            showsVerticalScrollIndicator={false}
                        />
                    </View> :
                    <Loading text='Loading customers' />
            }
        </>
    )
}

export default CustomerList