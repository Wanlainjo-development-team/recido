import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import app from '../../style/app'
import color from '../../style/color'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const Summary = () => {
    const { navigate } = useNavigation()

    const { invoiceList } = useSelector(state => state.invoices)
    const { archiveList, inventoryArchiveList, contactArchiveList } = useSelector(state => state.form)
    const { inventoryList } = useSelector(state => state.inventory)
    const { customersList } = useSelector(state => state.customer)

    const [paid, setPaid] = useState(0)

    useEffect(() => {
        const filteredInvoices = invoiceList?.filter(invoice => invoice.invoiceState === "paid");

        setPaid(filteredInvoices.length)
    }, [invoiceList])

    return (
        <View style={app.activitySummaryView}>
            <Text style={app.title2}>Activity summary</Text>

            <View style={app.summaryCards}>
                <TouchableOpacity onPress={() => navigate('Invoices')} style={{ ...app.summaryCard, backgroundColor: color.accent }}>
                    <Text style={{ ...app.summaryTitle, color: color.white }}>Invoices 📝</Text>

                    <View style={app.summaryCardDivider} />

                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Created</Text>
                        <Text style={app.summaryListRight}>{invoiceList?.length}</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Paid</Text>
                        <Text style={app.summaryListRight}>{paid}</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Archived</Text>
                        <Text style={app.summaryListRight}>{archiveList.length}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate('Inventory')} style={{ ...app.summaryCard, backgroundColor: color.green }}>
                    <Text style={{ ...app.summaryTitle, color: color.white }}>Inventory 🛍️</Text>

                    <View style={app.summaryCardDivider} />

                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Items available</Text>
                        <Text style={app.summaryListRight}>{inventoryList.length}</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Archived</Text>
                        <Text style={app.summaryListRight}>{inventoryArchiveList.length}</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}></Text>
                        <Text style={app.summaryListRight}></Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate('Customers')} style={{ ...app.summaryCard, backgroundColor: color.goldDark }}>
                    <Text style={{ ...app.summaryTitle, color: color.white }}>Contacts ☎️</Text>

                    <View style={app.summaryCardDivider} />

                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Contacts saved</Text>
                        <Text style={app.summaryListRight}>{customersList.length}</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Archived</Text>
                        <Text style={app.summaryListRight}>{contactArchiveList.length}</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}></Text>
                        <Text style={app.summaryListRight}></Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigate('Archive')} style={{ ...app.summaryCard, backgroundColor: color.pink }}>
                    <Text style={{ ...app.summaryTitle, color: color.white }}>Archive 🗑️</Text>

                    <View style={app.summaryCardDivider} />

                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Invoice</Text>
                        <Text style={app.summaryListRight}>{archiveList.length}</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Inventory</Text>
                        <Text style={app.summaryListRight}>{inventoryArchiveList.length}</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Contact</Text>
                        <Text style={app.summaryListRight}>{contactArchiveList.length}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Summary