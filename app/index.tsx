import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './(pages)/Welcome';
import Login from './(pages)/Login';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}