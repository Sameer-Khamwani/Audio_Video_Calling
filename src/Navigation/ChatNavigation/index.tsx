import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import HomeScreen from '../../Screens/AppScreens/HomeScreen';
import NavigationOptions from '../NavigationOptions';
import PatientScreen from '../../Screens/AppScreens/PatientScreen';
import ChatList from '../../Screens/AppScreens/ChatList';
import ViewChat from '../../Screens/AppScreens/ViewChat';

const Stack = createStackNavigator();

const ChatNavigation: FC = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="ChatList" component={ChatList} options={NavigationOptions} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
