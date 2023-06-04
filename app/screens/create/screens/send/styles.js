import { StyleSheet, StatusBar, Text } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10
    },

    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    headHeadingText: {
        fontWeight: '600'
    },

    headSubtitleText: {
        fontSize: 12
    },

    headTextInput: {
        width: '100%',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`
    },

    headChipView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginTop: 3
    },

    headChips: {
        backgroundColor: `${color.accent}40`,
        borderRadius: 4,
        padding: 5,
        marginHorizontal: 1,
        marginVertical: 2
    },

    headChipText: {
        color: color.accent,
        fontSize: 12,
        fontWeight: '600'
    },

    body: {
        marginTop: 20,
    },

    bodyTitle: {
        fontWeight: '600',
        marginBottom: 10
    },

    actionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: `${color.accent}40`,
        height: 50
    },

    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%'
    },

    actionButtonText: {
        fontSize: 12
    },
})