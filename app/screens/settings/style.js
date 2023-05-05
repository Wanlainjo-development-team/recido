import { StyleSheet, StatusBar } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 20,
        backgroundColor: color.mainBackground,
    },

    profileImageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },

    profileImage: {
        backgroundColor: color.white,
        borderRadius: 100,
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 10
    },

    formView: {
        paddingHorizontal: 20,
        marginVertical: 20
    },

    inputView: {
        marginBottom: 30
    },

    inputText: {
        fontSize: 13
    },

    input: {
        backgroundColor: `${color.accent}20`,
        height: 45,
        marginTop: 10,
        borderRadius: 12,
        paddingHorizontal: 10,
        fontWeight: '600'
    },

    invoicePlaceholderButton: {
        width: '100%',
        minHeight: 250,
        backgroundColor: `${color.accent}20`,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    invoicePlaceholderButtonText: {},

    saveButton: {
        backgroundColor: color.accent,
        margin: 10,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    saveButtonText: {
        color: color.white
    }
})