import { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import icons from '../../Assets/Icons';
import useToggle from '../../Hooks/useToggle';
import { drawerScreens } from '../../Navigation/DrawerNavigation';
import { colors } from '../../Utils/theme';
import CustomText from '../CustomText';
import Icons from '../ImageIcons/Icons';
import ModalComponent from '../Modal';
import Row from '../Row';
import { styles } from './style';
import { navigate, navigateAndSimpleReset } from '../../Utils/navigation';
import ImageIcons from '../ImageIcons/Icons';
import { navigationIcons } from '../../Assets/NavigationIcons';
import dummyImages from '../../Assets/DummyImages';
import ToggleSwitch from '../ToggleSwitch';
// import {useDispatch, useSelector} from 'react-redux';
// import {
//   selectUser,
//   setLoader,
//   setLogout,
//   user,
// } from '../../Redux/Slice/UserSlice';

const CustomDrawer = ({ state }) => {
  const version = '1.1';
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  const [pushNotifications, setPushNotifications] = useState(true);
  const drawerItems = [
    ...drawerScreens,
  ];
  const [confirmationOpen, setConfirmationOpen, confirmationToggle] =
    useToggle();

  const activeRoute = state?.routeNames[state?.index] || '';

  const yesButtonHandler = async () => {
    confirmationToggle();
    navigateAndSimpleReset('Auth');
    // dispatch(setLoader(true));
    // dispatch(setLogout());
    // setTimeout(() => {
    //   navigateAndSimpleReset('Auth');
    // }, 200);
    // setTimeout(() => {
    //   navigate('Auth');
    //   dispatch(setLoader(false));
    // }, 300);
  };

  const noButtonHandler = () => {
    confirmationToggle();
  };

  useEffect(() => {
    drawerScreens;
  }, []);

  return (
    <View style={styles.drawerContainer}>
      <StatusBar translucent={true} />
      <TouchableOpacity
        style={styles.header}
        activeOpacity={0.8}
        onPress={() =>
          navigate('BottomTabNavigation', {
            screen: 'ProfileNavigation',
          })
        }>
        <ImageIcons
          disabled={true}
          source={dummyImages.patient}
          size={70}
          style={styles.avatar}
        />
        <CustomText
          text={`Dr. Sarah Jenkins`}
          size={20}
          weight="bold"
          color={colors.white}
          style={styles.drawerNameText}
        />
        <CustomText
          text={`MD, FACC - Senior Cardiologist`}
          color={colors.white}
        />
      </TouchableOpacity>
      <View
        style={styles.drawerItemsContainer}>
        {drawerItems.map((item, index) => {
          const isActive = activeRoute === item.name;

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              style={[styles.drawerItem, styles.drawerItemWithBorder]}
              onPress={
                item?.name
                  ? () => {
                    navigate(
                      item?.name,
                      item?.screen ? { screen: item?.screen } : {},
                    );
                  }
                  : confirmationToggle
              }>
              <Row justifyContent="space-between" style={styles.drawerItemRow}>
                <Row gap={10}>
                  <ImageIcons
                    source={item?.icon ?? icons.home}
                    size={28}
                    color={item?.color}
                  />
                  <View>
                    <CustomText
                      weight={'semibold'}
                      style={styles.drawerItemText}
                      text={`${item.text}`}
                    />
                    {item?.description && <CustomText
                      disabled
                      weight={'regular'}
                      size={11}
                      style={styles.drawerItemText}
                      text={`${item?.description}`}
                    />}
                  </View>
                </Row>
                <ImageIcons source={icons.greaterThan} size={12} color={colors.lightGray} />
              </Row>
            </TouchableOpacity>
          );
        })}
        <View
          style={[styles.drawerItem, styles.drawerItemWithBorder]}
        >
          <Row justifyContent="space-between" style={styles.drawerRowFullWidth}>
            <Row gap={10}>
              <ImageIcons
                source={navigationIcons.pushNotification}
                size={28}
              />
              <View>
                <CustomText
                  weight={'semibold'}
                  style={styles.drawerItemText}
                  text={`Push Notifications`}
                />
                <CustomText
                  weight={'regular'}
                  size={11}
                  style={styles.drawerItemText}
                  text={`Alerts for new appointments`}
                />
              </View>
            </Row>
            <ToggleSwitch
              value={pushNotifications}
              onToggle={() => setPushNotifications(!pushNotifications)}
            />
          </Row>
        </View>
        <TouchableOpacity
          key={6}
          activeOpacity={0.6}
          style={styles.drawerItem}
          onPress={confirmationToggle}>
          <Row justifyContent="space-between" style={styles.drawerRowFullWidth}>
            <Row gap={10}>
              <ImageIcons
                source={navigationIcons.logout}
                size={28}
              />
              <View>
                <CustomText
                  weight={'semibold'}
                  style={styles.drawerItemText}
                  text={`Logout`}
                />

              </View>
            </Row>
            <ImageIcons source={icons.greaterThan} size={12} color={colors.lightGray} />
          </Row>
        </TouchableOpacity>
        <View style={styles.versionContainer}>
          <CustomText
            disabled={true}
            weight={'regular'}
            size={12}
            color={colors.lightText}
            text={`MediConnect Version ${version}`}
          />
          <CustomText
            disabled={true}
            weight={'regular'}
            size={12}
            color={colors.lightGray}
            text={`© 2026 MediConnect Inc.`}
          />
        </View>
      </View>

      <ModalComponent
        icon={navigationIcons.logout}
        buttonStyle={styles.buttonStyle}
        text="Are you sure you want to log out of your account?"
        open={confirmationOpen}
        close={confirmationToggle}
        header="Log Out?"
        buttons={[

          {
            text: 'Cancel',
            onPress: noButtonHandler,
            type: 'secondary'
          },
          {
            text: 'Log Out',
            onPress: yesButtonHandler,
            type: 'primary',
            style: {
              backgroundColor: 'red',
            },
          },
        ]}
      />
    </View>
  );
};

export default CustomDrawer;
