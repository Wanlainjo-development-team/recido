import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import color from '../style/color';
import nav from '../style/navigation';
import { header } from '../style/header';
import { Feather, FontAwesome, Ionicons, SimpleLineIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import { setActiveRoute, setAuth, setUser } from '../features/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../hooks/firebase';

const { width } = Dimensions.get('window');

const CustomNavigation = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { activeRoute, user, theme } = useSelector(state => state.user)
    const [currentTab, setCurrentTab] = useState('Home')
    const [showMenu, setShowMenu] = useState(false)

    const offsetValue = useRef(new Animated.Value(0)).current
    const scaleValue = useRef(new Animated.Value(1)).current
    const closeButtonOffset = useRef(new Animated.Value(0)).current

    const [profile, setProfile] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

                const unsub = onSnapshot(doc(db, "users", id), (doc) => {
                    setProfile(doc.data())
                });

                return unsub
            } catch (error) {

            }
        })()
    }, [db, user])

    return (
        <View style={[nav.drawerContainer, { backgroundColor: theme ? color.dark : color.mainBackground }]}>
            <StatusBar style={theme ? 'light' : 'dark'} />

            <View style={nav.drawerView}>
                <View style={nav.headDetails}>
                    {
                        profile?.photoURL ?
                            <View style={[nav.avatarPlaceholderView, { backgroundColor: theme ? `${color.black}30` : color.white }]}>
                                <FontAwesome name='user-o' size={32} color={theme ? color.white : color.black} />
                            </View> :
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    navigation.navigate('Settings')
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
                        profile?.name != undefined &&
                        <>
                            <Pressable
                                onPress={() => {
                                    navigation.navigate('Settings')
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
                                <Text numberOfLines={1} style={{ ...nav.username, color: theme ? color.white : color.dark, fontWeight: '600' }}>{profile?.name}</Text>
                            </Pressable>
                        </>
                    }
                </View>

                <ScrollView style={{ flexGrow: 1, marginTop: 20 }} showsVerticalScrollIndicator={false}>
                    {TabButton(theme, profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Home', 'Home')}
                    {TabButton(theme, profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Create Invoice', 'Create')}
                    {TabButton(theme, profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Invoices', 'Invoices')}
                    {TabButton(theme, profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Customers', 'Customers')}
                    {TabButton(theme, profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Inventory', 'Inventory')}
                    {TabButton(theme, profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Archive', 'Archive')}
                    {TabButton(theme, profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Settings', 'Settings')}
                </ScrollView>
                {/*  */}
                {TabButton(theme, profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, 'Log out')}
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
                    backgroundColor: theme ? color.dark : color.mainBackground,
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
                    shadowColor: showMenu ? (theme ? color.black : color.accent) : color.transparent,
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
                                <Text style={{ ...header.logo, color: theme ? `${color.white}80` : `${color.dark}80` }}>{profile?.name ? `${profile.name.substring(0, 12)}${profile?.name?.length > 12 ? '...' : ''}` : 'Recido'}</Text>
                            </View>

                            <View style={header.rightContainer}>
                                {
                                    !showMenu &&
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
                                }
                            </View>
                        </View>
                    </View>
                    <BottomNavigation />
                </Animated.View>
            </Animated.View>
        </View>
    )
}

const TabButton = (theme, profile, dispatch, currentTab, setCurrentTab, setShowMenu, showMenu, scaleValue, offsetValue, closeButtonOffset, title, nav) => {
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
                    if (nav == 'Home' || nav == 'Create' || nav == 'Invoices' || nav == 'Customers' || nav == 'Inventory' || nav == 'Archive' || nav == 'Settings') {
                        dispatch(setActiveRoute(nav))
                        navigation.navigate(nav, { viewInvoice: null })
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
                    backgroundColor: theme ? `${color.black}30` : color.white,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingLeft: 15
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
                <View style={{ width: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {title == 'Log out' && <SimpleLineIcons name="logout" size={20} color={color.red} style={{ marginRight: 15 }} />}
                    {/*  */}
                    {/*  */}
                    {nav == 'Home' && <Feather name="home" size={24} color={color.accent} />}
                    {nav == 'Create' && <Ionicons name="create-outline" size={24} color={color.accent} />}
                    {nav == 'Invoices' && <FontAwesome5 name="file-invoice-dollar" size={24} color={color.accent} />}
                    {nav == 'Customers' && <Feather name="users" size={24} color={color.accent} />}
                    {nav == 'Inventory' && <MaterialIcons name="storefront" size={24} color={color.accent} />}
                    {nav == 'Archive' && <Feather name="archive" size={22} color={color.accent} />}
                    {nav == 'Settings' && <Ionicons name="cog" size={24} color={color.accent} style={{ marginLeft: -6 }} />}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                    {/*  */}
                </View>
                <Text style={{ fontSize: 15, color: title == 'Log out' ? color.red : (currentTab == nav ? (theme ? color.white : color.dark) : (theme ? color.white : color.dark)) }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default CustomNavigation