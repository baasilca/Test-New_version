import React, { useState, useEffect, useContext } from "react";
import { View, Text, Alert, TouchableOpacity,ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from "react-native-vector-icons/Ionicons";
import _ from "lodash";

import LoginScreen from '../Screens/Login';
import Dashboard from "../Screens/Dashboard";
import Cart from "../Screens/Cart"







import { Context } from "../store";
const Stack = createNativeStackNavigator();

function App(props) {
  const { navigation } = props;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [state, dispatch] = useContext(Context);
  const [appLoaded, setAppLoaded] = useState(false);

  function DummyLoader({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color={"#26af4c"} />
      </View >
    );

  }

  useEffect(() => {
    AsyncStorage.getItem('sessionData', (err, result) => {
      if (
        result &&
        _.isEmpty(result) === false &&
        JSON.parse(result) &&
        JSON.parse(result).userId
      ) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!state.sessionData) {
      setIsLoggedin(false);
    } else {
      setIsLoggedin(true);
    }
  }, [state.sessionData]);



  setTimeout(() => {
    setAppLoaded(true);
  }, 2000);

  return (
    <Stack.Navigator>
      <>
        {/* {!appLoaded && (
          <Stack.Screen
            name="DummyLoader"
            options={{ headerShown: false }}
            component={DummyLoader}
          />
        )}


        {!isLoggedin && (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )} */}

        {/* {isLoggedin && ( */}
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                title: "ESS",
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#fff",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  color: "#26af4c",
                  fontWeight: "bold",
                  textAlign: "center"
                },
                headerLeft: () => null
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                title: "Your order",
                headerStyle: {
                  backgroundColor: "green",
                },
                headerTintColor: "#fff",
              }}
            />
          </>
        {/* )
        } */}
      </>
    </Stack.Navigator >
  );
}

export default App;

