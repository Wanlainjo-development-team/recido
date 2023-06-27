import { StyleSheet } from "react-native";
import color from "./color";

export default StyleSheet.create({
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