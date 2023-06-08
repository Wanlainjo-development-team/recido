import { StyleSheet, StatusBar } from "react-native"
import color from "../../style/color"

export default StyleSheet.create({
    container: {
        paddingBottom: 80,
        marginTop: 10
    },

    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 10,
        backgroundColor: color.white,
        padding: 10,
        borderRadius: 12,
    },

    showLabel: {
        width: '100%',
        padding: 5,
        borderRadius: 8,
        marginBottom: 10
    },

    left: {
        alignItems: 'flex-start'
    },

    right: {
        alignItems: 'flex-end'
    },

    boldText: {
        fontWeight: '600'
    },

    hiddenItem: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 50,
        borderRadius: 12,
        paddingHorizontal: 10
    },

    archiveButton: {
        backgroundColor: `${color.accent}40`,
        height: 40,
        borderRadius: 12,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    archiveButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: color.accent
    }
})