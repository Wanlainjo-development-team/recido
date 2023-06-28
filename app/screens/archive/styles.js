import { StyleSheet } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10
    },
    loadingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingViewImage: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },

    indicator: {
        position: 'absolute'
    },

    loadingViewText: {
        textAlign: 'center',
        marginTop: 10
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
        backgroundColor: color.accent,
        height: 45,
        width: 45,
        borderRadius: 12,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
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

    left: {
        alignItems: 'flex-start'
    },

    right: {
        alignItems: 'flex-end'
    },

    boldText: {
        fontWeight: '600'
    },
})