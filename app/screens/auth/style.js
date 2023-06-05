import { StyleSheet, StatusBar, Dimensions } from "react-native"
import color from "../../style/color"

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: color.mainBackground
    },

    subContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        width: '100%',
        borderRadius: 20,
    },

    headText: {
        fontSize: 25,
        alignSelf: 'center',
        marginBottom: 30,
        fontWeight: '600'
    },

    inputView: {
        width: '100%',
        height: 55,
        borderRadius: 10,
        backgroundColor: color.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: `${color.accent}50`
    },

    input: {
        height: '100%',
        flex: 1,
        paddingHorizontal: 10
    },

    inputIcon: {
        width: 55,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    submitButton: {
        width: this.input,
        backgroundColor: color.accent,
        height: 55,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },

    submitButtonText: {
        color: color.white,
        fontSize: 18
    },

    buttomButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttomButtonText: {
        fontSize: 16,
        color: color.accent
    },

    lastText: {
        marginBottom: 20,
        fontSize: 16
    },

    lastTextButtonText: {
        color: color.accent,
        fontWeight: '900'
    }
})