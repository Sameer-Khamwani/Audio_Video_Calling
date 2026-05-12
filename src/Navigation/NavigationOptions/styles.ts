import { StyleSheet } from "react-native";
import { widthPixel } from "../../Utils/helper";

export const styles = StyleSheet.create({
  headerIconMargin: {
    marginHorizontal: widthPixel(20),
  },
  headerRightIconsRow: {
    gap: widthPixel(12),
    marginHorizontal: widthPixel(20),
  },
});
