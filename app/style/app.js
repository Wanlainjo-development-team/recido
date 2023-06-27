import { StyleSheet } from "react-native";
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
    }
})