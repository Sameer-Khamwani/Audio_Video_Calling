import { StyleSheet } from 'react-native';
import { heightPixel, widthPixel } from '../../Utils/helper';
import { colors } from '../../Utils/theme';

export const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    paddingTop: heightPixel(50),
    paddingBottom: heightPixel(35),
    paddingHorizontal: widthPixel(30),
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.7,
    backgroundColor: colors.primary,
  },
  avatar: {
    resizeMode: 'contain',
    backgroundColor: colors.lightProfile,
    borderRadius: heightPixel(50),
    borderWidth: heightPixel(3),
    borderColor: colors.white,

  },
  username: {
    marginTop: heightPixel(20),
    backgroundColor: 'green',
  },
  drawerItem: {
    paddingHorizontal: widthPixel(8),
    paddingVertical: heightPixel(18),
    flexDirection: 'row',
    alignItems: 'center',

  },
  drawerItemText: {
    lineHeight: heightPixel(22),
    // marginLeft: widthPixel(10),
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  buttonStyle: {
    width: '44%',
    height: heightPixel(40),
  },
  drawerNameText: {
    paddingTop: heightPixel(15),
  },
  drawerItemsContainer: {
    borderWidth: 0.5,
    borderColor: colors.lightBorder,
    margin: heightPixel(20),
    borderRadius: heightPixel(20),
    padding: heightPixel(5),
  },
  drawerItemRow: {
    width: '100%',
  },
  versionText: {
    marginTop: heightPixel(80),
    paddingHorizontal: widthPixel(10),
    textAlign: 'center',
  },
  copyrightText: {
    paddingHorizontal: widthPixel(10),
    textAlign: 'center',
  },
  versionContainer: {
    paddingHorizontal: widthPixel(10),
    paddingVertical: heightPixel(10),
    marginTop: heightPixel(20),
  },
  drawerItemWithBorder: {
    borderBottomWidth: 0.5,
    borderColor: colors.lightBorder,
  },
  drawerRowFullWidth: {
    width: '100%',
  },
});
