import { createStackNavigator } from '@react-navigation/stack';
import { FC } from 'react';
import ForgotPasswordScreen from '../../Screens/AuthScreens/ForgotPassword';
import ResetPasswordScreen from '../../Screens/AuthScreens/ResetPassword';
import Login from '../../Screens/AuthScreens/Login';
import SplashScreen from '../../Screens/AuthScreens/SplashScreen';
import OnBoarding1 from '../../Screens/AppScreens/OnBoarding1';
import OnBoarding2 from '../../Screens/AppScreens/OnBoarding2';
import OnBoarding3 from '../../Screens/AppScreens/OnBoarding3';
import ForgotPassword from '../../Screens/AuthScreens/ForgotPassword';
import VerifyCode from '../../Screens/AuthScreens/VerifyCode';
import ResetPassword from '../../Screens/AuthScreens/ResetPassword';
import ProfileSetup from '../../Screens/AuthScreens/ProfileSetup';

const Stack = createStackNavigator();

const AuthNavigation: FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
      <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
      <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
