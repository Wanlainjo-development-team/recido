import { StyleSheet, StatusBar } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: color.white,
        padding: 10,
        borderRadius: 12
    },

    left: {
        alignItems: 'flex-start'
    },

    right: {
        alignItems: 'flex-end'
    },

    boldText: {
        fontWeight: '600'
    }
})