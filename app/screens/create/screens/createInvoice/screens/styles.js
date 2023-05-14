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
        padding: 10,
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

export const billTo = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
        paddingTop: 30
    },

    head: {
        height: 50,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headText: {
        color: color.accent,
        fontWeight: '800'
    },

    group: {
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    groupText: {
        color: color.accent,
        marginLeft: 10
    }
})

export const contact = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
        paddingTop: 30
    },

    head: {
        height: 50,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headText: {
        color: color.accent,
        fontWeight: '800'
    },

    group: {
        padding: 10,
        marginBottom: 10,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    groupText: {
        color: color.accent,
        marginLeft: 10
    }
})

export const addNewCustomer = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
        paddingTop: 30
    },

    head: {
        height: 50,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headText: {
        color: color.accent,
        fontWeight: '800'
    },

    scrollView: {
        paddingHorizontal: 10
    },

    input: {
        backgroundColor: `${color.accent}20`,
        height: 45,
        marginTop: 10,
        borderRadius: 12,
        paddingHorizontal: 10,
        fontWeight: '600'
    },

    shortInput: {
        backgroundColor: `${color.accent}20`,
        height: 45,
        marginTop: 10,
        borderRadius: 12,
        paddingHorizontal: 10,
        fontWeight: '600',
        width: '49%'
    },

    showMoreOptionsButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },

    showMoreOptionsButtonText: {
        color: color.accent
    },

    opacityText: {
        marginTop: 40,
        fontSize: 20,
        fontWeight: '900',
        color: `${color.black}40`
    },

    group: {
        padding: 10,
        marginBottom: 10,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    groupText: {
        color: color.accent,
        marginLeft: 10
    }
})