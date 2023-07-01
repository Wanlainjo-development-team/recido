import { StyleSheet, StatusBar, Dimensions } from "react-native"
import color from "../../style/color"

const { height } = Dimensions.get('screen')

export default StyleSheet.create({
    container: {
        backgroundColor: color.dark,
        height
    },

    ball: {
        width: 200,
        height: 200,
        backgroundColor: color.accent,
        position: 'absolute',
        top: '25%',
        left: '25%',
        borderRadius: 100,
        opacity: .15
    },

    blur: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 0
    },

    contentView: {
        alignItems: 'flex-start',
        width: '100%'
    },

    appName: {
        fontSize: 40,
        fontWeight: '900',
        color: color.mainBackground,
        marginVertical: 30
    },

    stepView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    stepButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.accent,
        marginBottom: 20,
        marginLeft: 20
    },

    logoButton: {
        width: 150,
        borderRadius: 100,
        height: 150,
        alignSelf: 'center',
        backgroundColor: color.dark,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },

    inputView: {
        flex: 1,
        height: 50,
        borderRadius: 50,
        backgroundColor: color.dark,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: `${color.mainBackground}50`
    },

    input: {
        height: '100%',
        flex: 1,
        paddingHorizontal: 10,
        color: color.white
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

    lastText: {
        marginVertical: 20,
        color: color.white,
        justifyContent: 'center'
    },

    lastTextButtonText: {
        color: color.white,
        margin: 0,
        marginBottom: -3,
        padding: 0,
        fontWeight: '900'
    },

    button: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 10
    },

    gragient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1.5
    },

    overlay: {
        backgroundColor: color.dark,
        width: '100%',
        height: '100%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        color: color.mainBackground,
        fontWeight: '600'
    }
})