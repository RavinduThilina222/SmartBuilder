import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './(pages)/Welcome';
import Login from './(pages)/Login';
import Signup from './(pages)/signup';
import MaterialScreenAdmin from './(pages)/MaterialScreenAdmin';
import UserProfilePage from './(pages)/UserProfilePage';
import ChangePasswordPage from './(pages)/ChangePasswordPage';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name='signup' component={Signup} />
      <Stack.Screen name='MaterialScreenAdmin' component={MaterialScreenAdmin} />
      <Stack.Screen name='UserProfilePage' component={UserProfilePage} />
      <Stack.Screen name='ChangePasswordPage' component={ChangePasswordPage} />
    </Stack.Navigator>
  );
}