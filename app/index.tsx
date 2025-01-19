import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './(pages)/Welcome';
import Login from './(pages)/Login';
import Signup from './(pages)/signup';
import MaterialScreenAdmin from './(pages)/MaterialScreenAdmin';
import Labor from './(pages)/Labor';
import LabourList from './(pages)/LabourList';
import AdminLabor from './(pages)/AdminLabor';
import HireLabor from './(pages)/HireLabor';
import Addlabor from './(pages)/AddLabor';
import ViewLabor from './(pages)/ViewLabor';
import UpdateLabor from './(pages)/UpdateLabor';
import DeleteLabor from './(pages)/DeleteLabor';
import LaborDetail from './(pages)/LaborDetail';  


const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name='signup' component={Signup} />
      <Stack.Screen name='MaterialScreenAdmin' component={MaterialScreenAdmin} />
      <Stack.Screen name='Labor' component={Labor} />
      <Stack.Screen name='LabourList' component={LabourList} />
      <Stack.Screen name='AdminLabor' component={AdminLabor} />
      <Stack.Screen name='HireLabor' component={HireLabor} />
      <Stack.Screen name='Addlabor' component={Addlabor} />
      <Stack.Screen name='ViewLabor' component={ViewLabor} />
      <Stack.Screen name='UpdateLabor' component={UpdateLabor} />
      <Stack.Screen name='DeleteLabor' component={DeleteLabor} />
      <Stack.Screen name='LaborDetail' component={LaborDetail} />
    </Stack.Navigator>
  );
}