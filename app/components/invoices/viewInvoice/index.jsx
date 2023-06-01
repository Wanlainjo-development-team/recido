import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'
import styles from './styles'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { itemsStyle } from '../../../screens/create/screens/createInvoice/screens/styles'
import { AntDesign } from '@expo/vector-icons';
import color from '../../../style/color'
import { useCallback } from 'react'

const ViewInvoice = () => {
    const { viewInvoice } = useRoute().params
    const { navigate } = useNavigation()

    const [newInvoiceState, setNewInvoiceState] = useState({ ...viewInvoice })
    const [totalCalculation, setTotalCalculation] = useState({})

    const calculateSubTotalPromise = arr => {
        return new Promise((resolve, reject) => {
            let total = 0;

            for (let i = 0; i < arr.length; i++) {
                const prop = arr[i];
                let price = prop?.price * prop?.quantity;
                total += price;
            }

            const formattedResult = {
                subTotal: total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                totalVAT: 'N/A',
                finalPrice: total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            };

            resolve(formattedResult);
        });
    };

    useFocusEffect(
        useCallback(() => {
            calculateSubTotalPromise(newInvoiceState?.items)
                .then(result => {
                    setTotalCalculation({ ...result });
                });

            return () => { };
        }, [newInvoiceState?.items])
    );

    return (
        <View style={styles.container}>
            <Header />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.group}>
                    <TouchableOpacity style={{ ...styles.setInvoiceView, marginBottom: 0 }} onPress={() => navigate('SetInvoice')}>
                        <View style={styles.setInvoiceLeftView}>
                            <Text style={styles.setInvoiceLeftViewBoldText}>{new Date(newInvoiceState?.date).toDateString()}</Text>
                        </View>
                        <Text style={styles.setInvoiceLeftViewBoldText}>#{newInvoiceState?.order}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.group}>
                    <View style={{ ...styles.setInvoiceView, marginBottom: 0 }}>
                        <View style={{ ...styles.setInvoiceLeftView, width: '100%' }}>
                            <Text style={{ ...styles.setInvoiceLeftViewBoldText, marginBottom: 10 }}>Items</Text>
                            {
                                newInvoiceState?.items.length >= 1 &&
                                <>
                                    {
                                        newInvoiceState?.items.map((item, index) => (
                                            <View key={index}>
                                                <TouchableOpacity onPress={() => navigate('CreateItem', { editItem: { ...item, index } })} style={itemsStyle.group}>
                                                    <View style={itemsStyle.section1}>
                                                        <Text style={itemsStyle.groupOpacityText}>Item</Text>
                                                        <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{item?.name}</Text>
                                                    </View>
                                                    <View style={itemsStyle.section2}>
                                                        <Text style={itemsStyle.groupOpacityText}>Quantity</Text>
                                                        <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{(item?.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                                                    </View>
                                                    <View style={itemsStyle.section3}>
                                                        <Text style={itemsStyle.groupOpacityText}>Unit Price</Text>
                                                        <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{(item?.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                                                    </View>
                                                </TouchableOpacity>

                                                <View style={{ ...styles.divider, marginVertical: 10 }} />
                                            </View>
                                        ))
                                    }
                                </>
                            }
                            <TouchableOpacity onPress={() => navigate('Items')} style={styles.plusView}>
                                <AntDesign name="pluscircleo" size={22} color={color.accent} />
                                <Text style={styles.plusViewText}>Add items</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.group}>
                    <TouchableOpacity style={{ ...styles.setInvoiceView, marginBottom: 0 }} onPress={() => newInvoiceState?.invoiceContact ? navigate('AddNewCustomer', newInvoiceState?.invoiceContact) : navigate('BillTo')}>
                        <View style={styles.setInvoiceLeftView}>
                            <Text style={styles.setInvoiceLeftViewBoldText}>Bill To</Text>
                            {
                                newInvoiceState?.invoiceContact ?
                                    <Text style={{ marginTop: 10 }}>{newInvoiceState?.invoiceContact?.name}</Text> :
                                    <View style={styles.plusView}>
                                        <AntDesign name="pluscircleo" size={22} color={color.accent} />
                                        <Text style={styles.plusViewText}>Add customer</Text>
                                    </View>
                            }
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.group}>
                    <View style={{ ...styles.setInvoiceView, marginBottom: 0 }}>
                        <View style={{ ...styles.setInvoiceLeftView, width: '100%' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.setInvoiceLeftViewBoldText}>Total</Text>
                            </View>
                            <View style={{ ...styles.list, marginTop: 10 }}>
                                <Text>Subtotal</Text>
                                <Text>${totalCalculation.subTotal}</Text>
                            </View>
                            <View style={styles.list}>
                                <Text>TAX ({newInvoiceState?.vat}%)</Text>
                                <Text>${totalCalculation.totalVAT}</Text>
                            </View>
                            <View style={styles.list}>
                                <Text>Total</Text>
                                <Text>${totalCalculation.finalPrice}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.group}>
                    <TouchableOpacity onPress={() => navigate('Note', { editNote: null })} style={styles.plusView}>
                        <AntDesign name="pluscircleo" size={22} color={color.accent} />
                        <Text style={styles.plusViewText}>Notes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigate('Note', { editNote: note })} style={{ ...itemsStyle.group, height: null }}>
                        <Text>{newInvoiceState?.note}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ViewInvoice