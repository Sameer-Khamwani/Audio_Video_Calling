import { StyleSheet } from "react-native";
import { colors } from "../../../Utils/theme";
import { heightPixel, widthPixel } from "../../../Utils/helper";

const styles = StyleSheet.create({
  appWrapper: {
    alignItems: "flex-start",
  },
  sectionHeader: {
    marginBottom: heightPixel(4),
  },
  cardContainer: {
    padding: heightPixel(14),
    borderWidth: 1,
    borderColor: colors.lightBorder,
    borderRadius: heightPixel(15),
    marginVertical: heightPixel(8),
    width: "100%",
    backgroundColor: colors.white,
  },
  cardTopRow: {
    width: "100%",
  },
  medicineInput: {
    width: "90%",
  },
  whenToTakeRow: {
    width: "100%",
    marginVertical: heightPixel(20),
  },
  chip: {
    borderRadius: widthPixel(10),
    paddingVertical: heightPixel(6),
    paddingHorizontal: widthPixel(10),
  },
  countersRow: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightBorder,
    paddingBottom: heightPixel(10),
  },
  summaryRow: {
    width: "100%",
    marginTop: heightPixel(12),
  },
  perPrescriptionSaveButton: {
    height: heightPixel(35),
    // width: widthPixel(100),
  },
  whenToTakeError: {
    marginTop: heightPixel(8),
  },
  countersErrorRow: {
    marginTop: heightPixel(6),
  },
  addMedicineButton: {
    marginVertical: heightPixel(15),
    width: "100%",
  },
  labTestInput: {
    marginTop: heightPixel(10),
    width: "99%",
    alignSelf: "center",
  },
  addLabTestButton: {
    marginVertical: heightPixel(15),
    width: "100%",
  },
  divider: {
    height: heightPixel(1),
    width: "100%",
    backgroundColor: colors.lightBorder,
    marginVertical: heightPixel(15),
  },
  saveAllButton: {
    marginVertical: heightPixel(15),
    width: "100%",
  },
  successModalButton: {
    width: "100%",
  },
  keyboardScrollContent: {
    flexGrow: 1,
    paddingBottom: heightPixel(220),
  },
});

export default styles;
