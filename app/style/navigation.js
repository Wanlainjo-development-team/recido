import { StyleSheet, StatusBar, Dimensions, Platform } from "react-native";
import color from "./color";

const { width } = Dimensions.get('window')

export default StyleSheet.create({
    tabLabel: {
        fontSize: 15,
        fontWeight: "bold",
    },

    container: {
        flex: 1,
        backgroundColor: color.main
    },

    barStyle: {
        backgroundColor: color.white,
        height: 54,
        elevation: 0
    },

    avatar: {
        width: 30,
        height: 30,
        borderRadius: 50
    },

    image: {
        width: 25,
        height: 25
    },

    drawerContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },

    drawerView: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
        width: width / 1.5
    },

    headDetails: {
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarPlaceholderView: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: color.white,
        justifyContent: 'center',
        alignItems: 'center'
    },

    mainAvatar: {
        width: 100,
        height: 100,
        borderRadius: 100
    },

    usernameButton: {
        flexDirection: 'row',
        marginTop: 15
    },

    username: {
        fontSize: 20,
        marginRight: 10,
        color: color.white
    }
})