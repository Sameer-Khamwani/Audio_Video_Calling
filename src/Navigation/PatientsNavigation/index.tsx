import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import HomeScreen from '../../Screens/AppScreens/HomeScreen';
import NavigationOptions from '../NavigationOptions';
import PatientScreen from '../../Screens/AppScreens/PatientScreen';

const Stack = createStackNavigator();

const PatientsNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={NavigationOptions}>
      <Stack.Screen name="PatientScreen" component={PatientScreen} />
    </Stack.Navigator>
  );
};

export default PatientsNavigation;
