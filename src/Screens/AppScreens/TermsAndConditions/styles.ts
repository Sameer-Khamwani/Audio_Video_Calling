import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../../Utils/helper";
import colors from "../../../Utils/theme";

const cardShadow = {
  elevation: 3,
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 6,
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: heightPixel(24),
    paddingHorizontal: widthPixel(20),
  },
  updatedRow: {
    marginTop: heightPixel(4),
    marginBottom: heightPixel(14),
  },
  updatedDot: {
    width: widthPixel(7),
    height: widthPixel(7),
    borderRadius: widthPixel(4),
    backgroundColor: "#9BC0F9",
  },
  introCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightBorder,
    borderRadius: heightPixel(16),
    padding: heightPixel(16),
    ...cardShadow,
  },
  sectionsCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightBorder,
    borderRadius: heightPixel(16),
    marginTop: heightPixel(12),
    overflow: "hidden",
    ...cardShadow,
  },
  sectionRow: {
    paddingHorizontal: widthPixel(14),
    paddingVertical: heightPixel(14),
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightBorder,
    width: "100%",
  },
  sectionContent: {
    marginTop: heightPixel(8),
    marginLeft: widthPixel(36),
    paddingBottom: heightPixel(8),
  },
  paragraphSpacing: {
    marginTop: 8,
  },
  sectionChevronExpanded: {
    transform: [{ rotate: "90deg" }],
  },
  sectionChevronCollapsed: {
    transform: [{ rotate: "0deg" }],
  },
});

export default styles;

