import { StyleSheet } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.dark
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
        padding: 20
    },

    contentView: {
        alignItems: 'flex-start',
        width: '100%'
    },

    appName: {
        fontSize: 40,
        fontWeight: '900',
        color: color.mainBackground
    },

    text: {
        fontSize: 18,
        color: color.mainBackground,
        marginVertical: 30
    },

    button: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden'
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