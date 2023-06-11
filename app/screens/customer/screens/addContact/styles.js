import { StyleSheet } from "react-native";
import color from "../../../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        padding: 10,
        paddingTop: 30
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
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    groupText: {
        color: color.accent,
        marginLeft: 10
    }
})