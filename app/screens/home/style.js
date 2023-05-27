import { StyleSheet, StatusBar } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: 'center'
    },

    floatingButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.accent,
        position: 'absolute',
        bottom: 10,
        right: 10
    }
})