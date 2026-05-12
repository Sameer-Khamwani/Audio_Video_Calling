import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import NavigationOptions from '../NavigationOptions';
import TermsAndConditions from '../../Screens/AppScreens/TermsAndConditions';

const Stack = createStackNavigator();

const TermsNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={NavigationOptions}>
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Stack.Navigator>
  );
};

export default TermsNavigation;
