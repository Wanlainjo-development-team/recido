import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '../../hooks/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoiceList } from '../../features/invoicesSlice';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import color from '../../style/color';
import Loading from './Loading';
import { Feather } from '@expo/vector-icons';

const Invoices = ({ numOfClice, fetchScale, showLabel, currentTab }) => {
    const dispatch = useDispatch()
    const { navigate } = useNavigation()
    const route = useRoute()

    const { search } = useSelector(state => state.invoices)
    const { profile, theme } = useSelector(state => state.user)

    const [invoiceList, setNewInvoiceList] = useState([])

    useEffect(() => {
        (async () => {

            const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

            let q

            if (fetchScale == 'all')
                q = query(collection(db, "users", id, 'invoices'),
                    orderBy(profile?.sortBy ? profile?.sortBy : 'createdAt', profile?.orderBy == undefined ? 'desc' : profile?.orderBy)
                )

            else if (fetchScale == 'outstanding')
                q = query(collection(db, "users", id, 'invoices'),
                    where('invoiceState', '==', fetchScale),
                    orderBy(profile?.sortBy ? profile?.sortBy : 'createdAt', profile?.orderBy == undefined ? 'desc' : profile?.orderBy)
                )

            else if (fetchScale == 'paid')
                q = query(collection(db, "users", id, 'invoices'),
                    where('invoiceState', '==', fetchScale),
                    orderBy(profile?.sortBy ? profile?.sortBy : 'createdAt', profile?.orderBy == undefined ? 'desc' : profile?.orderBy)
                )



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
        if (profile?.searchBy)
            switch (profile?.searchBy) {
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
        const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

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

    const capitalizeWord = word => {
        const capitalized =
            word.charAt(0).toUpperCase()
            + word.slice(1)
        return capitalized
    }

    const list = (item, index) =>
        <Pressable key={item.id} onPress={() => navigate('Create', { viewInvoice: item })} style={{ ...styles.list, paddingTop: showLabel ? 5 : 10, backgroundColor: theme ? color.black : color.white }}>
            {
                showLabel &&
                <View style={{ ...styles.showLabel, backgroundColor: item?.invoiceState == 'outstanding' ? `${color.gold}20` : `${color.green}20` }}>
                    <Text style={{ color: item?.invoiceState == 'outstanding' ? color.goldDark : color.green, fontWeight: '600' }}>{capitalizeWord(item?.invoiceState)}</Text>
                </View>
            }
            <View style={styles.left}>
                <Text style={{ ...styles.boldText, color: theme ? color.white : color.dark }}>{item?.invoiceContact?.name}</Text>
                <Text style={{ color: theme ? color.white : color.dark }}>#{item?.invoiceId}</Text>
            </View>
            <View style={styles.right}>
                <Text style={{ ...styles.boldText, color: theme ? color.white : color.dark }}>{new Date(item?.date).toDateString()}</Text>
                <Text style={{ color: theme ? color.white : color.dark }}>{calculateTotal(item)}</Text>
            </View>
        </Pressable>


    const renderItem = ({ item, index }) => <View style={{ paddingBottom: (index + 1) == invoiceList.length ? 80 : 0 }}>{list(item, index)}</View>

    const renderHiddenItem = ({ item }) =>
        <View style={styles.hiddenItem}>
            <TouchableOpacity onPress={() => handleArchive(item.id)} style={styles.archiveButton}>
                <Feather name="archive" size={24} color={color.white} />
            </TouchableOpacity>
        </View>

    return (
        <>
            {
                invoiceList.length >= 1 ?
                    <View style={styles.container}>
                        {
                            route.name != 'Home' &&
                            <SwipeListView
                                data={currentTab == 'search' ? (numOfClice ? filteredInvoices.slice(0, numOfClice) : filteredInvoices) : (numOfClice ? invoiceList.slice(0, numOfClice) : invoiceList)}
                                renderItem={renderItem}
                                renderHiddenItem={renderHiddenItem}
                                rightOpenValue={-70}
                                showsVerticalScrollIndicator={false}
                            />
                        }

                        {
                            route.name == 'Home' &&
                            <>
                                {
                                    invoiceList.slice(0, numOfClice).map((item, index) =>
                                        <View key={index}>
                                            {list(item, index)}
                                        </View>
                                    )
                                }
                            </>
                        }
                    </View> :
                    <Loading text='Loading invoices' />
            }
        </>
    )
}

export default Invoices