import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import HomeScreen from '../../Screens/AppScreens/HomeScreen';
import NavigationOptions from '../NavigationOptions';
import ProfessionalDetails from '../../Screens/AuthScreens/ProfessionalDetails';
import ProfileSetup from '../../Screens/AuthScreens/ProfileSetup';
import AppointmentDetails from '../../Screens/AppScreens/AppointmentDetails';
import AnalyticsScreen from '../../Screens/AppScreens/AnalyticsScreen';

const Stack = createStackNavigator();

const HomeNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={NavigationOptions}>
      {/* <Stack.Screen name="ProfileSetup" component={ProfileSetup} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
