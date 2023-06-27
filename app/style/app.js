import { StyleSheet } from "react-native";
import color from "./color";

export default StyleSheet.create({
    title1: {
        fontWeight: '900',
        opacity: .60,
    },

    title2: {
        fontSize: 20,
        opacity: .40,
        fontWeight: '900'
    },

    title3: {},

    title4: {},

    inputView: {
        marginBottom: 30
    },

    inputText: {
        fontSize: 12,
        opacity: .60
    },

    input: {
        height: 45,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`,
        fontWeight: '600'
    }
})