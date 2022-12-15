import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { Divider, List, Card, IconButton, Button, Checkbox, } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";
import dummyDB from '../../../DummyDatas';
import { Context } from '../../store';

export default function index() {

  const [state, dispatch] = useContext(Context);
  const [selectedProductResponse, setSelectedProductResponse] = useState(null);
  const [selectedCategoryResponse, setSelectedCategoryResponse] = useState(null);
  const [selectedTimelineResponse, setSelectedTimelineResponse] = useState(1);
  const [selectedDeliveryTypeResponse, setSelectedDeliveryTypeResponse] = useState(1);
  const [selectedDayButtonResponse, setSelectedDayButtonResponse] = useState(1);
  const [checked, setChecked] = useState(false);
  const [orderTotal, setOrderTotal] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(20);

  const add_to_cart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  }

  const remove_from_cart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  }

  const change_cart_qty = (item, count) => {
    dispatch({ type: 'CHANGE_CART_QTY', payload: { id: item.id, qty: count } });
  }


  useEffect(() => {
    setOrderTotal(state.cart.reduce((acc,curr)=>acc + (curr.price_for_calculations * curr.qty ),0))
  }, [state])

  const DeliveryType = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Card style={[styles.deliveryType, { borderColor: selectedDeliveryTypeResponse === 1 ? "green" : "#fff" }]} onPress={() => { setSelectedDeliveryTypeResponse(1) }}>
          <Ionicons name="ios-flash-outline" size={25} style={{ alignSelf: 'center' }} color={selectedDeliveryTypeResponse === 1 ? "green" : "#bababa"} />
          <Text style={{ alignSelf: 'center' }}>Instant delivery</Text>
        </Card>
        <Card style={[styles.deliveryType, { borderColor: selectedDeliveryTypeResponse === 2 ? "green" : "#fff" }]} onPress={() => { setSelectedDeliveryTypeResponse(2) }}>
          <Ionicons name="time-outline" size={25} style={{ alignSelf: 'center' }} color={selectedDeliveryTypeResponse === 2 ? "green" : "#bababa"} />
          <Text style={{ alignSelf: 'center' }}>Scheduled delivery</Text>
        </Card>
      </View>
    )
  }
  const DayButton = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Card style={[styles.dayButton, { backgroundColor: selectedDayButtonResponse === 1 ? "green" : "#fff" }]} onPress={() => { setSelectedDayButtonResponse(1) }}>
          <Text style={{ alignSelf: 'center', color: selectedDayButtonResponse === 1 ? "#fff" : "#000" }}>Today</Text>
        </Card>
        <Card style={[styles.dayButton, { backgroundColor: selectedDayButtonResponse === 2 ? "green" : "#fff" }]} onPress={() => { setSelectedDayButtonResponse(2) }}>
          <Text style={{ alignSelf: 'center', color: selectedDayButtonResponse === 2 ? "#fff" : "#000" }}>Tommorrow</Text>
        </Card>
      </View>
    )
  }

  const renderCartProducts = ({ item, index }) => {
    return (
      <Card
        style={{
          backgroundColor: "#fff",
          padding: 5,
          margin: 5,
          borderColor:
            item.id === selectedProductResponse ? "green" : "#fff",
          borderWidth: 1,
        }}
        onPress={() => { setSelectedProductResponse(item.id) }}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ left: 10, flex: 1 }}>
            <Text style={{ fontSize: 16 }}>{item.item_name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.sale_price}</Text>
              {item.offer ?
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', alignSelf: 'center', left: 10, opacity: 0.3, textDecorationLine: 'line-through' }}>{item.original_price}</Text>
                  <View style={{ alignSelf: 'center', left: 15, backgroundColor: "#ffc65c", padding: 2, borderRadius: 5 }}>
                    <Text style={{ fontSize: 13, fontWeight: 'bold', color: "#fff" }}>{item.offer_tag}</Text>
                  </View>
                </View>
                :
                <View />
              }
            </View>


          </View>
          <View >
            <View style={{ backgroundColor: "#f0f0f0", flexDirection: "row", minWidth: "40%", top: 5, borderRadius: 5 }}>
              <View style={{ flex: 1 }}>
                <IconButton
                  icon="minus"
                  iconColor={"green"}
                  backgroundColor="#fff"
                  size={20}
                  style={{ width: 30, height: 30, borderRadius: 5, flex: 1 }}
                  onPress={() => {
                    setSelectedProductResponse(item.id)
                    item.qty === 1 ?
                    Alert.alert(
                      "Are you sure",
                      "Do you want to remove this item from cart",
                      [
          
                          { text: "Remove", onPress: () =>   remove_from_cart(item) },
                          { text: "Cancel", onPress: () => {} }
                      ]
                  )
                  
                    :
                    change_cart_qty(item, item.qty - 1)
                  }}
                />
              </View>
              <Text style={{ fontSize: 13, fontWeight: 'bold', color: "#fff", flex: 1, alignSelf: "center", color: "#bababa" }}> {item.qty} Nos</Text>
              <View style={{ flex: 0 }}>
                <IconButton
                  icon="plus"
                  iconColor={"green"}
                  backgroundColor="#fff"
                  size={20}
                  style={{ width: 30, height: 30, borderRadius: 5 }}
                  onPress={() => {
                    setSelectedProductResponse(item.id)
                    change_cart_qty(item, item.qty + 1)
                  }}
                />
              </View>
            </View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: "#000", flexDirection: 'row', flex: 1, alignSelf: 'flex-end', margin: 10 }}>₹{item.price_for_calculations * item.qty}</Text>
          </View>
        </View>
      </Card>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <FlatList
          data={state.cart}
          renderItem={renderCartProducts}
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={()=>{
            return(
              <Text>Empty Cart</Text>
            )
          }}
        />
      </View>
      <Text style={{ fontSize: 20, alignSelf: 'center', margin: 10 }}>Recommended</Text>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center' }}>
          {
            dummyDB.rice.map((item, index) => {
              const getItemFromCart = state.cart.find(obj => obj.id === item.id)
              return (
                <View >
                  <Card
                    style={{
                      backgroundColor: "#fff",
                      margin: 5,
                      borderColor:
                        item.id === selectedCategoryResponse ? "green" : "#fff",
                      borderWidth: 1,
                    }}
                    onPress={() => { setSelectedCategoryResponse(item.id) }}
                  >
                    <Image
                      source={item.image}
                      style={{ width: 75, height: 70, resizeMode: "contain", borderRadius: 10 }}
                    />
                  </Card>
                  <Text style={{ alignSelf: 'center' }}>{item.item_name}</Text>
                  <Text style={{ alignSelf: 'center', fontWeight: 'bold' }}>₹200</Text>
                  <TouchableOpacity 
                  onPress={()=>{ 
                    setSelectedCategoryResponse(item.id)
                    getItemFromCart && getItemFromCart.id ?
                    remove_from_cart(item):
                    add_to_cart(item) 
                  }}
                  style={{ backgroundColor: "green", margin: 10, justifyContent: "center", padding: 3, borderRadius: 5 }}>
                    <Text style={{ alignSelf: 'center', color: "#fff" }}>{getItemFromCart && getItemFromCart.id ? "Remove" : "Add"}</Text>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
      </View>

      <DeliveryType />

      <DayButton />

      <View style={{ flexDirection: "row", justifyContent: 'center' }}>
        {
          dummyDB.cartTimeline.map((item, index) => {
            return (
              <Card
                style={{
                  backgroundColor: "#fff",
                  padding: 15, margin: 5,
                  borderColor:
                    item.id === selectedTimelineResponse ? "green" : "#fff",
                  borderWidth: 1,
                }}
                onPress={() => { setSelectedTimelineResponse(item.id) }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ margin: 5 }}>{item.time}</Text>
                  <Ionicons name={item.icon} size={25} style={{ alignSelf: 'center', marginLeft: 10 }} />
                </View>
                <Text style={{ margin: 5, opacity: 0.3 }}>{item.timeline}</Text>
              </Card>
            )
          })
        }
      </View>
      <Text style={{ margin: 10, opacity: 0.3 }}>Delivery address</Text>
      <View style={{ padding: 10 }}>
        <List.Item
          style={{ padding: 20, }}
          title={"416 Grandrose Ave. Des Plaines, IL 60016"}
          titleStyle={{ fontSize: 18 }}
          descriptionStyle={{ color: "#000" }}

          right={(props) => (
            <List.Icon
              {...props}
              icon="pencil-outline"
              color={"#bababa"}
              onPress={() => { }}
            />
          )}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ left: 35, fontSize: 14 }}>Do you have a promo code ?<Text style={{ color: 'green' }}>  Redeem Now</Text></Text>
        </View>
        <List.Item
          style={{ padding: 20 }}
          title={"Order total"}
          titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
          descriptionStyle={{ color: "#000" }}
          right={(props) => (
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>₹{orderTotal}</Text>
          )}
        />
        <List.Item
          style={{ padding: 20, top: -15 }}
          title={"Delivery fee"}
          titleStyle={{ fontSize: 18, fontWeight: 'bold' }}
          descriptionStyle={{ color: "#000" }}
          right={(props) => (
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>₹{deliveryFee}</Text>
          )}
        />
        <List.Item
          style={{ padding: 22, top: -15 }}
          title={"Total cost"}
          titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
          descriptionStyle={{ color: "#000" }}
          right={(props) => (
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>₹{orderTotal + deliveryFee}</Text>
          )}
        />
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            color={"green"}
            uncheckedColor={"#bababa"}
          />
          <Text style={{ fontSize: 16, color: "#bababa", width: "80%", left: 10 }}>By placing an order you agree to our <Text style={{ color: "#000" }}>Terms</Text> and <Text style={{ color: "#000" }}>Conditions</Text></Text>
        </View>
        <Button labelStyle={{ color: "#000", fontSize: 18 }} style={{ backgroundColor: "#f0f0f0", borderRadius: 10, margin: 10, borderWidth: 1, borderColor: "green" }} contentStyle={{ padding: 10, }} mode="elevated" onPress={() => console.log('Pressed')}>
          Proceed
        </Button>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headerContainer: {
    height: "15%",
    padding: 20,
    justifyContent: "center"
  },
  deliveryType: {
    height: 80,
    backgroundColor: "#fff",
    width: "40%",
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    flex: 1,
    borderWidth: 1,
  },
  dayButton: {
    height: 40,
    width: "40%",
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    flex: 1
  }
});
