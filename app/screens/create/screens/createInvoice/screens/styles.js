import { StyleSheet, StatusBar } from "react-native";
import color from "../../../../../style/color";

export const setInvoice = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
        paddingTop: 30
    },

    head: {
        height: 50,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    headText: {
        color: color.accent,
        fontWeight: '800'
    },

    group: {
        backgroundColor: color.white,
        borderRadius: 8,
        padding: 10,
        shadowColor: color.accent,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginBottom: 10
    },

    confirmButton: {
        backgroundColor: color.mainBackground,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },

    confirmButtonText: {
        color: color.accent
    },

    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
})