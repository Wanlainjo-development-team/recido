import { StyleSheet, StatusBar } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground
    },

    floatingButton: {
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.accent,
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },

    head: {
        height: 60,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`
    },

    input: {
        flex: 1,
        height: '100%',
        borderRadius: 10,
        padding: 10
    },

    searchConfigButton: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: `${color.accent}40`,
        borderRadius: 12
    }
})