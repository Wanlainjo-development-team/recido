import { StyleSheet, StatusBar, Platform } from "react-native"
import color from "../../style/color"

export default StyleSheet.create({
    container: {
        backgroundColor: color.transparent,
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 20,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    backButton: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `${color.accent}40`,
        borderRadius: 12
    },

    left: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    title: {
        fontWeight: '900',
        marginLeft: 20,
        fontSize: 20,
        opacity: .40
    }
})