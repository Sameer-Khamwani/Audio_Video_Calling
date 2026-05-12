import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import NavigationOptions from '../NavigationOptions';
import TermsAndConditions from '../../Screens/AppScreens/TermsAndConditions';
import PrivacyPolicy from '../../Screens/AppScreens/PrivacyPolicy';

const Stack = createStackNavigator();

const PrivacyNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={NavigationOptions}>
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export default PrivacyNavigation;
