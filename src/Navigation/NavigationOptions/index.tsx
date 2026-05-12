import { useNavigation } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { Image, Platform, View } from 'react-native';
import icons from '../../Assets/Icons';
import Icons from '../../Components/ImageIcons/Icons';
import Row from '../../Components/Row';
import { heightPixel, STATUSBAR_HEIGHT } from '../../Utils/helper';
import { colors } from '../../Utils/theme';
import { navigate, toggleDrawer } from '../../Utils/navigation';
import CustomText from '../../Components/CustomText';
import { navigationIcons } from '../../Assets/NavigationIcons';
import { styles } from './styles';

const routes = [
  {
    id: 1,
    route_name: 'HomeScreen',
    left: 'drawer',
    lastIcon: true,
  },
  {
    id: 2,
    route_name: 'AppointmentScreen',
    left: 'drawer',
    title: 'Appointments',
    lastIcon: true,
  },
  {
    id: 3,
    route_name: 'NotificationList',
    left: 'back',
    title: 'Notifications',
  },
  {
    id: 4,
    route_name: 'ProfileSetup',
    title: 'Profile Setup',
  },
  {
    id: 5,
    route_name: 'ProfessionalDetails',
    left: 'back',
    title: 'Professional Details',
  },
  {
    id: 6,
    route_name: 'MyProfileScreen',
    left: 'back',
    title: 'My Profile',
  },
  {
    id: 7,
    route_name: 'AllChatsList',
    left: 'back',
    title: 'Chats',
  },
  {
    id: 8,
    route_name: 'NotificationList',
    left: 'back',
    title: 'Notifications',
  },
  {
    id: 9,
    route_name: 'AppointmentDetails',
    left: 'back',
    title: 'Appointment Details',
  },
  {
    id: 10,
    route_name: 'PatientScreen',
    left: 'drawer',
    title: 'Patients',
    lastIcon: true,
  },
  {
    id: 11,
    route_name: 'PatientDetail',
    left: 'back',
    title: 'Patient Profile',
  },
  {
    id: 12,
    route_name: 'ChatList',
    left: 'drawer',
    title: 'Chats',
    lastIcon: true,
  },
  {
    id: 13,
    route_name: 'MyProfile',
    left: 'drawer',
    title: 'My Profile',
    lastIcon: true,
  },
  {
    id: 14,
    route_name: 'ViewChat',
    left: 'back',
  },
  {
    id: 15,
    route_name: 'UpdateProfile',
    left: 'back',
    title: 'Update Profile',
  },
  {
    id: 17,
    route_name: 'ChangePassword',
    left: 'drawer',
    title: 'Change Password',
  }, {
    id: 18,
    route_name: 'PrivacyPolicy',
    left: 'drawer',
    title: 'Privacy Policy',
  }, {
    id: 19,
    route_name: 'TermsAndConditions',
    left: 'drawer',
    title: 'Terms of Service',
  },
  {
    id: 20,
    route_name: 'AnalyticsScreen',
    left: 'back',
    title: 'Analytics',
  },
  {
    id: 21,
    route_name: 'PrescriptionLabTests',
    left: 'back',
    title: 'Prescription & Lab Tests',
  },
  {
    id: 22,
    route_name: 'AgoraCall',
    left: 'back',
    title: 'Call',
  },

];

const renderLeft = (props: any) => {
  let route = routes.find(item => item.route_name === props?.route?.name);

  if (route?.left) {
    return route?.left === 'drawer' ? (
      <Icons
        style={styles.headerIconMargin}
        onPress={() => toggleDrawer()}
        source={navigationIcons.drawer}
        size={26}
      />
    ) : (
      <Icons
        style={styles.headerIconMargin}
        color={colors.black}
        onPress={() => props?.navigation?.goBack()}
        source={icons.back}
        size={20}
      />
    );
  }
  return null;
};

const renderRight = (props: any) => {
  const route = routes.find(item => item.route_name === props?.route?.name);

  if (!route?.lastIcon) return null;

  const commonIcons = (
    <Row
      style={styles.headerRightIconsRow}>
      <Icons
        source={navigationIcons.notification}
        size={26}
        onPress={() => props?.navigation?.navigate('NotificationList')}
      />
    </Row>
  );

  if (route.route_name === 'HomeScreen') {
    return (
      <Row>
        {/* <Icons
          source={icons.search}
          size={20}
          color={colors.black}
          onPress={
            () => {}
            // navigate('ProductScreen', {
            //   type: 'products',
            // })
          }
        /> */}
        {commonIcons}
      </Row>
    );
  }

  if (['MyProfileScreen', 'AllChatsList'].includes(route.route_name)) {
    return commonIcons;
  }

  return (
    <Icons
      size={26}
      style={styles.headerIconMargin}
      color={colors.black}
      onPress={() =>
        navigate('NotificationList')
      }
      source={navigationIcons.notification}
    />
  );
};

const renderTitle = (props: any) => {
  let route = routes.find(item => item.route_name === props?.route?.name);
  console.log('route ========= > ', route);

  if (route) {
    return (
      <CustomText
        text={route?.title}
        size={20}
        weight="semibold"
      />
      // <Image
      //   source={icons.appIcon}
      //   style={{
      //     width: widthPixel(117),
      //     height: heightPixel(36),
      //     resizeMode: 'contain',
      //   }}
      // />
    );
  }

  return null;
};

const backgroundColor = (props: any) => {
  let route = routes.find(item => item.route_name === props?.route?.name);
  return route?.headerTransparent ? 'transparent' : colors.primaryBackground;
};

const NavigationOptions = (props: any): StackNavigationOptions => {
  return {
    headerShown: true,
    headerTransparent: false,
    headerStyle: {
      backgroundColor: colors.white,
      borderBottomWidth: 0,
      height: Platform.OS === 'ios' ? heightPixel(100) : heightPixel(90),
      // marginTop: heightPixel(20),
    },
    headerShadowVisible: false,
    headerTitle: () => renderTitle(props),
    headerTitleAlign: 'center',
    headerLeft: () => renderLeft(props),
    headerRight: () => renderRight(props),
  };
};

export default NavigationOptions;
