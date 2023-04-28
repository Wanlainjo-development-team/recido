import { View, Text, Animated, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Pressable, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'

// Colors
import color from '../style/color';

// style
import nav from '../style/navigation';
import { header } from '../style/header';

// icons
import { AntDesign, Feather, FontAwesome, Ionicons, SimpleLineIcons, Octicons } from '@expo/vector-icons'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';

import { setActiveRoute, setAuth, setUser } from '../features/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window')

const CustomNavigation = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { profile, activeRoute } = useSelector(state => state.user)
    const [currentTab, setCurrentTab] = useState('Home')
    const [showMenu, setShowMenu] = useState(false)

    const offsetValue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(1)).current
    const closeButtonOffset = useRef(new Animated.Value(0)).current

    return (
        <View style={[nav.drawerContainer, { backgroundColor: color.mainBackground }]}>
            <StatusBar style="dark" />

            <View style={nav.drawerView}>
                <View style={nav.headDetails}>
                    {
                        !profile?.photoURL ?
                            <View style={[nav.avatarPlaceholderView, { backgroundColor: color.white }]}>
                                <FontAwesome name='user-o' size={32} color={color.black} />
                            </View> :
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    navigation.navigate('Profile')
                                    setCurrentTab('Home')

                                    Animated.timing(scaleValue, {
                                        toValue: showMenu ? 1 : 0.88,
                                        duration: 100,
                                        useNativeDriver: true
                                    }).start()

                                    Animated.timing(offsetValue, {
                                        toValue: showMenu ? 0 : -(width / 1.5),
                                        duration: 100,
                                        useNativeDriver: true
                                    }).start()

                                    Animated.timing(closeButtonOffset, {
                                        toValue: !showMenu ? -30 : 0,
                                        duration: 100,
                                        useNativeDriver: true
                                    }).start()

                                    setShowMenu(!showMenu)
                                }}
                            >
                                <Image source={{ uri: profile?.photoURL }} style={nav.mainAvatar} />
                            </TouchableWithoutFeedback>
                    }

                    {
                        profile?.username != undefined &&
                        <>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('Profile')
                                    setCurrentTab('Match')

                                    Animated.timing(scaleValue, {
                                        toValue: showMenu ? 1 : 0.88,
                                        duration: 100,
                                        useNativeDriver: true
                                    }).start()

                                    Animated.timing(offsetValue, {
                                        toValue: showMenu ? 0 : -(width / 1.5),
                                        duration: 100,
                                        useNativeDriver: true
                                    }).start()

                                    Animated.timing(closeButtonOffset, {
                                        toValue: !showMenu ? -30 : 0,
                                        duration: 100,
                                        useNativeDriver: true
                                    }).start()

                                    setShowMenu(!showMenu)
                                }}
                                style={nav.usernameButton}
                            >
                                <Text numberOfLines={1} style={{ ...nav.username, color: color.dark }}>{profile?.username}</Text>
                            </Pressable>
                        </>
                    }
                </View>

                <ScrollView style={{ flexGrow: 1, marginTop: 50 }} showsVerticalScrollIndicator={false}>
                    {TabButton(profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Home', 'Home')}
                    {TabButton(profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Create Invoice', 'CreateInvoice')}
                    {TabButton(profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'History', 'History')}
                </ScrollView>
                {/*  */}
                {TabButton(profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Log out')}
            </View>

            {
                showMenu &&
                <Animated.View
                    style={{
                        flexGrow: 1,
                        backgroundColor: color.transparent,
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1000,
                        borderRadius: showMenu ? 25 : 0,
                        overflow: 'hidden',
                        transform: [
                            { scale: scaleValue },
                            { translateX: offsetValue }
                        ]
                    }}
                >
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: color.transparent }}
                        onPress={() => {
                            Animated.timing(scaleValue, {
                                toValue: showMenu ? 1 : 0.88,
                                duration: 100,
                                useNativeDriver: true
                            }).start()

                            Animated.timing(offsetValue, {
                                toValue: showMenu ? 0 : -(width / 1.5),
                                duration: 100,
                                useNativeDriver: true
                            }).start()

                            Animated.timing(closeButtonOffset, {
                                toValue: !showMenu ? -30 : 0,
                                duration: 100,
                                useNativeDriver: true
                            }).start()

                            setShowMenu(!showMenu)
                        }}
                    />
                </Animated.View>
            }

            <Animated.View
                style={{
                    flexGrow: 1,
                    backgroundColor: color.mainBackground,
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: showMenu ? 25 : 0,
                    transform: [
                        { scale: scaleValue },
                        { translateX: offsetValue }
                    ],
                    shadowColor: showMenu ? color.black : color.transparent,
                    shadowOffset: {
                        width: 0,
                        height: showMenu ? 12 : 0,
                    },
                    shadowOpacity: showMenu ? 0.58 : 0,
                    shadowRadius: showMenu ? 16.00 : 0,
                    elevation: showMenu ? 24 : 0
                }}
            >
                <Animated.View style={{
                    flex: 1,
                    transform: [{
                        translateY: closeButtonOffset
                    }]
                }}>
                    <View>
                        <View style={[header.container, { backgroundColor: color.transparent }]}>
                            <View style={header.leftContainer}>
                                <Text style={{ ...header.logo, color: color.black }}>Recido</Text>
                            </View>

                            <View style={header.rightContainer}>
                                <TouchableOpacity
                                    style={{
                                        width: 45,
                                        height: 45,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: `${color.accent}20`,
                                        borderRadius: 8
                                    }}
                                    onPress={() => {
                                        setCurrentTab(activeRoute)

                                        Animated.timing(scaleValue, {
                                            toValue: showMenu ? 1 : 0.88,
                                            duration: 100,
                                            useNativeDriver: true
                                        }).start()

                                        Animated.timing(offsetValue, {
                                            toValue: showMenu ? 0 : -(width / 1.5),
                                            duration: 100,
                                            useNativeDriver: true
                                        }).start()

                                        Animated.timing(closeButtonOffset, {
                                            toValue: !showMenu ? -30 : 0,
                                            duration: 100,
                                            useNativeDriver: true
                                        }).start()

                                        setShowMenu(!showMenu)
                                    }}
                                >
                                    <Feather name="menu" size={24} color={color.accent} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <BottomNavigation />
                </Animated.View>
            </Animated.View>
        </View>
    )
}

const TabButton = (profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, title, nav) => {
    const navigation = useNavigation()
    // const dispatch = useDispatch()

    const logoutUser = async () => {
        await AsyncStorage.removeItem('recido_user')
        dispatch(setAuth(null))
        dispatch(setUser(null))
    }

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
                if (title == 'Log out') {
                    logoutUser()
                } else {
                    if (nav == 'Home' || nav == 'CreateInvoice' || nav == 'History') {
                        dispatch(setActiveRoute(nav))
                        navigation.navigate(nav)
                        setCurrentTab(nav)
                        Animated.timing(scaleValue, {
                            toValue: showMenu ? 1 : 0.88,
                            duration: 100,
                            useNativeDriver: true
                        }).start()

                        Animated.timing(offsetValue, {
                            toValue: showMenu ? 0 : -(width / 1.5),
                            duration: 100,
                            useNativeDriver: true
                        }).start()

                        Animated.timing(closeButtonOffset, {
                            toValue: !showMenu ? -30 : 0,
                            duration: 100,
                            useNativeDriver: true
                        }).start()
                        setShowMenu(!showMenu)
                    } else {
                        navigation.navigate(nav)
                        setCurrentTab(nav)
                        Animated.timing(scaleValue, {
                            toValue: showMenu ? 1 : 0.88,
                            duration: 100,
                            useNativeDriver: true
                        }).start()

                        Animated.timing(offsetValue, {
                            toValue: showMenu ? 0 : -(width / 1.5),
                            duration: 100,
                            useNativeDriver: true
                        }).start()

                        Animated.timing(closeButtonOffset, {
                            toValue: !showMenu ? -30 : 0,
                            duration: 100,
                            useNativeDriver: true
                        }).start()
                        setShowMenu(!showMenu)
                    }
                }
            }}>
            <View
                style={[title == 'Log out' ? {
                    height: 45,
                    borderRadius: 8,
                    backgroundColor: color.white,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingLeft: 20
                } :
                    currentTab == nav ? {
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 8,
                        paddingLeft: 15,
                        marginTop: 10,
                        height: 50,
                        borderRightWidth: currentTab == nav ? 5 : 0,
                        borderColor: currentTab == nav ? color.accent : color.transparent,
                        marginHorizontal: 5
                    } : {
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: currentTab == nav ? color.white : color.transparent,
                        borderRadius: 8,
                        paddingLeft: 15,
                        marginTop: 10,
                        height: 45,
                        borderRightWidth: currentTab == nav ? 5 : 0,
                        borderColor: currentTab == nav ? color.accent : color.transparent
                    }]}
            >
                {title == 'Log out' && <SimpleLineIcons name="logout" size={20} color={color.accent} style={{ marginRight: 15 }} />}
                {/*  */}
                {/*  */}
                {nav == 'Home' && <Feather name="home" size={24} color={color.accent} style={{ marginRight: 15 }} />}
                {nav == 'CreateInvoice' && <Ionicons name="create-outline" size={24} color={color.accent} style={{ marginRight: 15 }} />}
                {nav == 'History' && <Octicons name="history" size={24} color={color.accent} style={{ marginRight: 15 }} />}
                {/*  */}
                {/*  */}
                {/*  */}
                {/*  */}
                <Text style={{ fontSize: 15, color: title == 'Log out' ? color.accent : (currentTab == nav ? color.dark : color.dark) }}>{title}</Text>
                {/*  */}
                <View style={{ flex: 1 }} />
            </View>
        </TouchableOpacity>
    )
}
export default CustomNavigation