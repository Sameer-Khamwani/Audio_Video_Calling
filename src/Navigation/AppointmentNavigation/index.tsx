import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import AppointmentScreen from '../../Screens/AppScreens/AppointmentScreen';
import NavigationOptions from '../NavigationOptions';
import PrescriptionLabTests from '../../Screens/AppScreens/PrescriptionLabTests';

const Stack = createStackNavigator();

const AppointmentNavigation: FC = () => {
    return (
        <Stack.Navigator screenOptions={NavigationOptions}>
            <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
            <Stack.Screen name="PrescriptionLabTests" component={PrescriptionLabTests} />
        </Stack.Navigator>
    );
};

export default AppointmentNavigation;
