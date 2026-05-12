import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FC, useEffect } from 'react';
import Loader from '../../Components/Loader';
import { navigationRef } from '../../Utils/navigation';
// import { notificationListenerInstance } from '../../Utils/notification';
import { colors } from '../../Utils/theme';
import AuthNavigation from '../AuthNavigation';
import DrawerNavigation from '../DrawerNavigation';
import NotificationList from '../../Screens/AppScreens/NotificationList';
import NavigationOptions from '../NavigationOptions';
import ViewChat from '../../Screens/AppScreens/ViewChat';
import UpdateProfile from '../../Screens/AppScreens/UpdateProfile';
import AppointmentDetails from '../../Screens/AppScreens/AppointmentDetails';
import PatientDetail from '../../Screens/AppScreens/PatientDetail';
import AppointmentScreen from '../../Screens/AppScreens/AppointmentScreen';
import PrescriptionLabTests from '../../Screens/AppScreens/PrescriptionLabTests';
import AgoraCall from '../../Screens/AppScreens/AgoraCall';
// import DrawerNavigation from '../DrawerNavigation';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.primaryBackground,
  },
};

const Stack = createStackNavigator();

const AuthStackScreen = {
  name: 'Auth',
  component: AuthNavigation,
};

const DrawerStackScreen = {
  name: 'DrawerNavigation',
  component: DrawerNavigation,
};

const MainNavigation: FC = () => {
  // const isLoggedIn = useSelector(selectLoggedIn);
  // const {loader} = useSelector(state => state?.user);

  // console.log('isloggedin ========== > ', isLoggedIn);
  useEffect(() => {
    // notificationListenerInstance.init();
  }, []);

  let stackScreens = [
    // isLoggedIn ? DrawerStackScreen : AuthStackScreen,
    // AuthStackScreen,
    DrawerStackScreen,
    {
      name: 'NotificationList',
      component: NotificationList,
      options: NavigationOptions
    },
    {
      name: 'ViewChat',
      component: ViewChat,
      options: NavigationOptions
    },
    {
      name: 'UpdateProfile',
      component: UpdateProfile,
      options: NavigationOptions
    },
    {
      name: 'AppointmentDetails',
      component: AppointmentDetails,
      options: NavigationOptions
    },
    {
      name: 'PatientDetail',
      component: PatientDetail,
      options: NavigationOptions
    },
    {
      name: 'AppointmentScreen',
      component: AppointmentScreen,
      options: NavigationOptions
    },
    {
      name: 'PrescriptionLabTests',
      component: PrescriptionLabTests,
      options: NavigationOptions
    },
    {
      name: 'AgoraCall',
      component: AgoraCall,
      // options: NavigationOptions
    },
  ];

  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      {/* {loader ? ( */}
      {/* <Loader size="large" color={colors.primary} /> */}
      {/* ) : ( */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {stackScreens.map((_screen, index) => (
          <Stack.Screen
            key={index}
            name={_screen.name}
            component={_screen.component}
            options={_screen.options}
          />
        ))}
      </Stack.Navigator>
      {/* )} */}
    </NavigationContainer>
  );
};

export default MainNavigation;
