import { StyleSheet } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
    },

    scrollView: {
        padding: 10
    },

    headingView: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    actionsView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    action: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${color.accent}40`,
        borderRadius: 12,
        marginLeft: 10
    },

    actionIcon: {},

    headingText: {
        fontSize: 30,
        fontWeight: '900',
        opacity: 0.40,
        marginBottom: 10
    },

    inputView: {
        marginBottom: 30,
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`
    },

    inputViewText: {
        fontWeight: '600'
    },

    inputViewTextInput: {
        height: 45
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
})