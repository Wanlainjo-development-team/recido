import { StyleSheet } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingHorizontal: 10,
    },

    group: {
        marginBottom: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: `${color.accent}40`
    },

    groupText: {
        marginLeft: 10,
        width: '33.3333333333%',
        textAlign: 'center'
    }
})