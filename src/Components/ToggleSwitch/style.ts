import { StyleSheet } from "react-native";
import { colors } from "../../Utils/theme";
import { widthPixel, heightPixel } from "../../Utils/helper";

export const styles = StyleSheet.create({
    container: {
        width: heightPixel(38),
        height: heightPixel(22),
        borderRadius: heightPixel(32),
        padding: 3,
        justifyContent: "center",
    },
    circle: {
        width: heightPixel(14),
        height: heightPixel(14),
        borderRadius: heightPixel(13),
        backgroundColor: colors.white,
    }
});
