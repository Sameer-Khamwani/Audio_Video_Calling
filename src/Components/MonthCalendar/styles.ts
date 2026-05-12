import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../Utils/helper";
import colors from "../../Utils/theme";

const cardShadow = {
  elevation: 4,
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
};

const styles = StyleSheet.create({
  calendarCard: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.lightBorder,
    borderRadius: heightPixel(12),
    padding: heightPixel(14),
    marginTop: heightPixel(10),
    backgroundColor: colors.white,
    ...cardShadow,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: heightPixel(10),
    marginBottom: heightPixel(6),
  },
  weekDay: {
    width: widthPixel(40),
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cell: {
    width: widthPixel(38),
    height: heightPixel(46),
    borderRadius: heightPixel(10),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: heightPixel(4),
    marginHorizontal: widthPixel(4),
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.white,
    ...cardShadow,
  },
  cellSelected: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    ...cardShadow,
  },
  countBadge: {
    position: "absolute",
    top: heightPixel(2),
    right: widthPixel(2),
    minWidth: widthPixel(16),
    height: heightPixel(16),
    borderRadius: heightPixel(8),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: widthPixel(3),
  },
  calendarToggleButton: {
    alignSelf: "center",
    marginTop: heightPixel(30),
    paddingVertical: heightPixel(6),
    paddingHorizontal: widthPixel(14),
    borderRadius: heightPixel(16),
    borderWidth: 1,
    borderColor: colors.lightBorder,
    backgroundColor: colors.lightBlue,
  },
  monthArrowBtn: {
    height: heightPixel(34),
    width: widthPixel(34),
    borderRadius: heightPixel(10),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
    borderWidth: 1,
    borderColor: colors.lightBorder,
  },
  calendarToggleChevronExpanded: {
    transform: [{ rotate: "-90deg" }],
  },
  calendarToggleChevronCollapsed: {
    transform: [{ rotate: "90deg" }],
  },
});

export default styles;
