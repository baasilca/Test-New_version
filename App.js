import { StyleSheet, Text, View, StatusBar,LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Store from './src/store';
import HomeStack from './src/HomeStack'

const Stack = createNativeStackNavigator();

export default function App() {
  
  LogBox.ignoreAllLogs();
  return (
    <Store>
      <StatusBar backgroundColor={"white"} />
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="HomeStack" component={HomeStack} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    </Store>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
