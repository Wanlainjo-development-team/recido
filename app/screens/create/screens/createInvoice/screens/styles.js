import { StyleSheet, StatusBar } from "react-native";
import color from "../../../../../style/color";

export const setInvoice = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
    },

    head: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10
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
        marginBottom: 10,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`
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
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },

    showMoreOptionsButtonText: {
        color: color.accent
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
})

export const itemsStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10,
        paddingTop: 20
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

    createNew: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    createNewText: {
        color: color.accent,
        marginLeft: 10
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

    flatList: {
        marginTop: 30,
    },

    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingVertical: 5
    },

    section1: {
        width: '33.333333333%'
    },

    section2: {
        width: '33.333333333%'
    },

    section3: {
        width: '33.333333333%'
    },

    groupOpacityText: {
        opacity: 0.4,
        fontSize: 12,
        marginBottom: 5
    },

    groupBoldText: {
        fontWeight: '800'
    },

    deleteItemButton: {
        marginTop: 10,
        backgroundColor: `${color.red}40`,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },

    deleteItemButtonText: {
        color: color.red,
        fontWeight: '600'
    },
})

export const noteStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
        paddingTop: 30
    },

    head: {
        height: 50,
        marginBottom: 20,
        paddingHorizontal: 10,
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
        height: 100,
        marginTop: 10,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontWeight: '600',
        maxHeight: 150
    },

    saveButton: {
        width: '100%',
        height: 45,
        borderRadius: 12,
        backgroundColor: color.accent,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    saveButtonText: {
        color: color.white
    }
})
