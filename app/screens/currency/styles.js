import { StyleSheet } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
    },

    head: {
        height: 50,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headText: {
        color: color.accent,
        fontWeight: '800'
    },

    group: {
        marginBottom: 10,
        height: 50,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`
    },

    groupText: {
        color: color.accent,
        marginLeft: 10,
        width: '33.3333333333%',
        textAlign: 'center'
    }
})