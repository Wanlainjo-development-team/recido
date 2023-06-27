import { StyleSheet, StatusBar, Dimensions } from "react-native";
import color from "../../../../style/color";

const { width } = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
    },

    modealContainer: {
        flex: 1
    },

    modalViewHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    modalViewHeadText: {
        fontWeight: '600'
    },

    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${color.accent}20`,
        borderRadius: 12
    },

    modalButton: {
        height: 45,
        backgroundColor: `${color.accent}20`,
        marginTop: 10,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalButtonText: {
        color: color.accent,
        fontWeight: '600'
    },

    modalView: {
        width: width - 40,
        backgroundColor: color.mainBackground,
        borderRadius: 20,
        padding: 20,
        shadowColor: color.accent,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    scrollView: {
        flex: 1,
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
    },

    floatingView: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderRadius: 100,
        shadowColor: color.accent,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },

    floatingSubButtons: {
        backgroundColor: color.accent,
        height: 40,
        borderRadius: 50,
        paddingLeft: 5,
        paddingVertical: 5
    },

    floatingSubButton: {
        paddingRight: 70,
        backgroundColor: color.darkAccent,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        paddingLeft: 5
    },

    floatingSubButtonText: {
        color: color.white
    },

    floatingButton: {
        width: 60,
        height: 60,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.accent,
        position: 'absolute',
        bottom: 0,
        right: 0,
        shadowColor: color.accent,
        shadowOffset: {
            width: 6,
            height: -6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
})