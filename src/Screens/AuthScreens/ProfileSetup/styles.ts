import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

export const styles = StyleSheet.create({
  scrollView: { flex: 1, width: "100%", paddingHorizontal: widthPixel(20) },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: heightPixel(20),
    // backgroundColor : 'red',
    alignItems: "center",
  },
  centerText: { textAlign: "center" },
  card: {
    padding: heightPixel(20),
    borderRadius: heightPixel(20),
    borderWidth: 1,
    borderColor: colors.lightBorder,
    marginVertical: heightPixel(20),
    alignItems: "center",
    backgroundColor: colors.white,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  avatarContainer: { alignItems: "center", justifyContent: "center" },
  avatar: {
    width: heightPixel(110),
    height: heightPixel(110),
    borderRadius: heightPixel(55),
    backgroundColor: colors.lightBorder,
  },
  cameraIcon: {
    position: "absolute",
    bottom: heightPixel(0),
    left: heightPixel(16),
  },
  specializationDropDown: {
    marginVertical: heightPixel(10),
    zIndex: 2,
  },
  genderDropDown: {
    zIndex: 1,
  },
  privacyRow: {
    marginVertical: heightPixel(20),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightPrimary,
    borderRadius: heightPixel(10),
    padding: heightPixel(24),
    paddingHorizontal: widthPixel(30),
  },
  saveButton: { width: "100%", marginTop: heightPixel(15) },
  modalButton: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
  successModalButton: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});