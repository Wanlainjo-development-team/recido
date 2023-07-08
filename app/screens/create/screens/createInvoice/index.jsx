import { View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Keyboard, Alert, ActivityIndicator, Modal, Pressable } from 'react-native'
import React, { useCallback, useRef, useState, useEffect } from 'react'

import styles from './styles'

import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'

import {
  setSubTotal,
  setVat,
  setTotal,
  updateItems,
  setInvoiceId,
} from '../../../../features/useFormSlice'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import color from '../../../../style/color'

import { itemsStyle } from './screens/styles'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { addDoc, collection, doc, getDoc, getDocs, increment, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { db } from '../../../../hooks/firebase';
import { BlurView } from 'expo-blur'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})





const CreateInvoice = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const { profile } = useSelector(state => state.user)
  const { currentInvoiceId } = useSelector(state => state.invoices)

  const {
    invoiceId,
    date,
    invoiceContact,
    city,
    state,
    zip,
    country,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    items,
    note,
    vat
  } = useSelector(state => state.form)

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [totalCalculation, setTotalCalculation] = useState({})
  const [loading, setLoading] = useState(false)
  const [uploadable, setUploadable] = useState(true)
  const [modalVisible, setModalVisible] = useState({
    existingItems: [],
    active: false
  })
  const [currentInvoice, setCurrentInvoice] = useState(null)

  useEffect(() => {
    (async () => {
      const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

      if (!currentInvoiceId) return

      const unsub = onSnapshot(doc(db, "users", id, 'invoices', currentInvoiceId), (doc) => {
        setCurrentInvoice(doc.data())
      });

      return unsub
    })()
  }, [])

  useEffect(() => {
    (() => {
      dispatch(setInvoiceId(invoiceId ? invoiceId : profile?.invoice))
    })()
  }, [profile])

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => { });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const calculateSubTotalPromise = arr => {
    return new Promise((resolve, reject) => {
      let total = 0;

      for (let i = 0; i < arr.length; i++) {
        const prop = arr[i];
        let price = prop?.price * prop?.quantity;
        total += price;
      }

      const formattedResult = {
        subTotal: total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        totalVAT: 0,
        finalPrice: total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      };

      resolve(formattedResult);
    });
  };

  useFocusEffect(
    useCallback(() => {
      calculateSubTotalPromise(items)
        .then(result => {
          setTotalCalculation({ ...result });
          dispatch(setSubTotal(result.subTotal));
          dispatch(setVat(result.totalVAT));
          dispatch(setTotal(result.finalPrice));
        });

      return () => { };
    }, [items])
  );


  const saveInvoice = async () => {
    //get current logged in user's id
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

    //check if user has input customer information or selected a customer from their cuntact list
    if (!invoiceContact) {
      // if the user has not selected a customer and they want to save: send an alert notification telling the user to select a customer
      Alert.alert('Add customer', 'Customer information is required 🛍️🛍️')

      //then end the function until the process ic carried out
      return
    }

    // check if the user has added an item or more
    if (items.length < 1) {
      // if the user has not added any item: send an alert notification, informing the user they they need to add an item
      Alert.alert('Add an item', 'Items are required\nadd a minimum of one item 🛍️🛍️')

      // Then end the function here until this process is carried out
      return
    }

    // if the user has a customer selected and an item selected start the loading
    setLoading(true)


    // loop through over every selected item
    for (let i = 0; i < items.length; i++) {
      // save each item to the valueof 'x' after every loop
      const x = items[i];

      // check if the selected item has an ID attache to it
      if (!x.inventoryId) {
        setLoading(false)
        
        setUploadable(true)

        startUpload(id)

        return
      }

      // if this item has an ID attached to it then find it in the database
      const currentInventoryItem = await getDoc(doc(db, 'users', id, 'inventory', x.inventoryId));

      // check if the quantity of items the user wants to sell is enough in stock to sell
      if (parseFloat(x.quantity) > currentInventoryItem.data().quantity) {
        setLoading(false) // stop the loading if the items the user want's to sell is more than what is in stock


        // this promise runs to deside if an item is in stock or not.
        // if it's in stock, the prompts will not come up,
        // but if it's not in stock then it prompts the user to update the inventory
        const result = await new Promise((resolve) => {
          Alert.alert(
            'Stock warning ⚠️⚠️⚠️',
            `${x.name} is not up to stock 😢😢`,
            [
              {
                text: 'Open inventory',
                onPress: () =>
                  navigate('AddInventory', { viewItem: { inventoryId: currentInventoryItem.id, ...currentInventoryItem.data() } }),
              },
              {
                text: 'Proceed',
                onPress: () => resolve('proceed'),
                style: 'destructive',
              },
              {
                text: 'Cancel',
                onPress: () => resolve('cancel'),
                style: 'destructive',
              },
            ],
            { cancelable: false }
          );
        });

        if (result === 'proceed') {
          setUploadable(true);
        } else {
          setUploadable(false);
          break;
        }
      }
    }

    if (uploadable) startUpload(id)
  }

  const saveObject = {
    invoiceId,
    date,
    invoiceContact,
    city,
    state,
    zip,
    country,
    shippingCity,
    shippingState,
    shippingZip,
    shippingCountry,
    items,
    invoiceState: 'outstanding',
    note: note != '' ? note : profile?.disclaimer,
    vat,
    createdAt: serverTimestamp()
  }

  const startUpload = async id => {
    if (invoiceContact && items.length >= 1) {
      setLoading(true)

      const checkExistingItems = async () => {
        const nonExistingItems = [];

        await Promise.all(
          items.map(async (item) => {
            const querySnapshot = await getDocs(
              query(collection(db, "users", id, "inventory"), where("name", "==", item?.name))
            );

            if (querySnapshot.docs.length < 1) {
              nonExistingItems.push({ ...item });
            }
          })
        );

        return nonExistingItems;
      };


      checkExistingItems()
        .then((nonExistingItems) => {
          if (nonExistingItems.length >= 1) {
            setLoading(false)
            Alert.alert('New item alert', `${nonExistingItems.length} ${nonExistingItems.length == 1 ? 'item' : 'items'} in your invoice don't exist in your inventory.\n Would you like to add ${nonExistingItems.length == 1 ? 'it' : 'them'}?`, [
              {
                text: 'Ok',
              },
              {
                text: `${nonExistingItems.length == 1 ? 'Add item' : 'Add items'}`,
                onPress: () => setModalVisible({ existingItems: nonExistingItems, active: true })
              }
            ])


            return
          }
        })
        .catch(() => {
          setLoading(false)

          return
        });

      const q = await getDocs(query(collection(db, 'users', id, 'invoices'), where("invoiceId", "==", invoiceId)));

      if (q.docs.length >= 1) {
        Alert.alert('Duplicate invoice ⚠️⚠️⚠️', 'There seem to be an invoice saved with this unique identifier.\nPlease change the invoice number and try again.', [
          {
            text: 'Ok',
            onPress: () => setLoading(false)
          },
          {
            text: 'Edit invoice ID',
            onPress: () => {
              setLoading(false)
              navigate('SetInvoice')
            }
          }
        ])
        return
      } else {
        items.forEach(async item => {
          if (item?.inventoryId)
            await updateDoc(doc(db, 'users', id, 'inventory', item?.inventoryId), {
              quantity: increment(-parseFloat(item?.quantity))
            })

          await schedulePushNotification('Inventory recalculation', `${item?.quantity} pieces of ${item?.name} has been removed from your inventory`, null)

          setLoading(false)
        })

        await addDoc(collection(db, 'users', id, 'invoices'), saveObject)

        Alert.alert('Invoice saved', 'Invoice was saved successfully 🎉🎉')

        const querySnapshot = await getDocs(query(collection(db, "users", id, 'customers'), where("name", "==", invoiceContact?.name)))

        if (querySnapshot.docs.length <= 0)
          await addDoc(collection(db, 'users', id, 'customers'), {
            ...invoiceContact,
            invoiceId,
            city,
            state,
            zip,
            country,
            createdAt: serverTimestamp()
          })

        await updateDoc(doc(db, 'users', id), {
          invoice: increment(1)
        })

        setLoading(false)


        await schedulePushNotification('Invoice saved', 'Invoice was saved successfully 🎉🎉', null)
      }

    }
  }

  const deleteItem = async item => {
    const updatedArray = modalVisible.existingItems.filter(obj => obj.inventoryId !== item.inventoryId);

    setModalVisible({ existingItems: updatedArray })

    dispatch(updateItems(updatedArray))
  }

  const saveFinishedInvoice = async item => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

    const q = await getDocs(query(collection(db, 'users', id, 'invoices'), where("invoiceId", "==", invoiceId)));

    if (q.docs.length >= 1) return

    await addDoc(collection(db, 'users', id, 'inventory'), {
      name: item?.name,
      price: item?.price,
      description: item?.description,
      quantity: increment(parseFloat(item?.quantity)),
      createdAt: serverTimestamp()
    })

    await schedulePushNotification('Item added', `${item?.name} has been added to your inventory successfully 🎉🎉`, null)

    setModalVisible({ ...modalVisible, active: false })
  }

  const promptItem = item => {
    Alert.alert('Save item', `Would you like to save ${item?.name} to your inventory?`, [
      {
        text: 'Delete Item',
        style: 'destructive',
        onPress: () => deleteItem(item)
      },
      {
        text: 'Save Item',
        style: 'default',
        onPress: () => saveFinishedInvoice(item)
      }
    ], { cancelable: false })
  }

  const setInvoiceState = async state => {
    const id = JSON.parse(await AsyncStorage.getItem('recido_user'))?.user?.uid

    setLoading(true)

    await updateDoc(doc(db, 'users', id, 'invoices', currentInvoiceId), { invoiceState: state })

    setLoading(false)
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible.active}
            onRequestClose={() => {
              setModalVisible({ ...modalVisible, active: !modalVisible.active });
            }}>
            <BlurView intensity={50} style={{ ...styles.modealContainer, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.modalView}>
                <View style={{ ...styles.modalViewHead, marginBottom: 15 }}>
                  <Text style={styles.modalViewHeadText}>Save items</Text>

                  <TouchableOpacity
                    style={{ ...styles.backButton, height: 40, width: 40 }}
                    onPress={() => setModalVisible({ ...modalVisible, active: !modalVisible.active })}>
                    <AntDesign name="close" size={24} color={color.accent} />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalViewBody}>
                  {
                    modalVisible.existingItems.length >= 1 ?
                      <>
                        {
                          modalVisible.existingItems.map((item, index) => (
                            <Pressable key={index} onPress={() => promptItem(item)} style={{ ...styles.list, backgroundColor: color.white, height: 45, paddingHorizontal: 10, borderRadius: 12, marginBottom: (index + 1) == modalVisible.existingItems.length ? 0 : 10 }}>
                              <View style={styles.left}>
                                <Text style={styles.boldText}>{item?.name}</Text>
                                <Text>{item?.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} Left</Text>
                              </View>
                              <View style={styles.right}>
                                <Text>{profile?.denom?.sign || '$'}{item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                              </View>
                            </Pressable>
                          ))
                        }
                      </> :
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>All items have been cleard</Text>
                      </View>
                  }
                </View>
              </View>
            </BlurView>
          </Modal>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.group}>
              <TouchableOpacity style={{ ...styles.setInvoiceView, marginBottom: 0 }} onPress={() => navigate('SetInvoice')}>
                <View style={styles.setInvoiceLeftView}>
                  <Text style={styles.setInvoiceLeftViewBoldText}>{new Date(date).toDateString()}</Text>
                </View>
                <Text style={styles.setInvoiceLeftViewBoldText}>{invoiceId}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.group, marginBottom: 0 }}>
              <TouchableOpacity style={{ ...styles.setInvoiceView, marginBottom: 0 }} onPress={() => invoiceContact ? navigate('AddNewCustomer', { directSave: false, invoiceContact }) : navigate('BillTo', { directSave: false })}>
                <View style={styles.setInvoiceLeftView}>
                  <Text style={styles.setInvoiceLeftViewBoldText}>Bill To</Text>
                  {
                    invoiceContact ?
                      <Text style={{ marginTop: 10 }}>{invoiceContact?.name}</Text> :
                      <View style={styles.plusView}>
                        <AntDesign name="pluscircleo" size={22} color={color.accent} />
                        <Text style={styles.plusViewText}>Add customer</Text>
                      </View>
                  }
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ height: 1, width: '100%', backgroundColor: `${color.accent}30`, marginVertical: 20 }} />

            <View style={styles.group}>
              <View style={{ ...styles.setInvoiceView, marginBottom: 0 }}>
                <View style={{ ...styles.setInvoiceLeftView, width: '100%' }}>
                  <Text style={{ ...styles.setInvoiceLeftViewBoldText, marginBottom: 10 }}>Items</Text>
                  {
                    items.length >= 1 &&
                    <>
                      {
                        items.map((item, index) => (
                          <View key={index}>
                            <TouchableOpacity onPress={() => navigate('CreateItem', { editItem: { ...item, index } })} style={itemsStyle.group}>
                              <View style={itemsStyle.section1}>
                                <Text style={itemsStyle.groupOpacityText}>Item</Text>
                                <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{item?.name}</Text>
                              </View>
                              <View style={itemsStyle.section2}>
                                <Text style={itemsStyle.groupOpacityText}>Quantity</Text>
                                <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{(item?.quantity)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                              </View>
                              <View style={itemsStyle.section3}>
                                <Text style={itemsStyle.groupOpacityText}>Unit Price</Text>
                                <Text style={itemsStyle.groupBoldText} numberOfLines={1}>{(item?.price)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
                              </View>
                            </TouchableOpacity>

                            <View style={{ ...styles.divider, marginVertical: 10 }} />
                          </View>
                        ))
                      }
                    </>
                  }
                  <TouchableOpacity onPress={() => navigate('Items')} style={styles.plusView}>
                    <AntDesign name="pluscircleo" size={22} color={color.accent} />
                    <Text style={styles.plusViewText}>Add items</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.group}>
              <View style={{ ...styles.setInvoiceView, marginBottom: 0 }}>
                <View style={{ ...styles.setInvoiceLeftView, width: '100%' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.setInvoiceLeftViewBoldText}>Total</Text>
                  </View>
                  <View style={{ ...styles.list, marginTop: 10 }}>
                    <Text>Subtotal</Text>
                    <Text>{profile?.denom?.sign || '$'}{totalCalculation.subTotal}</Text>
                  </View>
                  <View style={styles.list}>
                    <Text>TAX ({vat}%)</Text>
                    <Text>{profile?.denom?.sign || '$'}{totalCalculation.totalVAT}</Text>
                  </View>
                  <View style={styles.list}>
                    <Text>Total</Text>
                    <Text>{profile?.denom?.sign || '$'}{totalCalculation.finalPrice}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ ...styles.group, marginBottom: 30 }}>
              <TouchableOpacity onPress={() => navigate('Note', { editNote: null })} style={styles.plusView}>
                <AntDesign name="pluscircleo" size={22} color={color.accent} />
                <Text style={styles.plusViewText}>Notes</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigate('Note', { editNote: note })} style={{ ...itemsStyle.group, height: null }}>
                <Text>{note != '' ? note : profile?.disclaimer}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.floatingView}>
            {
              currentInvoiceId &&
              <View style={{ width: '49%' }}>
                {
                  currentInvoice?.invoiceState == 'outstanding' &&
                  <TouchableOpacity onPress={() => setInvoiceState('paid')} style={{ ...styles.floatingButton, width: '100%', backgroundColor: `${color.accent}40` }}>
                    <Text style={{ ...styles.floatingButtonText, color: color.accent }}>Mark as paid</Text>
                  </TouchableOpacity>
                }
                {
                  currentInvoice?.invoiceState == 'paid' &&
                  <TouchableOpacity onPress={() => setInvoiceState('outstanding')} style={{ ...styles.floatingButton, width: '100%', backgroundColor: `${color.accent}40` }}>
                    <Text style={{ ...styles.floatingButtonText, color: color.accent }}>Mark as outstanding</Text>
                  </TouchableOpacity>
                }
              </View>
            }

            {!currentInvoiceId && <View />}

            <TouchableOpacity onPress={async () => await saveInvoice()} style={{ ...styles.floatingButton, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              {loading && <ActivityIndicator style={{ marginRight: 10 }} color={color.white} />}
              <Text style={styles.floatingButtonText}>Save invoice</Text>
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

async function schedulePushNotification(title, body, data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
      sound: true
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export default CreateInvoice