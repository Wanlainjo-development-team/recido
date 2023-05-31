import { StyleSheet, StatusBar } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        backgroundColor: color.transparent,
        marginTop: StatusBar.currentHeight + 20,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },

    backButton : {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    }
})