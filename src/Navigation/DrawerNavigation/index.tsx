import { createDrawerNavigator } from '@react-navigation/drawer';
import icons from '../../Assets/Icons';
import CustomDrawer from '../../Components/CustomDrawer';
import BottomTabNavigation from '../BottomTabNavigation';
import { navigationIcons } from '../../Assets/NavigationIcons';
import colors from '../../Utils/theme';
import ChatNavigation from '../ChatNavigation';
import ChangePasswordNavigation from '../ChangePasswordNavigation';
import TermsNavigation from '../TermsNavigation';
import PrivacyNavigation from '../PrivacyNavigation';
import UpdateContactInfoNavigation from '../UpdateContactInfoNavigation';

const Drawer = createDrawerNavigator();

export const drawerScreens = [
  {
    id: 1,
    name: 'BottomTabNavigation',
    screen: 'HomeNavigation',
    component: BottomTabNavigation,
    text: 'Home',
    description: '',
    icon: navigationIcons.home,
    color: colors.black,
  },
  {
    id: 2,
    name: 'ChangePasswordNavigation',
    screen: 'ChangePasswordNavigation',
    component: ChangePasswordNavigation,
    text: 'Change Password',
    description: 'Update your security credentials',
    icon: navigationIcons.changePassword,
  },
  {
    id: 3,
    name: 'UpdateContactInfoNavigation',
    screen: 'UpdateContactInfoNavigation',
    component: UpdateContactInfoNavigation,
    text: 'Update Contact Info',
    description: 'Update your contact information',
    icon: navigationIcons.updateInfo,
  },
  {
    id: 3,
    name: 'TermsNavigation',
    screen: 'TermsNavigation',
    component: TermsNavigation,
    text: 'Terms of Service',
    description: 'Read our terms and conditions',
    icon: navigationIcons.terms,
  },
  {
    id: 4,
    name: 'PrivacyNavigation',
    screen: 'PrivacyNavigation',
    component: PrivacyNavigation,
    text: 'Privacy Policy',
    description: 'View our privacy policy',
    icon: navigationIcons.privacy,
  },

];

const DrawerNavigation = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
          // drawerHideStatusBarOnOpen: true,
          headerShown: false,
          drawerType: 'front',
          swipeEnabled: false,
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          drawerStyle: {
            width: '78%',
            borderTopRightRadius: 30,
            borderBottomRightRadius: 30,
          },
          // swipeEdgeWidth: 100,
        }}>
        {drawerScreens.map((screen, index) => (
          <Drawer.Screen
            key={index}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigation;
