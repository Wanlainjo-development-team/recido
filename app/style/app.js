import { StyleSheet, Platform, StatusBar } from "react-native";
import color from "./color";

export default StyleSheet.create({
    title1: {
        fontWeight: '900',
        opacity: .60,
    },

    title2: {
        fontSize: 20,
        opacity: .40,
        fontWeight: '900'
    },

    title3: {},

    title4: {},

    inputView: {
        marginBottom: 30
    },

    inputText: {
        fontSize: 12,
        opacity: .60
    },

    input: {
        height: 45,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`,
        fontWeight: '600'
    },

    activitySummaryView: {
        marginVertical: 20
    },

    summaryCards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 10
    },

    summaryCard: {
        backgroundColor: color.white,
        width: '48.5%',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10
    },

    summaryTitle: {
        fontSize: 18,
        fontWeight: '900'
    },

    summaryCardDivider: {
        height: 1,
        backgroundColor: `${color.white}40`,
        marginVertical: 10
    },

    summaryList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },

    summaryListLeft: {
        fontWeight: '600',
        color: color.white
    },

    summaryListRight: {
        color: color.white
    },

    head: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 20
    },

    doneButton: {
        backgroundColor: `${color.accent}40`,
        height: 40,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    doneButtonText: {
        color: color.accent,
        fontWeight: '600'
    },

    backButton: {
        backgroundColor: `${color.accent}40`,
        height: 40,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    backButtonText: {
        color: color.accent,
        fontWeight: '600'
    }
})