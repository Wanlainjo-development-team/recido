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

    saveButton: {
        backgroundColor: color.accent,
        height: 45,
        margin: 10,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    saveButtonText: {
        color: color.white,
        fontWeight: '600'
    }
})