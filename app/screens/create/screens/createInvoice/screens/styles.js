import { StyleSheet, StatusBar } from "react-native";
import color from "../../../../../style/color";

export const setInvoice = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
        paddingTop: 30
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

    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
})

export const terms = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `${color.black}20`,
        padding: 10,
        paddingTop: 30,
        justifyContent: 'flex-end'
    },

    flatList: {
        backgroundColor: color.white,
        borderRadius: 10,
        maxHeight: 400
    },

    listButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: `${color.black}20`
    },

    listButtonText: {
        color: color.accent
    },

    cancelButton: {
        backgroundColor: color.white,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },

    cancelButtonText: {
        color: color.red
    }
})