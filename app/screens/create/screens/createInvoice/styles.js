import { StyleSheet, StatusBar } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
    },

    scrollView: {
        flex: 1
    },

    group: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },

    setInvoiceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40
    },

    setInvoiceLeftView: {

    },

    setInvoiceLeftViewBoldText: {
        fontWeight: '800'
    },

    plusView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    plusViewText: {
        color: color.accent,
        marginLeft: 10
    }
})