import { View, Text } from 'react-native'
import React from 'react'

import app from '../../style/app'
import color from '../../style/color'

const Summary = () => {
    return (
        <View style={app.activitySummaryView}>
            <Text style={app.title2}>Activity summary</Text>

            <View style={app.summaryCards}>
                <View style={{ ...app.summaryCard, backgroundColor: color.accent }}>
                    <Text style={{ ...app.summaryTitle, color: color.white }}>Invoices 📝</Text>

                    <View style={app.summaryCardDivider} />

                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Sent</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Paid</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Archived</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                </View>

                <View style={{ ...app.summaryCard, backgroundColor: color.green }}>
                    <Text style={{ ...app.summaryTitle, color: color.white }}>Inventory 🛍️</Text>

                    <View style={app.summaryCardDivider} />

                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Items available</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Sold</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Archived</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                </View>

                <View style={{ ...app.summaryCard, backgroundColor: color.goldDark }}>
                    <Text style={{ ...app.summaryTitle, color: color.white }}>Contacts ☎️</Text>

                    <View style={app.summaryCardDivider} />

                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Contacts saved</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Archived</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}></Text>
                        <Text style={app.summaryListRight}></Text>
                    </View>
                </View>

                <View style={{ ...app.summaryCard, backgroundColor: color.pink }}>
                    <Text style={{ ...app.summaryTitle, color: color.white }}>Archive 🗑️</Text>

                    <View style={app.summaryCardDivider} />

                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Invoice</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Inventory</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                    <View style={app.summaryList}>
                        <Text style={app.summaryListLeft}>Contact</Text>
                        <Text style={app.summaryListRight}>0</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Summary