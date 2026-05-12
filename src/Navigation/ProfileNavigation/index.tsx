import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import HomeScreen from '../../Screens/AppScreens/HomeScreen';
import NavigationOptions from '../NavigationOptions';
import PatientScreen from '../../Screens/AppScreens/PatientScreen';
import ChatList from '../../Screens/AppScreens/ChatList';
import MyProfile from '../../Screens/AppScreens/MyProfile';

const Stack = createStackNavigator();

const ProfileNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={NavigationOptions}>
      <Stack.Screen name="MyProfile" component={MyProfile} />
    </Stack.Navigator>
  );
};

export default ProfileNavigation;
