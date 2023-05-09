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