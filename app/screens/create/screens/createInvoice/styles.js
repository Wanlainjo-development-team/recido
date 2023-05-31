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

    divider: {
        width: '100%',
        height: 1,
        backgroundColor: `${color.accent}40`,
        marginVertical: 30
    },

    group: {
        borderRadius: 8,
        padding: 10,
        marginBottom: 20
    },

    setInvoiceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30
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
    },

    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    }
})