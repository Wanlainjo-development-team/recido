import { StyleSheet, StatusBar } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10
    },

    themeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: color.mainBackground,
        marginBottom: 30
    },

    theme: {
        borderRadius: 12,
        overflow: 'hidden'
    },

    actionButton: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`,
        marginBottom: 10,
        justifyContent: 'center'
    },

    actionButtonTitle: {
        fontSize: 18
    },

    actionButtonSubTitle: {
        opacity: .50
    },

    logoutButton: {
        marginTop: 20,
        backgroundColor: `${color.red}40`,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 45,
        borderRadius: 12,
        paddingHorizontal: 10,
        marginBottom: 10
    },

    logoutButtonText: {
        color: color.red,
        fontWeight: '600'
    },

    versionView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },

    versionAppName: {
        opacity: .40,
        fontWeight: '900',
        fontSize: 20
    },
})