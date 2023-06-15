import { StyleSheet, StatusBar } from "react-native";
import color from "../../style/color";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.mainBackground,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 10,
    }
})