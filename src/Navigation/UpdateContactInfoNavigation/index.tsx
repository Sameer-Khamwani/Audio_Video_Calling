import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import NavigationOptions from '../NavigationOptions';
import ChangePassword from '../../Screens/AppScreens/ChangePassword';
import UpdateProfile from '../../Screens/AppScreens/UpdateProfile';

const Stack = createStackNavigator();

const UpdateContactInfoNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={NavigationOptions}>
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    </Stack.Navigator>
  );
};

export default UpdateContactInfoNavigation;
