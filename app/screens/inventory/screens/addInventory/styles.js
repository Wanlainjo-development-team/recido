import { StyleSheet } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground
    },

    scrollView: {
        padding: 10
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

    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },

    deleteButton: {
        width: 45,
        height: 45,
        backgroundColor: `${color.red}40`,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    deleteButtonText: {
        fontWeight: 'bold'
    },

    saveButton: {
        backgroundColor: color.accent,
        flex: 1,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    saveButtonText: {
        color: color.white,
        fontWeight: '600'
    },

    controls: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})