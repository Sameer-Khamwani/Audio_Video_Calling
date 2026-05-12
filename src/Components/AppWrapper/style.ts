import { StatusBar, StyleSheet } from "react-native";
import { heightPixel } from "../../Utils/helper";
import { colors } from "../../Utils/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
        alignItems: "center",
        marginTop: heightPixel(-25),
    },
})
