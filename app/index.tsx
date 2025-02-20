import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import UpdateLabor from './(pages)/UpdateLabor';
import DeleteLabor from './(pages)/DeleteLabor'; 
import Supplier from './(pages)/Supplier';
import SupplierDetails from './(pages)/SupplierDetails';
import SupplierList from './(pages)/SupplierList';
import ViewMaterial from './(pages)/ViewMaterial';
import DeleteMaterial from './(pages)/DeleteMaterial';
import UpdateMaterial from './(pages)/UpdateMaterial';
import LaborDetail from './(pages)/LaborDetail';
import ProjectListPage from './(pages)/ProjectListPage';
import ProjectPage from './(pages)/ProjectPage'; 
import ProjectDetailsPage from './(pages)/ProjectDetailsPage';
import EstimatePage from './(pages)/EstimatePage';
import AddProject from './(pages)/AddProject';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='signup' component={Signup} />
        <Stack.Screen name='MaterialScreenAdmin' component={MaterialScreenAdmin} />
        <Stack.Screen name='Labor' component={Labor} />
        <Stack.Screen name='LaborList' component={LabourList} />
        <Stack.Screen name='AdminLabor' component={AdminLabor} />
        <Stack.Screen name='HireLabor' component={HireLabor} />
        <Stack.Screen name='Addlabor' component={Addlabor} />
        <Stack.Screen name='UpdateLabor' component={UpdateLabor} />
        <Stack.Screen name='DeleteLabor' component={DeleteLabor} />
        <Stack.Screen name='LaborDetail' component={LaborDetail} />
        <Stack.Screen name='Supplier' component={Supplier} />
        <Stack.Screen name='SupplierDetails' component={SupplierDetails} />
        <Stack.Screen name='SupplierList' component={SupplierList} />
        <Stack.Screen name='ViewMaterial' component={ViewMaterial} />
        <Stack.Screen name='DeleteMaterial' component={DeleteMaterial} />
        <Stack.Screen name='UpdateMaterial' component={UpdateMaterial} />
        <Stack.Screen name='ProjectListPage' component={ProjectListPage} />
        <Stack.Screen name='ProjectPage' component={ProjectPage} />
        <Stack.Screen name='ProjectDetailsPage' component={ProjectDetailsPage} />
        <Stack.Screen name='EstimatePage' component={EstimatePage} />
        <Stack.Screen name='AddProject' component={AddProject} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}