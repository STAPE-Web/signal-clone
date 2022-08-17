import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddChat from './pages/AddChat';
import Chat from './pages/Chat';

const Stack = createStackNavigator();
const globalOptions = {
  headerStyle: { backgroundColor: '#2C6BED' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
}

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator screenOptions={globalOptions}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='AddChat' component={AddChat} />
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  </NavigationContainer>
}