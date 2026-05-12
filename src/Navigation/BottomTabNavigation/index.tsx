import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useNavigation } from '@react-navigation/native';
import icons from '../../Assets/Icons';
import CustomBottomTab from '../../Components/CustomBottomTab';
import { colors } from '../../Utils/theme';
import { navigationIcons } from '../../Assets/NavigationIcons';
import HomeNavigation from '../HomeNavigation';
import ImageIcons from '../../Components/ImageIcons/Icons';
import AppointmentNavigation from '../AppointmentNavigation';
import PatientsNavigation from '../PatientsNavigation';
import ChatNavigation from '../ChatNavigation';
import ProfileNavigation from '../ProfileNavigation';

const BottomTab = createBottomTabNavigator();

const bottomTabScreens = [
  {
    name: 'HomeNavigation',
    component: HomeNavigation,
    label: 'Home',
    activeIcon: navigationIcons.home,
  },
  {
    name: 'AppointmentNavigation',
    component: AppointmentNavigation,
    label: 'Appointment',
    activeIcon: navigationIcons.calendar,
  },
  {
    name: 'PatientsNavigation',
    component: PatientsNavigation,
    label: 'Patients',
    activeIcon: navigationIcons.patients,
  },
  {
    name: 'ChatNavigation',
    component: ChatNavigation,
    label: 'Chat',
    activeIcon: navigationIcons.chat,
  },
  {
    name: 'ProfileNavigation',
    component: ProfileNavigation,
    label: 'Profile',
    activeIcon: navigationIcons.profile,
  },
];

const BottomTabNavigation = () => {
  const navigation = useNavigation();
  return (
    <BottomTab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{ headerShown: false }}>
      {bottomTabScreens.map((screen, index) => (
        <BottomTab.Screen
          key={index}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <ImageIcons

                // onPress={() => navigation.navigate(screen?.name)}
                color={focused ? colors.primary : colors.lightText}
                size={24}
                source={screen.activeIcon}
                disabled={true}
              />
            ),
            tabBarLabel: screen.label,
          }}
        />
      ))}
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
