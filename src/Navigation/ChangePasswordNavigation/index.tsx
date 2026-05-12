import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import NavigationOptions from '../NavigationOptions';
import ChangePassword from '../../Screens/AppScreens/ChangePassword';

const Stack = createStackNavigator();

const ChangePasswordNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={NavigationOptions}>
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

export default ChangePasswordNavigation;
